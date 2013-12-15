using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using umbraco.BusinessLogic;
using umbraco.cms.businesslogic.web;
using umbraco.cms.businesslogic.media;

namespace Umlaut.Umb.Blog.EventHandlers
{
    public class AutoChannelCreator : ApplicationBase
    {
        public AutoChannelCreator()
        {
            //Document.AfterPublish += new Document.PublishEventHandler(Document_AfterPublish);
        }

        void Document_AfterPublish(Document sender, umbraco.cms.businesslogic.PublishEventArgs e)
        {
            //is this a blog?
            if (sender.ContentType.Alias == "Blog")
            {
                //is there an author set?
                if (sender.getProperty("owner") != null && !string.IsNullOrEmpty(sender.getProperty("owner").Value.ToString()))
                {
                    int userId = -1;

                    HttpContext.Current.Response.Write("meh " + sender.getProperty("owner").Value.ToString());

                    if (int.TryParse( sender.getProperty("owner").Value.ToString(), out userId))
                    {
                        if (userId >= 0)
                        {
                            User author = User.GetUser(userId);

                            if (author != null && !author.Disabled)
                            {
                                //Does the author have a channel setup?
                                //If the author already have a channel, we won't change it.

                                umbraco.presentation.channels.businesslogic.Channel channel = null;

                                try
                                {
                                    channel = new umbraco.presentation.channels.businesslogic.Channel(author.Id);
                                }
                                catch
                                {
                                    channel = null;
                                }

                                if (channel == null)
                                {

                                    channel = new umbraco.presentation.channels.businesslogic.Channel();
                                    //now we can setup the channel for this author and this blog
                                    channel.Name = sender.Text;
                                    channel.User = author;

                                    channel = new umbraco.presentation.channels.businesslogic.Channel();
                                    channel.DocumentTypeAlias = "BlogPost";
                                    channel.FieldCategoriesAlias = "tags";
                                    channel.FieldDescriptionAlias = "bodyText";
                                    channel.FieldExcerptAlias = "";
                                    channel.FullTree = true;
                                    channel.StartNode = sender.Id;

                                    //we will also setup a media folder for storing all images in, in the media library
                                    Media m = Media.MakeNew(author.Name + "'s blog photos", MediaType.GetByAlias("Folder"), author, author.StartMediaId);
                                    m.Save();
                                    
                                    channel.ImageSupport = true;
                                    channel.MediaFolder = m.Id;
                                    channel.MediaTypeAlias = "Image";
                                    channel.MediaTypeFileProperty = "umbracoFile";
                                    channel.Save();

                                }

                            }
                        }
                    }
                }
            }


        }
    }
}
