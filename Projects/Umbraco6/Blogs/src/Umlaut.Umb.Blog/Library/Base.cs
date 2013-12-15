using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Text.RegularExpressions;
using umbraco.cms.businesslogic.web;
using System.Data.SqlClient;
using umbraco.DataLayer;
using Joel.Net;
using Umlaut.Umb.Blog.Spam;
using umbraco;
using Umlaut.Umb.Blog.Interfaces;

namespace Umlaut.Umb.Blog.Library
{
    public class Base
    {
public static int CreateComment(int parentId)
{
    HttpRequest post = HttpContext.Current.Request;
    
    string email = post["email"];
    string comment = post["comment"];
    string name = post["author"];
    string website = post["url"];
    
 
    //if all values are there + valid email.. we start to create the comment
    if (!string.IsNullOrEmpty(email) && isValidEmail(email) && !string.IsNullOrEmpty(comment) && !string.IsNullOrEmpty(name))
    {

        Document blogpost = new Document(parentId);

        //if parent is actually a blogpost
        if(blogpost != null && blogpost.ContentType.Alias == "BlogPost"){
           
            umbraco.presentation.nodeFactory.Node blog = new umbraco.presentation.nodeFactory.Node(parentId);
            while (blog.NodeTypeAlias != "Blog")
            {
                blog = blog.Parent;
            }
            int blogid = blog.Id;

            bool isspam = false;

            SpamChecker checker = Config.GetChecker();

            if (checker != null)
            {
                isspam = checker.Check(parentId,
                    post.UserAgent, post.UserHostAddress,
                    name, email, website, comment);
            }

            
            ISqlHelper SqlHelper = DataLayerHelper.CreateSqlHelper(umbraco.GlobalSettings.DbDSN);
            SqlHelper.ExecuteNonQuery(
                @"insert into Comment(mainid,nodeid,name,email,website,comment,spam,created) 
                    values(@mainid,@nodeid,@name,@email,@website,@comment,@spam,@created)",
                 SqlHelper.CreateParameter("@mainid", blogid),
                SqlHelper.CreateParameter("@nodeid", blogpost.Id),
                SqlHelper.CreateParameter("@name", name),
                SqlHelper.CreateParameter("@email", email),
                SqlHelper.CreateParameter("@website", website),
                SqlHelper.CreateParameter("@comment", comment),
                SqlHelper.CreateParameter("@spam", isspam),
                SqlHelper.CreateParameter("@created", DateTime.Now));


            return 1;

        }
    }
    
    //if nothing gets created, we return zero
    return 0;
}


        public static string GetGravatarImage(string email, int size)
        {
            if (isValidEmail(email))
            {
                return string.Format("http://www.gravatar.com/avatar/{0}?s={1}", umbraco.library.md5(email), size.ToString());
            }
            else
            {
                return "";
            }
        }

        private static bool isValidEmail(string email) 
        {
            Regex r = new Regex(@"^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$");

            if(!string.IsNullOrEmpty(email))
                return r.IsMatch(email);
            else 
                return false;
        }
    }
}
