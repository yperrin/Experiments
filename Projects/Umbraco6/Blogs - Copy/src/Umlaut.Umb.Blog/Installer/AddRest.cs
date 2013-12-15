using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml;
using umbraco;

namespace Umlaut.Umb.Blog.Installer
{
    public class addRestExtension : umbraco.interfaces.IPackageAction
    {


        public bool Execute(string packageName, XmlNode xmlData)
        {

            XmlNodeList _newExts = xmlData.SelectNodes("//ext");

            if (_newExts.Count > 0)
            {
                XmlDocument xdoc = new XmlDocument();
                xdoc.PreserveWhitespace = true;
                xdoc = xmlHelper.OpenAsXmlDocument("/config/restExtensions.config");

                XmlNode xn = xdoc.SelectSingleNode("//RestExtensions");

                if (xn != null)
                {
                    for (int i = 0; i < _newExts.Count; i++)
                    {
                        XmlNode newExt = _newExts[i];
                        string _alias = newExt.Attributes["alias"].Value;

                        bool insertExt = true;
                        if (xn.HasChildNodes)
                        {
                            foreach (XmlNode ext in xn.SelectNodes("//ext"))
                            {
                                if (ext.Attributes["alias"] != null && ext.Attributes["alias"].Value == _alias)
                                    insertExt = false;
                            }
                        }

                        if (insertExt)
                        {
                            xn.AppendChild(xdoc.ImportNode(newExt, true));
                        }
                    }

                    xdoc.Save(System.Web.HttpContext.Current.Server.MapPath("/config/restExtensions.config"));
                    return true;
                }
            }
            return false;
        }

        public string Alias()
        {
            return "blog_addRestExtension";
        }

        public bool Undo(string packageName, XmlNode xmlData)
        {

            XmlNodeList _newExts = xmlData.SelectNodes("//ext");

            if (_newExts.Count > 0)
            {
                XmlDocument xdoc = new XmlDocument();
                xdoc.PreserveWhitespace = true;
                xdoc = xmlHelper.OpenAsXmlDocument("/config/restExtensions.config");

                XmlNode xn = xdoc.SelectSingleNode("//RestExtensions");

                if (xn != null)
                {
                    bool inserted = false;

                    for (int i = 0; i < _newExts.Count; i++)
                    {
                        XmlNode newExt = _newExts[i];
                        string _alias = newExt.Attributes["alias"].Value;
                        if (xn.HasChildNodes)
                        {
                            foreach (XmlNode ext in xn.SelectNodes("//ext"))
                            {
                                if (ext.Attributes["alias"] != null && ext.Attributes["alias"].Value == _alias)
                                {
                                    xn.RemoveChild(ext);
                                    inserted = true;
                                }
                            }
                        }
                    }

                    if (inserted)
                    {
                        xdoc.Save(System.Web.HttpContext.Current.Server.MapPath("/config/restExtensions.config"));
                        return true;
                    }
                }
            }
            return false;
        }

        #region IPackageAction Members


        public XmlNode SampleXml()
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
