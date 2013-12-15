using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Xml;
using ICSharpCode.SharpZipLib.Zip;
using umbraco;
using umbraco.BusinessLogic;
using umbraco.cms.businesslogic.web;
using umbraco.presentation.nodeFactory;

namespace Umlaut.Umb.Blog.DataTypes
{
    public class SkinBrowser : System.Web.UI.HtmlControls.HtmlInputHidden
    {

        public string PackageIdentifier { get; set; }
        public string ErrorMessage { get; set; }
        public string SuccessMessage { get; set; }
        
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            Page.ClientScript.RegisterClientScriptInclude("skinBrowser", Page.ResolveUrl(GlobalSettings.Path + "/plugins/blog4umbraco/skinBrowser.js"));
            umbraco.uicontrols.helper.AddLinkToHeader("skinBrowser", Page.ResolveUrl(GlobalSettings.Path + "/plugins/blog4umbraco/skinBrowser.css"), this.Page);
        }

        protected override void Render(System.Web.UI.HtmlTextWriter writer)
        {
            writer.Write(String.Format(
                "<input type=\"hidden\" name=\"{0}\" id=\"{1}\" value=\"{2}\" />", this.UniqueID, ClientID, Value 
                ));

            // any errors?
            if (!String.IsNullOrEmpty(ErrorMessage))
            {
                writer.Write("<div class=\"error\"><p>" + ErrorMessage + "</p></div>");
            } else if (!String.IsNullOrEmpty(SuccessMessage))
            {
                writer.Write("<div class=\"success\"><p>" + SuccessMessage + "</p></div>");
            }

            writer.Write(String.Format("<p>Your current theme is '{0}'</p><p><a href=\"#\" id=\"themeLoadLink_{2}\" onClick=\"loadSkins('{2}','{1}');\">Change theme (requires online access)</a></p>", Value, PackageIdentifier, ClientID));
            writer.Write(String.Format("<ul class=\"skinBrowser\" id=\"skinContainer_{0}\"></ul>", ClientID));
        }

        public static string DownloadPackage(Guid packageGuid)
        {
            umbraco.cms.businesslogic.packager.Installer installer = new umbraco.cms.businesslogic.packager.Installer();
            return HttpContext.Current.Server.MapPath(Path.Combine(umbraco.GlobalSettings.StorageDirectory, installer.Fetch(packageGuid)));
        }

        public static string ExtractPackage(string zipPath)
        {
            // Unzip
            string tempDir = HttpContext.Current.Server.MapPath(GlobalSettings.StorageDirectory) + Path.DirectorySeparatorChar + Guid.NewGuid().ToString();
            Directory.CreateDirectory(tempDir);

            ZipInputStream s = new ZipInputStream(File.OpenRead(zipPath));

            ZipEntry theEntry;
            while ((theEntry = s.GetNextEntry()) != null)
            {
                string directoryName = Path.GetDirectoryName(theEntry.Name);
                string fileName = Path.GetFileName(theEntry.Name);

                if (fileName != String.Empty)
                {
                    if (!Directory.Exists(tempDir + Path.DirectorySeparatorChar + directoryName))
                    {
                        Directory.CreateDirectory(tempDir + Path.DirectorySeparatorChar + directoryName);
                    }

                    FileStream streamWriter = File.Create(tempDir + Path.DirectorySeparatorChar + directoryName + Path.DirectorySeparatorChar + fileName);

                    int size = 2048;
                    byte[] data = new byte[2048];
                    while (true)
                    {
                        size = s.Read(data, 0, data.Length);
                        if (size > 0)
                        {
                            streamWriter.Write(data, 0, size);
                        }
                        else
                        {
                            break;
                        }
                    }

                    streamWriter.Close();

                }
            }

            // Clean up
            s.Close();
            File.Delete(zipPath);

            return tempDir;
        }

        public static string InstallSkin(string skinPath)
        {
            // read xml
            XmlDocument xd = new XmlDocument();
            xd.Load(skinPath + "\\skin.xml");

            // handle files
            string skinDirName = "skin_" + safeFileName(getNodeValue(xd, "/skin/title"));
            string folderPath = HttpContext.Current.Server.MapPath(umbraco.GlobalSettings.Path + "/../css/" + skinDirName);

            if (System.IO.Directory.Exists(folderPath))
                System.IO.Directory.Delete(folderPath, true);

            Directory.Move(skinPath, folderPath);


            // create stylesheet
            // TODO: Update stylesheet if it exists
            string cssName = skinDirName + "/style";
            bool cssExists = false;
            foreach (StyleSheet ss in StyleSheet.GetAll())
            {
                if (ss.Text == cssName)
                {
                    cssExists = true;
                    break;
                }
            }

            if (!cssExists) {
            StyleSheet css = StyleSheet.MakeNew(
                User.GetUser(0), cssName, cssName +".css", "");
            }
            return "/css/" + skinDirName;
        }

        private static string getNodeValue(XmlDocument xd, string xPath)
        {
            XmlNode node = xd.SelectSingleNode(xPath);
            if (node != null && node.FirstChild != null && !String.IsNullOrEmpty(node.FirstChild.Value))
                return node.FirstChild.Value;
            return "";
        }


        private static string safeFileName(string skinName)
        {
            skinName = skinName.Replace(" ", "_");
            foreach (char lDisallowed in System.IO.Path.GetInvalidFileNameChars())
            {
                skinName = skinName.Replace(lDisallowed.ToString(), "");
            } foreach (char lDisallowed in System.IO.Path.GetInvalidPathChars())
            {
                skinName = skinName.Replace(lDisallowed.ToString(), "");
            }

            return skinName;

        }
    }
}
