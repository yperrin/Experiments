using System;
using System.Collections.Generic;
using System.Web;

namespace Umlaut.Umb.Blog.Interfaces
{
    public interface ISpamChecker
    {
        String ProviderName { get; set; }

        Boolean Check(int nodeid,
            string UserAgent, string UserIp, string Author, 
            string AuthorEmail, string AuthorUrl, string Content);

        void MarkAsHam(int nodeid,
            string Author, string AuthorEmail, string AuthorUrl,
            string Content);

        void MarkAsSpam(int nodeid,
            string Author, string AuthorEmail, string AuthorUrl,
            string Content);
    }
}
