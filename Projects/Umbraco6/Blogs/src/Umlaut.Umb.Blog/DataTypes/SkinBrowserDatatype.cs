using System;
using System.Collections.Generic;
using System.Web;
using umbraco.BusinessLogic;
using umbraco.cms.businesslogic.datatype;

namespace Umlaut.Umb.Blog.DataTypes
{
    public class SkinBrowserDatatype : umbraco.cms.businesslogic.datatype.AbstractDataEditor
    {

        #region Private

        SkinBrowserConfig m_config;
        SkinBrowser m_control = new SkinBrowser();

        #endregion

        #region Properties

        public override string DataTypeName
        {
            get
            {
                return "Umbraco Skin Browser";
            }
        }

        public override Guid Id
        {
            get
            {
                return new Guid("119260A2-9B64-4a08-8A65-42938ECBE799");
            }
        }
        #endregion

        public override umbraco.interfaces.IDataPrevalue PrevalueEditor
        {
            get
            {
                if (m_config == null)
                    m_config = new SkinBrowserConfig(this);
                return m_config;
            }
        }

        public SkinBrowserDatatype()
        {
            DataEditorControl.OnSave += DataEditorControl_OnSave;
            RenderControl = m_control;
            m_control.Init += m_control_Init;
        }

        void DataEditorControl_OnSave(EventArgs e)
        {
            // test if we should download and install a skin
            if (!String.IsNullOrEmpty(m_control.Value) && !m_control.Value.EndsWith(".css"))
            {
                try
                {
                    Guid skinId = new Guid(m_control.Value);
                    if (skinId != Guid.Empty)
                    {
                        try
                        {
                            // download skin
                            string pathToSkinZip = SkinBrowser.DownloadPackage(skinId);

                            // extract skin
                            string pathToSkin = SkinBrowser.ExtractPackage(pathToSkinZip);

                            // install skin
                            m_control.Value = SkinBrowser.InstallSkin(pathToSkin) + "/style.css";
                            Data.Value = m_control.Value;
                            m_control.SuccessMessage = "<strong>Success!</strong><br />Your brand new skin is now downloaded and installed!";
                        }
                        catch (Exception ee)
                        {
                            m_control.ErrorMessage = "<strong>Error installing skin:</strong><br/>" + ee.ToString();
                            Log.Add(LogTypes.Error, ((DefaultData)this.Data).NodeId, "Error installing skin: " + ee.ToString());
                        }
                    }
                }
                catch
                {
                }
            }

        }

        void m_control_Init(object sender, EventArgs e)
        {
            // Pass the current value stored in the DB to the skin browser
            m_control.Value = Data.Value != null ? Data.Value.ToString() : String.Empty;
            m_control.PackageIdentifier =
                ((SkinBrowserConfig)PrevalueEditor).Configuration;
        }
    }
}
