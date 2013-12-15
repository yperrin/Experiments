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
    public partial class AjaxCommentForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack)
            {
                Library.Base.CreateComment(umbraco.presentation.nodeFactory.Node.GetCurrent().Id);
            }
        }
    }
}