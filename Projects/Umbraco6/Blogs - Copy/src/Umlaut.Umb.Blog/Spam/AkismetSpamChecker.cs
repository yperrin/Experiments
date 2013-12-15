using System;
using System.Collections.Generic;
using System.Web;
using Umlaut.Umb.Blog.Interfaces;
using Joel.Net;

namespace Umlaut.Umb.Blog.Spam
{
    public class AkismetSpamChecker: SpamChecker   {       

        public AkismetSpamChecker()
        {
            this.ProviderName = "Akismet";
        }

        public override Boolean Check(int nodeid,
            string UserAgent, string UserIp, string Author,
            string AuthorEmail, string AuthorUrl, string Content)
        {

           
                Akismet api = Initialize(nodeid);

                if (api != null)
                {
                    AkismetComment comment = new AkismetComment();
                    comment.UserAgent = UserAgent;
                    comment.UserIp = UserIp;
                    comment.CommentType = "comment";
                    comment.CommentAuthor = Author;
                    comment.CommentAuthorEmail = AuthorEmail;
                    comment.CommentAuthorUrl = AuthorUrl;
                    comment.CommentContent = Content;

                    return api.CommentCheck(comment);
                }
                else
                {
                    return false;
                }
        }

        public override void MarkAsHam(int nodeid, string Author, string AuthorEmail, string AuthorUrl, string Content)
        {
             Akismet api = Initialize(nodeid);

             if (api != null)
             {
                 AkismetComment comment = new AkismetComment();
                 comment.CommentType = "comment";
                 comment.CommentAuthor = Author;
                 comment.CommentAuthorEmail = AuthorEmail;
                 comment.CommentAuthorUrl = AuthorUrl;
                 comment.CommentContent = Content;

                 api.SubmitHam(comment);
             }
        }

        public override void MarkAsSpam(int nodeid, string Author, string AuthorEmail, string AuthorUrl, string Content)
        {
            Akismet api = Initialize(nodeid);

            if (api != null)
            {
                AkismetComment comment = new AkismetComment();
                comment.CommentType = "comment";
                comment.CommentAuthor = Author;
                comment.CommentAuthorEmail = AuthorEmail;
                comment.CommentAuthorUrl = AuthorUrl;
                comment.CommentContent = Content;

                api.SubmitSpam(comment);
            }
        }


        private Akismet Initialize(int nodeid)
        {
             umbraco.presentation.nodeFactory.Node blog = 
                new umbraco.presentation.nodeFactory.Node(nodeid);

            while (blog.NodeTypeAlias != "Blog")
            {
                blog = blog.Parent;
            }

            if (blog.GetProperty("akismetAPIKey").Value != string.Empty)
            {
                Akismet api = new Joel.Net.Akismet(
                    blog.GetProperty("akismetAPIKey").Value,
                    "http://" + HttpContext.Current.Request.ServerVariables["HTTP_HOST"] + blog.Url,
                    "Blog4Umbraco2");

                if (!api.VerifyKey())
                {
                    umbraco.BusinessLogic.Log.Add(
                        umbraco.BusinessLogic.LogTypes.Error,
                        -1,
                        "Akismet Key could not be verified, please check if you have a valid Akismet API Key");

                    return null;
                }
                else
                {
                    return api;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
