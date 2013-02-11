Ext.define('EC.PA.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.PAPanel',
    
    id: 'PA-tab',
    
    title: 'Личный кабинет',

    icon: '/images/icons/worker.png',
    
    tabPosition: 'bottom',
    
    closable: true,
    
    border: false,
        
    tbar: [{
        text: ' ',
        title: ' '
        //launchModule: 'EC.Main.controller.About'
    }],
    
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        title: 'Рабочий стол',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'PAPanel-column-1'
        }, {
            id: 'PAPanel-column-2'
        }, {
            id: 'PAPanel-column-3'
        }]
    }]
});