Ext.define('EC.Main.view.Layout', {

    extend: 'Ext.Panel',

//    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.MainPanel',
    
    id: 'Main-tab',
    
    title: 'Компания',

    closable: false,
    
    border: false,
    
    tbar: [{
        text: 'Ссылка 1',
        title: 'Ссылка 1'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }, {
        text: 'Ссылка 2',
        title: 'Ссылка 2'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }, {
        text: 'Ссылка 3',
        title: 'Ссылка 3'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }]
//    ,
    
//    defaults: {
//        layout: 'fit',
//        closable: true
//    },
//    
//    items: [{
//        id: 'portal-tab-1',
//        title: 'Портал',
//        xtype: 'portalpanel',
//        border: false,
//        closable: false,
//        columns: 3,
//        items: [{
//        }, {
//        }, {
//        }]
//    }]
});