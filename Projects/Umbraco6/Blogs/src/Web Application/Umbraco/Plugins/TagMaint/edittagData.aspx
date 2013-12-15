<%@ Page Language="C#" MasterPageFile="/umbraco/masterpages/umbracoPage.Master" AutoEventWireup="true"
    CodeBehind="editTagData.aspx.cs" Inherits="Yoyocms.Umbraco.TagManager.editTagData" %>

<%@ Import Namespace="Yoyocms.Umbraco.TagManager.Model" %>
<%@ Register Namespace="umbraco.uicontrols" Assembly="controls" TagPrefix="umb" %>
<asp:Content ID="Content" ContentPlaceHolderID="body" runat="server">
    <style type="text/css">
        ul.taggedPages
        {
            margin: 0;
            list-style: none;
            padding: 0;
        }
        ul.taggedPages li
        {
            padding-bottom: 5px;
        }
    </style>
    <umb:UmbracoPanel ID="Panel1" runat="Server" hasMenu="true" Text="Edit Tag Data">
        <umb:Pane ID="Panel" runat="server">
            <umb:PropertyPanel ID="PPanel1" runat="Server" Text="Tag" CssClass="propertyItem">
                <asp:TextBox ID="txtTag" runat="server" MaxLength="150" CssClass="guiInputText guiInputStandardSize">
                </asp:TextBox>
            </umb:PropertyPanel>
            <umb:PropertyPanel ID="PPanel3" runat="Server" Text="Tag Group">
                <asp:Label ID="lblGroup" runat="server"></asp:Label>
            </umb:PropertyPanel>
            <umb:PropertyPanel ID="PPane3" runat="server" Text="Pages Tagged<br /><small>Click to go to page</small>" />
            <div style="float: left;">
                <asp:Repeater ID="pagesRpt" runat="server">
                    <HeaderTemplate>
                        <ul class="taggedPages">
                    </HeaderTemplate>
                    <ItemTemplate>
                        <li><a title="View the <%#((TaggedDocument)Container.DataItem).DocumentName%> page"
                            href="<%#((TaggedDocument)Container.DataItem).DocumentURL %>">
                            <%#((TaggedDocument)Container.DataItem).DocumentName%></a></li>
                    </ItemTemplate>
                    <FooterTemplate>
                        </ul>
                    </FooterTemplate>
                </asp:Repeater>
            </div>
            <umb:PropertyPanel ID="PPane4" runat="server" Text="Media Tagged<br /><small>Click to go to media item</small>" />
            <div style="float: left;">
                <asp:Repeater ID="mediaRpt" runat="server">
                    <HeaderTemplate>
                        <ul class="taggedPages">
                    </HeaderTemplate>
                    <ItemTemplate>
                        <li><a title="View the <%#((TaggedMedia)Container.DataItem).DocumentName%> media item"
                            href="<%#((TaggedMedia)Container.DataItem).DocumentURL %>">
                            <%#((TaggedMedia)Container.DataItem).DocumentName%></a></li>
                    </ItemTemplate>
                    <FooterTemplate>
                        </ul>
                    </FooterTemplate>
                </asp:Repeater>
            </div>
        </umb:Pane>
    </umb:UmbracoPanel>
</asp:Content>
