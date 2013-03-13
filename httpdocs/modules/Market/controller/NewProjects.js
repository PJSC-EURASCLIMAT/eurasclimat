Ext.define('EC.Market.controller.NewProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.NewProjects.Layout'
    ],
    
//    init: function() {
//        
//        var panel = this.callParent(arguments),
//            menu = this.getMenu();
//            
//        this.openModulePortlet(menu[0], panel);
//    },
    
    openModulePortlet: function(module, panel) {

        var config = module.initConfig || module.initialConfig || module;
            
        config.initConfig = config;
        
        if (panel && !config.allowMultiple 
        && panel.down('[launchModule=' + config.launchModule + ']')) {
            return;
        }

        var container = Ext.create('xlib.portal.Portlet', config);
        container.setHeight(config.portletHeight || 300);
        
        var pos = config.position ? '[id=' + config.position + ']' : '',
            column = panel.down(pos) || panel.down();
        column.insert(0, container);
            
        if (config.launchModule) {
            this.getController(config.launchModule).init(container);
        }
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'Сайт ЭТП ММББ',
            title: 'ЭТП ММББ',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-1',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site1',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Сайт Сбербанк-АСТ',
            title: 'Сбербанк-АСТ',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-2',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site2',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Сайт ЕЭТП (Росэлторг)',
            title: 'ЕЭТП (Росэлторг)',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-3',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site3',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Мини браузер',
            title: 'Мини браузер',
//            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-1',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.MiniBrowser',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
         }, {
            text: 'Технологич. конкурсы',
            title: 'Технологич. конкурсы',
         }, {
            text: 'Технологич. аукционы',
            title: 'Технологич. аукционы',
        }];
    }
});