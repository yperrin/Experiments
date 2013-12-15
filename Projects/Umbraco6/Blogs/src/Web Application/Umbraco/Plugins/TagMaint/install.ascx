<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="install.ascx.cs" Inherits="Yoyocms.Umbraco.TagManager.install" %>

<asp:Literal ID="testoutput" runat="server" />
<asp:Panel runat="server" ID="done" Visible="false">
    <p>
        <strong>Installation complete!</strong>
    </p>
    <p>
        All components are now installed.</p>
    <p>
        You will need to log out and back in to see the changes.</p>
        <p>You may even have to "touch" the web.config file to force the umbracoApp / umbracoAppTree table changes to be
        loaded.</p>
</asp:Panel>
<asp:Panel runat="server" ID="error" Visible="false">
    <p>
        <strong>Oops - something went wrong!</strong>
    </p>
    <p>
        There was an error when processing the database updates and umbraco/config/create/ui.xml
        changes.</p>
    <p>
        The changes that being made were:</p>
    <h2>
        umbracoApp Table</h2>
    <ul>
        <li>appAlias - tagMaint</li>
        <li>appIcon - tag.gif</li>
        <li>appName - Tag Maintenance</li>
    </ul>
    <h2>umbracoAppTree</h2>

    <ul>
    <li>treeSilent - 0</li>
    <li>treeInitialize - 1</li>
    <li>treeSortOrder - 0</li>
    <li>appAlias - tagMaint</li>
    <li>treeAlias - tagMaintenance</li>
    <li>treeTitle - Tag Maintenance</li>
    <li>treeIconClosed - legacy</li>
    <li>treeIconOpen - legacy</li>
    <li>treeHandlerAssembly - Yoyocms.Umbraco.TagManager</li>
    <li>treeHandlerType - loadtagMaint</li>
    <li>action - NULL</li>
    </ul>
    <h2>/umbraco/config/create/ui.xml</h2>

    <p>Add the following to the end of the file.</p>

    <p>&lt;nodeType alias="tagMaintenance"&gt;<br />
        &lt;header&gt;Tags&lt;/header&gt;<br />
        &lt;usercontrol&gt;/create/simple.ascx&lt;/usercontrol&gt;<br />
        &lt;tasks&gt;<br />
            &lt;create assembly="Yoyocms.Umbraco.TagManager" type="TagTasks" /&gt;<br />
            &lt;delete assembly="Yoyocms.Umbraco.TagManager" type="TagTasks" /&gt;<br />
        &lt;/tasks&gt;<br />
    &lt;/nodeType&gt;</p>

    <p>Please manually add the above to the ui.xml file.</p>

    <h2>/umbraco/config/lang/en.xml</h2>

    <p>Add the following within the &lt;area alias="sections"&gt;</p>

    <p>
    &lt;key alias="tagMaint"&gt;Tag Maintenance&lt;/key&gt;</p>

    <p>Please manually add the above to the en.xml file.</p>

    <h2>User Access</h2>

    <p>Add the following to the umbracoUser2App table</p>
    <ul><li>user = 0</li><li>app = tagMaint</li></ul>
</asp:Panel>
<asp:Panel runat="server" ID="pnlInstall">
    <p>
        <strong>Almost there!</strong>
    </p>
    <p>
        All that is left to do is to:
        <ol>add entry to umbracoApp table</ol>
        <ol>add entry to umbracoAppTree table</ol>
        <ol>update the /umbraco/config/create/ui.xml file</ol>
        <ol>update the /umbraco/config/lang/en.xml file</ol>
    </p>
    <p>
        <asp:Button ID="btn_Process" runat="server" OnClick="btn_Process_Click" Text="Process Changes" /></p>
</asp:Panel>