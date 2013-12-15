using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI.WebControls;
using umbraco;
using umbraco.cms.businesslogic.datatype;
using umbraco.DataLayer;
using umbraco.BusinessLogic;

namespace Umlaut.Umb.Blog.DataTypes
{
    public class SkinBrowserConfig : System.Web.UI.WebControls.Panel, umbraco.interfaces.IDataPrevalue
    {
        #region IDataPrevalue Members

        public System.Web.UI.Control Editor
        {
            get { return this; }
        }

        public void Save()
        {
            // save the db type
            m_datatype.DBType = (DBTypes)Enum.Parse(typeof(DBTypes), m_dbType.SelectedValue, true);
        
            // save the identifier using prevalues (a hack, indeed!)
            IParameter[] SqlParams = new IParameter[] {
										    SqlHelper.CreateParameter("@value", m_packageId.Text),
											SqlHelper.CreateParameter("@dtdefid",m_datatype.DataTypeDefinitionId)};
            SqlHelper.ExecuteNonQuery("delete from cmsDataTypePreValues where datatypenodeid = @dtdefid", SqlParams);
            SqlHelper.ExecuteNonQuery("insert into cmsDataTypePreValues (datatypenodeid,[value],sortorder,alias) values (@dtdefid,@value,0,'')", SqlParams);

        }

        #endregion

        public SkinBrowserConfig(umbraco.cms.businesslogic.datatype.BaseDataType dataType)
        {
            m_datatype = dataType;
            setupChildControls();
        }

        #region Plumbing
        private umbraco.cms.businesslogic.datatype.BaseDataType m_datatype;
        private DropDownList m_dbType;
        private TextBox m_packageId;

        public static ISqlHelper SqlHelper
        {
            get { return Application.SqlHelper; }
        }

        public void setupChildControls()
        {
            m_dbType = new DropDownList();
            m_dbType.ID = "dbtype";
            m_dbType.Items.Add(DBTypes.Date.ToString());
            m_dbType.Items.Add(DBTypes.Integer.ToString());
            m_dbType.Items.Add(DBTypes.Ntext.ToString());
            m_dbType.Items.Add(DBTypes.Nvarchar.ToString());

            m_packageId = new TextBox();
            m_packageId.ID = "packageId";

            Controls.Add(m_dbType);
            Controls.Add(m_packageId);
        }

        protected override void OnLoad(EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                string[] config = Configuration.Split("|".ToCharArray());
                if (config.Length > 0)
                {
                    m_packageId.Text = config[0];
                }

                // Mark the current db type
                m_dbType.SelectedValue = m_datatype.DBType.ToString();

            }

            base.OnLoad(e);
        }

        protected override void Render(System.Web.UI.HtmlTextWriter writer)
        {
            writer.WriteLine("<table>");
            writer.WriteLine("<tr><th>" + ui.Text("editdatatype", "dataBaseDatatype") + ":</th><td>");
            m_dbType.RenderControl(writer);
            writer.Write("</td></tr>");
            writer.Write("<tr><th>Skin package identifier (name):</th><td>");
            m_packageId.RenderControl(writer);
            writer.Write("</td></tr>");
            writer.Write("</table>");

        }

        public string Configuration
        {
            get
            {
                try
                {
                    return SqlHelper.ExecuteScalar<string>("select value from cmsDataTypePreValues where datatypenodeid = @datatypenodeid", SqlHelper.CreateParameter("@datatypenodeid", m_datatype.DataTypeDefinitionId));
                }
                catch
                {
                    return "";
                }
            }
        }


        #endregion

    }
}
