using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

namespace Umlaut.Umb.Blog.plugins.blog4umbraco
{
    public partial class skinBrowser1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string url = String.Format("http://packages.umbraco.org/skins/{0}/getskinsasxml", umbraco.helper.Request("package"));
            XmlDocument xmlDoc = new XmlDocument();
            WebRequest request = WebRequest.Create(url);
            try
            {
                WebResponse response = request.GetResponse();
                Stream responseStream = response.GetResponseStream();
                XmlTextReader reader = new XmlTextReader(responseStream);

                xmlDoc.Load(reader);

                response.Close();
                responseStream.Close();

                // process the skins here
                StringBuilder sb = new StringBuilder();
                foreach (XmlNode skin in xmlDoc.SelectNodes("//skin"))
                    {
                    sb.Append(
                        String.Format(
                        "<li id=\"{0}\"><a href=\"#\" onClick=\"chooseSkin('{0}')\"><img src=\"http://packages.umbraco.org{1}\" alt=\"{2}\" /></a><div class=\"skinBrowserInfo\"><h4>{2}</h4><p>{3}<br /><small>Author: {4}</small></p><p><a href=\"#\" onClick=\"chooseSkin('{0}')\">Choose this skin</a></p></div><br style=\"clear: both;\" /></li>",
                        skin.SelectSingleNode("package").FirstChild.Value,
                        skin.SelectSingleNode("thumbnail").FirstChild.Value,
                        skin.SelectSingleNode("title").FirstChild.Value,
                        skin.SelectSingleNode("description").FirstChild.Value,
                        skin.SelectSingleNode("author/name").FirstChild.Value
                        ));
                }

                skinLists.Text = sb.ToString();
            }
            catch (Exception err)
            {
                throw new Exception(String.Format("Error reading skins: {0}", err.ToString()));
            }
        }
    }
}
