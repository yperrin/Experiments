using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using umbraco.BusinessLogic;
using umbraco.cms.businesslogic.web;

namespace Umlaut.Umb.Blog.Dashboard
{
    public partial class BlogCreator : System.Web.UI.UserControl
    {
        public umbraco.controls.ContentPicker cp = new umbraco.controls.ContentPicker();
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            
            
            ph_contentPicker.Controls.Add(cp);
            
            if (!Page.IsPostBack)
            {
                dd_author.Items.Clear();
                ListItem li = new ListItem("Create a new blog author account", "create");
                dd_author.Items.Add(li);

                foreach(User u in User.getAll())
                {
                    dd_author.Items.Add(new ListItem(u.Name, u.Id.ToString()));
                }
            }
        }

        protected void blogCreateClick(object sender, EventArgs e)
        {
            DocumentType dt = DocumentType.GetByAlias("Blog");
            int parent = !String.IsNullOrEmpty(cp.Text) ? int.Parse(cp.Text) : -1;
            Document d = Document.MakeNew(tb_name.Text, dt, User.GetCurrent(), parent);

            /*
            if(dd_author.SelectedValue == "create"){
                //UserType ut = UserType.GetUserType(
                //User u = User.MakeNew(tb_AuthorName.Text, tb_AuthorName.Text,
            }else{
                        
            }
            */

            d.getProperty("owner").Value = User.GetCurrent().Id;
            d.getProperty("blogName").Value = tb_name.Text;
            d.getProperty("blogDescription").Value = "The blog of " + User.GetCurrent().Name;

            d.Save();

            d.Publish(User.GetCurrent());
            umbraco.library.UpdateDocumentCache(d.Id);

            Response.Redirect("editContent.aspx?id=" + d.Id, true);
                    }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}