using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;
using System.Collections.Specialized;
using System.Reflection;

using umbraco;
using umbraco.cms.businesslogic.datatype;
using umbraco.cms.businesslogic.web;
using umbraco.cms.businesslogic.propertytype;
using umbraco.DataLayer.SqlHelpers.MySql;
using umbraco.DataLayer.SqlHelpers.SqlServer;
using umbraco.editorControls.tags;
using umbraco.interfaces;
using umbraco.presentation.nodeFactory;

namespace Umlaut.Umb.Blog.Dashboard
{
    public partial class CreatePost : System.Web.UI.UserControl
    {
        private ArrayList _dataFields = new ArrayList();
        private int _parentId = -1;
        private umbraco.editorControls.tinyMCE3.TinyMCE _tinymce = null;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (_tinymce != null)
            {
                umbraco.uicontrols.TabView tabview = GetDashboardPanel();
                if (_tinymce.config["umbraco_toolbar_id"] != null)
                    _tinymce.config.Remove("umbraco_toolbar_id");
                _tinymce.config.Add("umbraco_toolbar_id", tabview.ClientID + "_tab01layer_menu_sl");
            }

        }


        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            // get the blog doctype
            DocumentType blogType = GetBlogPostDocumentType();

            // find any blogs within range of the current user
            SetBlogRoot();

            if (_parentId <= 0)
            {
                blogpostCreatorNoBlog.Visible = true;
                blogpostCreator.Visible = false;
            }
            else
            {
                // hack to make the tagger datatype work as it relys either on id in request collection
                // or current page in nodefactory
                // SetRequestId(_parentId.ToString());

                // load all properties from the first tab
                umbraco.cms.businesslogic.ContentType.TabI contentTab = blogType.getVirtualTabs[0];
                foreach (PropertyType pt in contentTab.PropertyTypes)
                {
                    umbraco.interfaces.IDataType dt = pt.DataTypeDefinition.DataType;

                    // test for tinymce - we need to tell it to add icons to the dashboard menu
                    if (dt.Id == new Guid("{5E9B75AE-FACE-41c8-B47E-5F4B0FD82F83}"))
                    {
                        _tinymce = (umbraco.editorControls.tinyMCE3.TinyMCE)dt.DataEditor;

                    }

                    dt.DataEditor.Editor.ID = pt.Alias;
                    _dataFields.Add(dt);

                    umbraco.interfaces.IData df = pt.DataTypeDefinition.DataType.Data;

                    blogpostControls.Controls.Add(new LiteralControl("<p><label for=\"" + dt.DataEditor.Editor.ClientID
                        + "\"><strong>" + pt.Name + "</strong>" + "</label>"));
                    blogpostControls.Controls.Add(dt.DataEditor.Editor);
                    blogpostControls.Controls.Add(new LiteralControl("</p>"));
                }
            }
        }

        private umbraco.uicontrols.TabView GetDashboardPanel()
        {
            umbraco.uicontrols.TabView tabview =
                (umbraco.uicontrols.TabView)FindControlRecursive(this.Page.Master, "dashboardTabs");
            return tabview;
        }

        public static Control FindControlRecursive(Control Root, string Id)
        {
            if (Root.ID == Id)
                return Root;


            foreach (Control Ctl in Root.Controls)
            {
                Control FoundCtl = FindControlRecursive(Ctl, Id);
                if (FoundCtl != null)
                    return FoundCtl;
            }


            return null;
        }


       
        private void SetBlogRoot()
        {
            if (_parentId == -1) {
				string sql = "select{0}id, path from umbracoNode " +
                             "inner join cmsContent on cmsContent.nodeId = umbracoNode.id " +
                             "inner join cmsContentType on cmsContentType.nodeId = cmsContent.contentType " +
                             "where cmsContentType.alias = '{1}' and path not like '%-20%' and path like '%{2}%' " +
                             "order by path{3}";

                string userStartNode = (umbraco.BasePages.UmbracoEnsuredPage.CurrentUser.StartNodeId != -1)
                                           ? "," + umbraco.BasePages.UmbracoEnsuredPage.CurrentUser.StartNodeId + ","
                                           : umbraco.BasePages.UmbracoEnsuredPage.CurrentUser.StartNodeId + ",";
                if (umbraco.BusinessLogic.Application.SqlHelper.GetType() == typeof(SqlServerHelper)) {
                    sql = String.Format(sql, " TOP 1 ", GetBlogDocumentType().Alias, userStartNode, "");
                } else {
                    sql = String.Format(sql, " ", GetBlogDocumentType().Alias, userStartNode, " LIMIT 0,1");
                }

                _parentId = umbraco.BusinessLogic.Application.SqlHelper.ExecuteScalar<int>(sql);
			}
        }


        private DocumentType GetBlogPostDocumentType()
        {
            return DocumentType.GetByAlias("BlogPost");
        }

        private DocumentType GetBlogDocumentType()
        {
            return DocumentType.GetByAlias("Blog");
        }

        protected void createPost_Click(object sender, EventArgs e)
        {
            SetBlogRoot();

            // Save properties
            Document blogpost = Document.MakeNew(title.Text,
                GetBlogPostDocumentType(),
                umbraco.BasePages.UmbracoEnsuredPage.CurrentUser,
                _parentId);

            // hack to make the tagger datatype work as it relys either on id in request collection
            // or current page in nodefactory
            // SetRequestId(blogpost.Id.ToString());

            foreach (IDataType df in _dataFields)
            {
				DefaultData ddf = (DefaultData)df.Data;

                df.Data.PropertyId = ddf.NodeId;
                df.DataEditor.Save();
            }


            if (publish.Checked)
            {
                blogpost.Publish(umbraco.BasePages.UmbracoEnsuredPage.CurrentUser);
                umbraco.library.UpdateDocumentCache(blogpost.Id);
            }

            Response.Redirect("editContent.aspx?id=" + blogpost.Id, true);
        }

        private void SetRequestId(string id)
        {
            NameValueCollection oQuery = Request.QueryString;
            oQuery = (NameValueCollection)Request.GetType().GetField("_queryString", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(Request);
            PropertyInfo oReadable = oQuery.GetType().GetProperty("IsReadOnly", BindingFlags.NonPublic | BindingFlags.Instance);
            oReadable.SetValue(oQuery, false, null);
            oQuery["id"] = id;
            oReadable.SetValue(oQuery, true, null);
        }
    }
}