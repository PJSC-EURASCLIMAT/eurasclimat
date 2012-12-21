Ext.define('EC.Pa.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.PaPanel',
    
    id: 'Pa-tab',
    
    title: 'Личный кабинет',

    tabPosition: 'bottom',
    
    closable: false,
    
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
            id: 'PaPanel-column-1'
        }, {
            id: 'PaPanel-column-2'
        }, {
            id: 'PaPanel-column-3'
        }]
    }]
});