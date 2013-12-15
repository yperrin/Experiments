using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using umbraco.cms.businesslogic.Tags;
using umbraco.cms.businesslogic.web;

namespace asi.asicentral.umbraco
{
    public class UmbracoUtil
    {
        public static Document GetParentByAlias(Document node, string alias)
        {
            Document parent = null;
            Document currentNode = node;
            if (currentNode != null)
            {
                if (currentNode.ContentType.Alias == alias) return currentNode;
                while (parent == null)
                {
                    //iterate up until we find the parent with the riigh alias
                    if (currentNode.Level > 1) currentNode = new Document(currentNode.ParentId);
                    else break;
                    if (currentNode.ContentType.Alias == alias) parent = currentNode;
                }
            }
            return parent;
        }

        public static string NormalizeName(string name)
        {
            return name.Replace(' ', '-').Replace("'", "");
        }

        /// <summary>
        /// Get a list of tags for the blog
        /// </summary>
        /// <param name="blogPostId"></param>
        /// <returns></returns>
        public static IEnumerable<Tag> GetBlogTags(int blogPostId)
        {
            IEnumerable<Tag> tags = null;
            Document blogPostNode = new Document(blogPostId);
            Document blogNode = GetParentByAlias(blogPostNode, "Blog");
            if (blogNode != null)
                tags = Tag.GetTags(NormalizeName((string) blogNode.getProperty("blogName").Value));
            else
                tags = Tag.GetTags(blogPostId);
            return tags;
        }
    }
}