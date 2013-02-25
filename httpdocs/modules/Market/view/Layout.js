Ext.define('EC.Market.view.Layout', {

    extend: 'Ext.tab.Panel',

    alias: 'widget.MarketPanel',
    
    title: 'Торговая площадка',
    
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
        Ext.create('EC.Market.view.NewProjects.Layout'),
        Ext.create('EC.Market.view.CurrentProjects.Layout'),
        Ext.create('EC.Market.view.Statistic.Layout'),
        Ext.create('EC.Market.view.Rating.Layout'),
        Ext.create('EC.Market.view.NewChapter.Layout')
    ]
});