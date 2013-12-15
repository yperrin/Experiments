using System;
using System.Collections.Generic;
using System.Web;
using umbraco.DataLayer;

namespace Umlaut.Umb.Blog.Installer
{
    public class ExecuteNonQuery : umbraco.interfaces.IPackageAction
    {
        #region IPackageAction Members

        public string Alias()
        {
            return "blog_executeNonQuery";
        }

        public bool Execute(string packageName, System.Xml.XmlNode xmlData)
        {

             string statement = xmlData.SelectSingleNode("//Sqlserver").InnerText;

             if (umbraco.GlobalSettings.DbDSN.ToLower().Contains("datalayer=mysql"))
             {
                 statement = xmlData.SelectSingleNode("//MySQL").InnerText;
             }
             else if (umbraco.GlobalSettings.DbDSN.ToLower().Contains("vistadb,vistadb"))
             {
                 statement = xmlData.SelectSingleNode("//VistaDB").InnerText;
             }

             ISqlHelper SqlHelper = DataLayerHelper.CreateSqlHelper(umbraco.GlobalSettings.DbDSN);
             SqlHelper.ExecuteNonQuery(statement);

             return true;
        }

        public System.Xml.XmlNode SampleXml()
        {
            throw new NotImplementedException();
        }

        public bool Undo(string packageName, System.Xml.XmlNode xmlData)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
