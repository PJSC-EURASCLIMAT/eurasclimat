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
//            text: 'Производители',
//            title: 'Производители',
//            icon: '/images/icons/partners.png',
//            portletHeight: 200,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.Manufacturers'
//        }, {
            text: 'Производителям',
            title: 'Производителям',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.Article'
        }, {
            text: 'Заказчикам',
            title: 'Заказчикам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.Article'
        }, {
            text: 'Специалистам',
            title: 'Специалистам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.Article'
        }, {
            text: 'Проекты',
            title: 'Проекты',
            icon: '/images/icons/about.png'
        }, {
            text: 'Конкурсы',
            title: 'Конкурсы',
            icon: '/images/icons/about.png'
        }, {
            text: 'Создать свой подраздел',
            title: 'Создать свой подраздел',
            icon: '/images/icons/about.png'
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
        
        Ext.each(Ext.ComponentQuery.query('TopPanel button[action=allwidgets] menuitem'), function(item) {
            this.openModulePortlet(item);
        }, this);
    }
});