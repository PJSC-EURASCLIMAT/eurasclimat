Ext.define('EC.Main.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.MainPanel',
    
    id: 'Main-tab',
    
    title: 'Главная',
    
    icon: '/images/icons/about.png',

    tabPosition: 'bottom',
    
    closable: false,
    
    border: false,
        
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        title: 'Рабочий стол',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 2,
        items: [{
//            columnWidth: 0.65,
            id: 'MainPanel-column-1'
        }, {
//            columnWidth: 0.35,
            id: 'MainPanel-column-2'
        }, {
//            columnWidth: 0.35,
            id: 'MainPanel-column-3'
        }]
    }]
});