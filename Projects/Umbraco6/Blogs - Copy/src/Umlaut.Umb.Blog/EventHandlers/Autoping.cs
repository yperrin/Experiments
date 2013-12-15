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
using System.Xml;
using System.IO;
using umbraco;
using System.Net;
using System.Text;
using umbraco.cms.businesslogic.property;

namespace Umlaut.Umb.Blog.EventHandlers
{
    public class Autoping : ApplicationBase {
        public Autoping() {
            Document.AfterPublish += new Document.PublishEventHandler(Document_AfterPublish);
        }


        void Document_AfterPublish(Document sender, umbraco.cms.businesslogic.PublishEventArgs e) {
            if (sender.ContentType.Alias == "BlogPost") {
                string urls = GetValueRecursively("pingServices", sender.Id);

                if (!string.IsNullOrEmpty(urls)) {
                    string blogUrl;
                    XmlDocument xd = new XmlDocument();

                    try { xd.LoadXml(urls); }
                    catch { }

                    string blogName = GetValueRecursively("blogName", sender.Id);
                    string currentDomain = HttpContext.Current.Request.ServerVariables["SERVER_NAME"].ToLower();
                    library.UpdateDocumentCache(sender.Id);
                    try {
                        blogUrl = library.NiceUrlFullPath(sender.Id);
                        if (!UmbracoSettings.UseDomainPrefixes) blogUrl = "http://" + currentDomain + blogUrl;
                    } catch (Exception) {
                        Log.Add(LogTypes.Debug, sender.Id, "Cound not get 'NiceUrlFullPath' from current application");
                        blogUrl = "http://" + currentDomain + "/" + library.NiceUrl(sender.Id);
                    }

                    foreach (XmlNode link in xd.SelectNodes("//link [@type = 'external']")) {
                        string ping = link.Attributes["link"].Value;
                        //Log.Add(LogTypes.Debug, sender.Id, ping + " n:" + blogName + " u:" + blogUrl);
                        PingService(ping, blogName, blogUrl);
                    }
                }
            }
        }

        private string GetValueRecursively(string alias, int nodeId) {
            Document n = new Document(nodeId);
            Property p = n.getProperty(alias);
    
            if (p != null && !string.IsNullOrEmpty(p.Value.ToString())) return p.Value.ToString();
            else if (n.Level > 1) return GetValueRecursively(alias, n.Parent.Id);
            return string.Empty;
        }

        private void PingService(string ping, string name, string url) {
            try {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(ping);
                request.Method = "POST";
                request.ContentType = "text/xml";

                using (Stream stream = (Stream)request.GetRequestStream()) {
                    using (XmlTextWriter xml = new XmlTextWriter(stream, Encoding.UTF8)) {
                        xml.WriteStartDocument();
                        xml.WriteStartElement("methodCall");
                        xml.WriteElementString("methodName", "weblogUpdates.ping");
                        xml.WriteStartElement("params");
                        xml.WriteStartElement("param");
                        xml.WriteElementString("value", name);
                        xml.WriteEndElement();

                        xml.WriteStartElement("param");
                        xml.WriteElementString("value", url);
                        xml.WriteEndElement();
                        xml.WriteEndElement();
                        xml.WriteEndElement();

                        xml.WriteEndDocument();
                    }
                }
            } catch (Exception ex) {
                Log.Add(LogTypes.Debug, -1, "pinger: url: " + ping + " exception:" + ex.ToString());
            }
        }
    }
}
