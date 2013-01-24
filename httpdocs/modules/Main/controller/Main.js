Ext.define('EC.Main.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    init: function(container) {
        
        if (container.down('MainPanel')) {
            container.down('MainPanel').show();
            return;
        }
        
        var menu = [{
//            text: 'Специалисты',
//            title: 'Специалисты',
//            icon: '/images/icons/worker.png',
//            portletHeight: 300,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.Workers'
//        }, {
            text: 'Производители',
            title: 'Производители',
            icon: '/images/icons/partners.png',
            portletHeight: 200,
            position: 'MainPanel-column-2',
            launchModule: 'EC.Main.controller.Manufacturers'
        }, {
            text: 'О системе',
            title: 'О системе',
            icon: '/images/icons/about.png',
            portletHeight: 400,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Main.controller.About'
        }, {
            text: 'Производителям',
            title: 'Производителям',
            icon: '/images/icons/about.png',
            disabled: true
        }, {
            text: 'Заказчикам',
            title: 'Заказчикам',
            icon: '/images/icons/about.png',
            disabled: true
        }, {
            text: 'Специалистам',
            title: 'Специалистам',
            icon: '/images/icons/about.png',
            disabled: true
        }, {
            text: 'Курсы валют',
            title: 'Курсы валют',
            icon: '/images/icons/cur_exch.png',
            portletHeight: 190,
            position: 'MainPanel-column-2',
            launchModule: 'EC.Main.controller.Currency'
        }, {
            text: 'Новости',
            title: 'Новости',
            icon: '/images/icons/news_list.png',
            portletHeight: 400,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.News'
        }];
        
        Ext.each(menu, function(item) {
            item.initConfig = item;
        }, this);
        
        this.mainPanel = container.add({
            xtype: 'MainPanel',
            tbar: menu
        });
        this.mainPanel.show();
        
        this.control({
            'MainPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'MainPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
        
        Ext.each(menu, function(item) {
            this.openModulePortlet(item);
        }, this);
    }
});