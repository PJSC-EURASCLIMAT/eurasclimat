Ext.define('EC.Specialists.view.Layout', {

    extend: 'Ext.tab.Panel',

    alias: 'widget.SpecialistsPanel',
    
    title: 'Специалисты',
    
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
        Ext.create('EC.Specialists.view.SpecialistsCatalog.Layout'),
        Ext.create('EC.Specialists.view.Workgroups.Layout'),
        Ext.create('EC.Specialists.view.Forum.Layout'),
        Ext.create('EC.Specialists.view.Training.Layout'),
        Ext.create('EC.Specialists.view.NewChapter.Layout')
    ]
});