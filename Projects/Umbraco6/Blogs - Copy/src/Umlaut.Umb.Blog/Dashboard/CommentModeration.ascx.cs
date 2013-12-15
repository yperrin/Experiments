using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using umbraco.DataLayer;
using umbraco.cms.businesslogic.web;
using System.Data;
using System.Collections;
using umbraco;
using Umlaut.Umb.Blog.Spam;

namespace Umlaut.Umb.Blog.Dashboard
{
    public partial class CommentModeration : System.Web.UI.UserControl
    {
        ISqlHelper SqlHelper = 
            DataLayerHelper.CreateSqlHelper(umbraco.GlobalSettings.DbDSN);

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            rptPages.ItemCommand += new RepeaterCommandEventHandler(rptPages_ItemCommand);
        }

        void rptPages_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            CurrentPage = Convert.ToInt32(e.CommandArgument) - 1;
            BindData();
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Filter = "where spam != 1";
                btnApproved.Enabled = false;

                BindData();
            }
        }

        private void BindData()
        {
            IRecordsReader rr = SqlHelper.ExecuteReader(
                string.Format(
                "select * from comment {0} order by created desc", Filter));

            DataTable commentDT = new DataTable("Comments");
            commentDT.Columns.Add("id", System.Type.GetType("System.Int32"));
            commentDT.Columns.Add("nodeid", System.Type.GetType("System.Int32"));
            commentDT.Columns.Add("name", System.Type.GetType("System.String"));
            commentDT.Columns.Add("email", System.Type.GetType("System.String"));
            commentDT.Columns.Add("website", System.Type.GetType("System.String"));
            commentDT.Columns.Add("comment", System.Type.GetType("System.String"));
            commentDT.Columns.Add("spam", System.Type.GetType("System.Boolean"));
            commentDT.Columns.Add("ham", System.Type.GetType("System.Boolean"));
            commentDT.Columns.Add("created", System.Type.GetType("System.DateTime"));

            while (rr.Read())
            {
                DataRow dr = commentDT.NewRow();
                dr["id"] = rr.GetInt("id");
                dr["nodeid"] = rr.GetInt("nodeid");
                dr["name"] = rr.GetString("name");
                dr["email"] = rr.GetString("email");
                dr["website"] = rr.GetString("website");
                dr["comment"] = rr.GetString("comment");
                dr["spam"] = rr.IsNull("spam") == true ? false : rr.GetBoolean("spam");
                dr["ham"] = rr.IsNull("ham") == true ? false : rr.GetBoolean("ham");
                dr["created"] = rr.GetDateTime("created");

                
                commentDT.Rows.Add(dr);
            }
            
            PagedDataSource pgitems = new PagedDataSource();
            pgitems.DataSource = commentDT.DefaultView;
            pgitems.AllowPaging = true;
            pgitems.PageSize = 25;
            pgitems.CurrentPageIndex = CurrentPage;

            rptComments.DataSource = pgitems;
            rptComments.DataBind();


            if (pgitems.PageCount > 1)
            {
                ArrayList pages = new ArrayList();
                for (int i = 0; i < pgitems.PageCount; i++)
                    pages.Add((i + 1).ToString());

                rptPages.DataSource = pages;
                rptPages.DataBind();
            }
        }

        public int CurrentPage
        {
            get
            {
                // look for current page in ViewState
                object o = this.ViewState["_CurrentPage"];
                if (o == null)
                    return 0; // default page index of 0
                else
                    return (int)o;
            }

            set
            {
                this.ViewState["_CurrentPage"] = value;
            }
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
           DeleteComment(Convert.ToInt32(((LinkButton)sender).CommandArgument));

            BindData();

        }

        private void DeleteComment(int id)
        {
            SqlHelper.ExecuteNonQuery(
                "delete from comment where id = @id",
                SqlHelper.CreateParameter("@id", id));

        }

        protected void btnToggleState_Click(object sender, EventArgs e)
        {

            IRecordsReader rr = SqlHelper.ExecuteReader(
                "select * from comment where id = @id",
                SqlHelper.CreateParameter("@id", Convert.ToInt32(((LinkButton)sender).CommandArgument)));

            rr.Read();
            int nodeid = rr.GetInt("nodeid");
            string name = rr.GetString("name");
            string email = rr.GetString("email");
            string website = rr.GetString("website");
            string comment = rr.GetString("comment");


            if (((LinkButton)sender).CommandName == "True")
            {
                //mark as ham
                SqlHelper.ExecuteNonQuery(
                "update comment set spam = 0, ham = 1 where id = @id",
                SqlHelper.CreateParameter("@id", Convert.ToInt32(((LinkButton)sender).CommandArgument)));


                SpamChecker checker = Config.GetChecker();

                if (checker != null)
                {
                    checker.MarkAsHam(nodeid, name, email, website, comment);
                }
               
            }
            else
            {
                //mark as spam
                SqlHelper.ExecuteNonQuery(
                 "update comment set spam = 1 where id = @id",
                 SqlHelper.CreateParameter("@id", Convert.ToInt32(((LinkButton)sender).CommandArgument)));

                SpamChecker checker = Config.GetChecker();

                if(checker != null)
                {
                    checker.MarkAsSpam(nodeid, name, email, website, comment);
                }
                    
                
            }

            BindData();
        }

        

        public string GetPageDetails(object nodeid)
        {
            int id;
            if(int.TryParse(nodeid.ToString(),out id))
            {
                try
                {
                    Document page = new Document(id);
                    return string.Format(
                        "<a href='{0}' target='_blank'>{1}</a>",
                        umbraco.library.NiceUrl(page.Id), page.Text);
                }
                catch { return string.Empty; }
            }
            else
            {
                return string.Empty;
            }
        }

        public string GetToggleStateText(object spam)
        {
            bool isspam ;
            if (bool.TryParse(spam.ToString(), out isspam))
            {
                if (isspam)
                    return "Mark as ham";
                else
                    return "Mark as spam";
            }
            else
            {
                return string.Empty;
            }
        }

        public string Filter
        {
            get
            {               
                object o = this.ViewState["Filter"];
                if (o == null)
                    return string.Empty; 
                else
                    return (string)o;
            }

            set
            {
                this.ViewState["Filter"] = value;
            }
        }

        protected void btnApproved_Click(object sender, EventArgs e)
        {
            btnApproved.Enabled = false;
            btnSpam.Enabled = true;
            btnAll.Enabled = true;

            Filter = "where spam != 1";
            CurrentPage = 0;
            BindData();
        }

        protected void btnSpam_Click(object sender, EventArgs e)
        {
            btnApproved.Enabled = true;
            btnSpam.Enabled = false;
            btnAll.Enabled = true;

            Filter = "where spam = 1";

            CurrentPage = 0;
            BindData();
        }

        protected void btnAll_Click(object sender, EventArgs e)
        {
            btnApproved.Enabled = true;
            btnSpam.Enabled = true;
            btnAll.Enabled = false;

            Filter = "";
            CurrentPage = 0;
            BindData();
        }

        protected void btnDeleteSelected_Click(object sender, EventArgs e)
        {
            foreach (RepeaterItem item in rptComments.Items)
            {
                CheckBox chk = (CheckBox)item.FindControl("cbSelectComment");

                if (chk.Checked)
                {
                     DeleteComment(Convert.ToInt32(((Label)item.FindControl("lblID")).Text));
                }

            }

            BindData();
        }
    }
}