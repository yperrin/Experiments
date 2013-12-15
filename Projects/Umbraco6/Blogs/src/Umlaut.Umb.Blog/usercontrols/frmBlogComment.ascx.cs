using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using umbraco.presentation.nodeFactory;
using umbraco.cms.businesslogic.web;

namespace Umlaut.Umb.Blog
{
    public partial class frmBlogComment : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// Handles the Click event of the btnSubmit control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            
            DocumentType commentDt = DocumentType.GetByAlias("BlogPostComment");

            Document newComment = Document.MakeNew(
                "comment by " + txtName.Text
                , commentDt, new umbraco.BusinessLogic.User(0),
                Node.GetCurrent().Id);

            newComment.getProperty("name").Value = txtName.Text;
            newComment.getProperty("email").Value = txtEmail.Text;
            newComment.getProperty("website").Value = txtWebsite.Text;
            newComment.getProperty("comment").Value = txtComment.Text;

            newComment.Save();
            newComment.Publish(new umbraco.BusinessLogic.User(0));

            umbraco.library.UpdateDocumentCache(newComment.Id);

            Response.Redirect(umbraco.library.NiceUrl(Node.GetCurrent().Id)+"#comment-"+newComment.Id.ToString());

        }
    }
}