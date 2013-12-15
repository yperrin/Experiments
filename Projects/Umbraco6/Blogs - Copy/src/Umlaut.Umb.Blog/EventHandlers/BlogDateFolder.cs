using System;
using System.Collections.Generic;
using System.Web;

using umbraco;
using umbraco.cms.businesslogic.web;
using umbraco.BusinessLogic;
using umbraco.BusinessLogic.console;
using umbraco.presentation.nodeFactory;

namespace Umlaut.Umb.Blog
{
    public class BlogDateFolder : umbraco.BusinessLogic.ApplicationBase 
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BlogDateFolder"/> class.
        /// </summary>
        public BlogDateFolder()
        {
            Document.New += new Document.NewEventHandler(Document_New);
            Document.BeforePublish += new Document.PublishEventHandler(Document_BeforePublish);
        }

        /// <summary>
        /// Document_s the new.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="umbraco.cms.businesslogic.NewEventArgs"/> instance containing the event data.</param>
        void Document_New(Document sender, umbraco.cms.businesslogic.NewEventArgs e)
        {
            if (sender.ContentType.Alias == "BlogPost")
            {

                if (sender.getProperty("PostDate") != null)
                {
                    sender.getProperty("PostDate").Value = sender.CreateDateTime.Date;
                }

            }
        }

        /// <summary>
        /// Moves a Post if the Post Date Changes
        /// </summary>
        /// <param name="sender">Document Being Published</param>
        /// <param name="e">Publish Event Args</param>
        void Document_BeforePublish(Document sender, umbraco.cms.businesslogic.PublishEventArgs e)
        {
            if (sender.ContentType.Alias == "BlogPost") //As this runs for every publish event, only proceed if this is BlogPost
            {
                Log.Add(LogTypes.Debug, sender.User, sender.Id, string.Format("Start Before Publish Event for Blog Post {0}", sender.Id));
                if (sender.getProperty("PostDate") != null) //If no post date, skip 
                {
                    if (sender.Parent != null)  //If top of tree, something is wrong.  Skip.
                    {
                        try
                        {
                            DocumentVersionList[] postVersions = sender.GetVersions();
                            bool _versionCheck = true;
                            DateTime postDate;
                            postDate = System.Convert.ToDateTime(sender.getProperty("PostDate").Value);
                            if (postVersions.Length > 1)  //If it has been published, check post date info
                            {
                                //Length -1 is current version Length -2 is past version (if it exists)
                                Guid previousVersion = postVersions[postVersions.Length - 2].Version;
                                Document doc = new Document(sender.Id, previousVersion);
                                DateTime previousPostDate = System.Convert.ToDateTime(doc.getProperty("PostDate").Value);

                                _versionCheck = (postDate != previousPostDate);
                            }

                            if (_versionCheck)  //Only do the date folder movement if the PostDate is changed or is new Post.
                            {
                                string[] strArray = { postDate.Year.ToString(), postDate.Month.ToString(), postDate.Day.ToString() };
                                if (strArray.Length == 3)
                                {
                                    Node topBlogLevel = new Node(sender.Parent.Id);
                                    //Traverse up the tree to Find the Blog Node since we are likely in a Date Folder path
                                    while (topBlogLevel != null && topBlogLevel.NodeTypeAlias != "Blog")
                                    {
                                        if (topBlogLevel.Parent != null)
                                        {
                                            topBlogLevel = new Node(topBlogLevel.Parent.Id);
                                        }
                                        else
                                        {
                                            topBlogLevel = null;
                                        }
                                    }
                                    if (topBlogLevel != null)
                                    {
                                        Document document = null;
                                        Node folderNode = null;
                                        foreach (Node ni in topBlogLevel.Children)
                                        {
                                            if (ni.Name == strArray[0])
                                            {
                                                folderNode = new Node(ni.Id);
                                                document = new Document(ni.Id);
                                                break;
                                            }
                                        }
                                        if (folderNode == null)
                                        {
                                            document = Document.MakeNew(strArray[0], DocumentType.GetByAlias("DateFolder"), sender.User, topBlogLevel.Id);
                                            document.Publish(sender.User);
                                            library.UpdateDocumentCache(document.Id);
                                            folderNode = new Node(document.Id);
                                        }
                                        Node folderNode2 = null;
                                        foreach (Node ni in folderNode.Children)
                                        {
                                            if (ni.Name == strArray[1])
                                            {
                                                folderNode2 = new Node(ni.Id);
                                                break;
                                            }
                                        }
                                        if (folderNode2 == null)
                                        {
                                            Document document2 = Document.MakeNew(strArray[1], DocumentType.GetByAlias("DateFolder"), sender.User, folderNode.Id);
                                            document2.Publish(sender.User);
                                            library.UpdateDocumentCache(document2.Id);
                                            folderNode2 = new Node(document2.Id);
                                        }
                                        Document document3 = null;  //As this is the last check, a document object is fine
                                        foreach (Node ni in folderNode2.Children)
                                        {
                                            if (ni.Name == strArray[2])
                                            {
                                                document3 = new Document(ni.Id);
                                                break;
                                            }
                                        }
                                        if (document3 == null)
                                        {
                                            document3 = Document.MakeNew(strArray[2], DocumentType.GetByAlias("DateFolder"), sender.User, folderNode2.Id);
                                            document3.Publish(sender.User);
                                            library.UpdateDocumentCache(document3.Id);
                                        }
                                        if (sender.Parent.Id != document3.Id)
                                        {
                                            sender.Move(document3.Id);
                                            Log.Add(LogTypes.Debug, sender.User, sender.Id, string.Format("Move Required for BlogPost {0} for PostDate {1}.  Moved Under Node {2}", sender.Id, postDate.ToShortDateString(), document3.Id));
                                        }
                                    }
                                    else
                                    {
                                        Log.Add(LogTypes.Debug, sender.User, sender.Id, string.Format("Unable to determine top of Blog for BlogPost {0} while attempting to move to new Post Date", sender.Id));
                                    }

                                }
                            }
                        }
                        catch (Exception Exp)
                        {
                            Log.Add(LogTypes.Debug, sender.User, sender.Id, string.Format("Error while Finding Blog Folders for BlogPost {0} while trying to move to new Post Date.  Error: {1}", sender.Id, Exp.Message));
                        }

                        umbraco.library.RefreshContent();
                    }
                }
            }
        }

    }
}
