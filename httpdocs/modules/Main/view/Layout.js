Ext.define('EC.Main.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.MainPanel',
    
    id: 'Main-tab',
    
    title: 'Главная',

    tabPosition: 'bottom',
    
    closable: false,
    
    border: false,
        
    tbar: [{
        text: 'О системе',
        title: 'О системе',
        launchModule: 'EC.Main.controller.About'
    }, {
        text: 'Новости',
        title: 'Новости',
        position: 'MainPanel-column-2',
        launchModule: 'EC.Main.controller.News'
    }, {
        text: 'Курсы валют',
        title: 'Курсы валют',
        position: 'MainPanel-column-2',
        launchModule: 'EC.Main.controller.Currency'
//    }, {
//        text: 'Партнеры',
//        title: 'Партнеры'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Заказчики',
//        title: 'Заказчики'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Реализованные объекты',
//        title: 'Реализованные объекты'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Контакты',
//        title: 'Контакты'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
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
        columns: 2,
        items: [{
            columnWidth: 0.65,
            id: 'MainPanel-column-1'
        }, {
            columnWidth: 0.35,
            id: 'MainPanel-column-2'
        }]
    }]
});