using System;
using System.Collections.Generic;
using System.Web;
using System.Xml;
using Umlaut.Umb.Blog.Spam;
using umbraco;
using System.Reflection;

namespace Umlaut.Umb.Blog
{
    public class Config
    {
        public static SpamChecker GetChecker()
        {
            SpamChecker checker = null;
            try
            {
                string assemblyFile =
                    HttpContext.Current.Server.MapPath(
                    String.Format("{0}/..{1}.dll",
                    GlobalSettings.Path,
                    GetProviderAssembly()));

                Assembly checkerAssembly = Assembly.LoadFrom(assemblyFile);

                checker =
                    (SpamChecker)Activator.CreateInstance(
                    checkerAssembly.GetType(GetProviderType()));


            }
            catch (Exception ex) { }

            return checker;
        }

        public static string GetProviderAssembly()
        {
            
            XmlDocument config = new XmlDocument();
            
            config.Load(
                HttpContext.Current.Server.MapPath(umbraco.GlobalSettings.Path + "/plugins/blog4umbraco/SpamChecker.config"));

            XmlNode key = config.SelectSingleNode("/SpamChecker");

            return key.Attributes["assembly"].Value;
 
        }

        public static string GetProviderType()
        {
            XmlDocument config = new XmlDocument();
            config.Load(
                HttpContext.Current.Server.MapPath(umbraco.GlobalSettings.Path + "/plugins/blog4umbraco/SpamChecker.config"));

            XmlNode key = config.SelectSingleNode("/SpamChecker");

            return key.Attributes["type"].Value;
        }
    }
}
