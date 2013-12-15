using System;
using System.Collections.Generic;
using System.Web;
using Umlaut.Umb.Blog.Interfaces;

namespace Umlaut.Umb.Blog.Spam
{
    public abstract class SpamChecker: ISpamChecker
    {
        #region ISpamChecker Members

        private string m_providername;
        public string ProviderName
        {
            get { return m_providername; }
            set { m_providername = value; }
        }

        public virtual bool Check(
            int nodeid, string UserAgent, string UserIp,
            string Author, string AuthorEmail, string AuthorUrl, string Content)
        {
            return false;
        }

        public virtual void MarkAsHam(
            int nodeid, string Author, string AuthorEmail, string AuthorUrl, string Content) { }

        public virtual void  MarkAsSpam(
            int nodeid, string Author, string AuthorEmail, string AuthorUrl, string Content) { }

        #endregion
    }
}
