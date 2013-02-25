Ext.define('EC.CRM.view.Layout', {

    extend: 'Ext.tab.Panel',

    alias: 'widget.CRMPanel',
    
    title: 'CRM',
    
    icon: '/images/icons/about.png',

    requires: ['xlib.portal.PortalPanel'],
    
    closable: false,
    
    border: false,
    
    bodyBorder: false,

    tabBar: {
        style: 'margin-top: -1px;'
    },

    defaults: {
        layout: 'fit',
        bodyBorder: false,
        closable: false
    },
    
    items: [
        Ext.create('EC.CRM.view.CurrentProjects.Layout'),
        Ext.create('EC.CRM.view.ProjectsParticipants.Layout'),
        Ext.create('EC.CRM.view.ProjectsDocuments.Layout'),
        Ext.create('EC.CRM.view.Payments.Layout'),
        Ext.create('EC.CRM.view.Methods.Layout'),
        Ext.create('EC.CRM.view.Directories.Layout'),
        Ext.create('EC.CRM.view.NewChapter.Layout')
    ]
});