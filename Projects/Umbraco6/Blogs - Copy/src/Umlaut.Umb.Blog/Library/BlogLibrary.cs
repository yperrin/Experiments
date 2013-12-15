using System;
using System.Collections.Generic;
using System.Web;
using System.Xml.XPath;
using System.Xml;
using System.Data;
using umbraco.DataLayer;
using System.IO;

namespace Umlaut.Umb.Blog
{
    public class BlogLibrary
    {

        public static string Dictionary(string text, string fallback)
        {
            string key = text.Trim().TrimStart('#');
            string result = umbraco.library.GetDictionaryItem(key);

            if (result.Length > 0)
                 return result;
            else if(!string.IsNullOrEmpty(fallback))
                 return fallback;

            return key;
        }

        /// <summary>
        /// Gets the gravatar.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <param name="size">The size.</param>
        /// <param name="defaultImage">The default image.</param>
        /// <returns></returns>
        public static string getGravatar(string email, int size, string defaultImage)
        {
            System.Security.Cryptography.MD5 md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] result = md5.ComputeHash(System.Text.Encoding.ASCII.GetBytes(email));

            System.Text.StringBuilder hash = new System.Text.StringBuilder();
            for (int i = 0; i < result.Length; i++)
                hash.Append(result[i].ToString("x2"));

            System.Text.StringBuilder image = new System.Text.StringBuilder();

            image.Append("http://www.gravatar.com/avatar.php?");
            image.Append("gravatar_id=" + hash.ToString());
            image.Append("&amp;rating=G");
            image.Append("&amp;size=" + size.ToString());
            image.Append("&amp;default=");
            image.Append(System.Web.HttpContext.Current.Server.UrlEncode(defaultImage));
           

            return image.ToString();
        }

        public static XPathNodeIterator GetComments()
        {           
            ISqlHelper SqlHelper = DataLayerHelper.CreateSqlHelper(umbraco.GlobalSettings.DbDSN);

            IRecordsReader rr = SqlHelper.ExecuteReader(
                "select * from comment where spam != 1");

            return CommentsToXml(rr);
        }

        public static XPathNodeIterator GetCommentsForBlog(int id)
        {
            ISqlHelper SqlHelper = DataLayerHelper.CreateSqlHelper(umbraco.GlobalSettings.DbDSN);

            IRecordsReader rr = SqlHelper.ExecuteReader(
                "select * from comment where mainid = @mainid and spam != 1",
                SqlHelper.CreateParameter("@mainid", id));

            return CommentsToXml(rr);
        }

        public static XPathNodeIterator GetCommentsForPost(int id)
        {

            ISqlHelper SqlHelper = DataLayerHelper.CreateSqlHelper(umbraco.GlobalSettings.DbDSN);
           
            IRecordsReader rr = SqlHelper.ExecuteReader(
                "select * from comment where nodeid = @nodeid and spam != 1",
                 SqlHelper.CreateParameter("@nodeid", id));

            return CommentsToXml(rr);
        }

        private static XPathNodeIterator CommentsToXml(IRecordsReader rr)
        {
            XmlDocument xd = new XmlDocument();

            XmlNode x = umbraco.xmlHelper.addTextNode(xd, "comments", "");

            while (rr.Read())
            {
                XmlNode c = xd.CreateElement("comment");

                c.Attributes.Append(umbraco.xmlHelper.addAttribute(xd, "id", rr.GetInt("id").ToString()));
                c.Attributes.Append(umbraco.xmlHelper.addAttribute(xd, "nodeid", rr.GetInt("nodeid").ToString()));
                c.Attributes.Append(umbraco.xmlHelper.addAttribute(xd, "created", rr.GetDateTime("created").ToString()));

                c.AppendChild(umbraco.xmlHelper.addCDataNode(xd, "name", rr.GetString("name")));
                c.AppendChild(umbraco.xmlHelper.addCDataNode(xd, "email", rr.GetString("email")));
                c.AppendChild(umbraco.xmlHelper.addCDataNode(xd, "website", rr.GetString("website")));
                c.AppendChild(umbraco.xmlHelper.addCDataNode(xd, "message", rr.GetString("comment")));

                x.AppendChild(c);
            }

            xd.AppendChild(x);
            rr.Close();
            return xd.CreateNavigator().Select(".");
        }

        public static int CountSeparatedStringMatches(string input1, string separator1, string input2, string separator2)
        {
            string[] taggroup1 = input1.Split(new string[] { separator1 }, StringSplitOptions.RemoveEmptyEntries);
            string[] taggroup2 = input2.Split(new string[] { separator2 }, StringSplitOptions.RemoveEmptyEntries);

            int score = 0;
            foreach (string srctag in taggroup1)
            {
                foreach (string targettag in taggroup2)
                {
                    if (srctag == targettag)
                    {
                        score++;
                    }
                }
            }

            return score;

        }

        private static XPathNodeIterator GetIteratorFromString(string xmlstring)
        {
            XmlDocument xd = new XmlDocument();
            xd.LoadXml(xmlstring);
            XPathNavigator xp = xd.CreateNavigator();
            return xp.Select("/");
        }

        public static XPathNodeIterator GetSkin(string cssFilePath)
        {
           
            XmlDocument document;
            try
            {
                var server = System.Web.HttpContext.Current.Server;
                var cssFilePhysicalPath = server.MapPath(cssFilePath);

                if (!File.Exists(cssFilePhysicalPath))
                {
                    document = new XmlDocument();
                    document.LoadXml(string.Format("<error>Could not find the CSS file '{0}'</error>", cssFilePath));
                    return document.CreateNavigator().Select("/");
                }

                var skinFilePath = Path.Combine(Path.GetDirectoryName(cssFilePhysicalPath), "skin.xml");
                if (!File.Exists(skinFilePath))
                {
                    document = new XmlDocument();
                    document.LoadXml(string.Format("<error>Could not find the skin file '{0}'</error>", skinFilePath));
                    return document.CreateNavigator().Select("/");
                }

                document = new XmlDocument();
                document.Load(skinFilePath);
                return document.CreateNavigator().Select("/skin");
            }
            catch (Exception exception)
            {
                document = new XmlDocument();
                document.LoadXml(string.Format("<error><message>{0}</message><stackTrace>{1}</stackTrace></error>", exception.Message, exception.StackTrace));
                return document.CreateNavigator().Select("/");
            }
            
        }
    }
}
