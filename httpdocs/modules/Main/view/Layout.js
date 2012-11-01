Ext.define('EC.Main.view.Layout', {

    extend: 'Ext.Panel',

//    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.MainPanel',
    
    id: 'Main-tab',
    
    title: 'О системе',

    closable: false,
    
    border: false,
    
    tbar: [{
        text: 'Компания',
        title: 'Компания'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }, {
        text: 'Область оказания услуг',
        title: 'Область оказания услуг'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }, {
        text: 'Партнеры',
        title: 'Партнеры'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }, {
        text: 'Заказчики',
        title: 'Заказчики'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }, {
        text: 'Реализованные объекты',
        title: 'Реализованные объекты'
        //lunchModule: 'EC.Main.controller.Article',
        //hidden: !acl.isView()
    }, {
        text: 'Контакты',
        title: 'Контакты'
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