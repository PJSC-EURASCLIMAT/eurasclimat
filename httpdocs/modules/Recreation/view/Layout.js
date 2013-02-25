Ext.define('EC.Recreation.view.Layout', {

    extend: 'Ext.tab.Panel',

    alias: 'widget.RecreationPanel',
    
    title: 'Зона отдыха',
    
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
        Ext.create('EC.Recreation.view.TV.Layout'),
        Ext.create('EC.Recreation.view.Radio.Layout'),
        Ext.create('EC.Recreation.view.Video.Layout'),
        Ext.create('EC.Recreation.view.Music.Layout'),
        Ext.create('EC.Recreation.view.Games.Layout'),
        Ext.create('EC.Recreation.view.NewChapter.Layout')
    ]
});