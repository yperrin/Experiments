using asi.asicentral.umbraco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using umbraco.cms.businesslogic.web;
using umbraco.interfaces;

namespace Web_Application.DataType
{
    public class BlogTagDataType : umbraco.editorControls.tags.DataType
    {
        #region IDataType Members

        private IDataEditor _Editor;

        public override IDataEditor DataEditor
        {
            get
            {
                if (_Editor == null)
                {
                    var preValues = ((umbraco.editorControls.tags.PrevalueEditor)PrevalueEditor).Prevalues;
                    int? nodeId = int.Parse(umbraco.helper.Request("id"));
                    if (nodeId.HasValue)
                    {
                        Document blogPost = new Document(nodeId.Value);
                        if (blogPost.ContentType.Alias == "BlogPost")
                        {
                            Document blogParent = UmbracoUtil.GetParentByAlias(blogPost, "Blog");
                            if (blogParent != null)
                            {
                                if (preValues["group"] == null || (string)preValues["group"] == "default")
                                    preValues["group"] = UmbracoUtil.NormalizeName(blogParent.Text);
                            }
                        }
                    }
                    _Editor = new umbraco.editorControls.tags.DataEditor(Data, preValues);
                }
                return _Editor;
            }
        }

        public override string DataTypeName
        {
            get { return "Blog Tags"; }
        }

        public override Guid Id
        {
            get { return new Guid("BD8B240F-0DE3-47E5-A172-2DE212CC30B6"); }
        }

        #endregion
    }
}