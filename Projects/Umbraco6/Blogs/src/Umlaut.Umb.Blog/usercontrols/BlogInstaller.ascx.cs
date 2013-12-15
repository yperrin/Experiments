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

namespace Umlaut.Umb.Blog.usercontrols
{
    public partial class BlogInstaller : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void saveAndPublish(object sender, EventArgs e)
        {
            if (Page.IsValid)
            {
                string name = tb_name.Text;
                string desc = tb_description.Text;

                umbraco.BusinessLogic.User currentUser = umbraco.BasePages.UmbracoEnsuredPage.CurrentUser;
                string documentName = "Blog";
                string url = "/";

                umbraco.cms.businesslogic.web.Document[] rootDocs = umbraco.cms.businesslogic.web.Document.GetRootDocuments();

                foreach (umbraco.cms.businesslogic.web.Document rootDoc in rootDocs)
                {
                    if (rootDoc.Text.Trim() == documentName.Trim() && rootDoc != null && rootDoc.ContentType != null)
                    {
                        rootDoc.getProperty("blogName").Value = name;
                        rootDoc.getProperty("blogDescription").Value = desc;
                        rootDoc.getProperty("owner").Value = currentUser.Id.ToString();
                        
                        rootDoc.PublishWithChildrenWithResult(umbraco.BusinessLogic.User.GetUser(0));
                        umbraco.library.UpdateDocumentCache(rootDoc.Id);
                        umbraco.library.RefreshContent();

                        url = umbraco.library.NiceUrl(rootDoc.Id);
                        break;
                    }
                }

                if (string.IsNullOrEmpty(url))
                    url = "/";

                install.Visible = false;
                done.Visible = true;
                blogLink.NavigateUrl = url;
            }
        }
    }
}