using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using umbraco.BusinessLogic;

namespace Umlaut.Umb.Blog.DataTypes
{
    public class UserPicker : umbraco.cms.businesslogic.datatype.AbstractDataEditor
    {
        private DropDownList m_control = new DropDownList();
        public UserPicker()
        {
            base.RenderControl = m_control;
            m_control.Init += new EventHandler(m_control_Init);
            base.DataEditorControl.OnSave += new umbraco.cms.businesslogic.datatype.AbstractDataEditorControl.SaveEventHandler(DataEditorControl_OnSave);
        }

        public override Guid Id
        {
            get
            {
                return new Guid("e66af4a0-e8b4-11de-8a39-0800200c9a66");
            }
        }
        public override string DataTypeName
        {
            get
            {
                return "Userpicker";
            }
        }

        
 
        void m_control_Init(object sender, EventArgs e)
        {
            m_control.Items.Clear();
            foreach (User u in User.getAll())
            {
                m_control.Items.Add(new ListItem(u.Name, u.Id.ToString()));
            }
            m_control.SelectedValue = base.Data.Value != null ? base.Data.Value.ToString() : "";
        }
 
        void DataEditorControl_OnSave(EventArgs e)
        {
            base.Data.Value = m_control.SelectedValue;
        }       
    }
}