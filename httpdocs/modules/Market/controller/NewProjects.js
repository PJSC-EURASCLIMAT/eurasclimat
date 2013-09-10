Ext.define('EC.Market.controller.NewProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.NewProjects.Layout'
    ],
    
    run: function(container) {
        
        this.getContainer(container);
        
        var MC = this.getController('App.controller.Main');

        var modulesToOpen = [{
            title: 'ЭТП ММББ',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-1',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site1'
        }, {
            title: 'Сбербанк-АСТ',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-2',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site2'
        }, {
            title: 'ЕЭТП (Росэлторг)',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-3',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site3'
        }];
        
        container.on('show', function() {
            Ext.each(modulesToOpen, function(item) {
                MC.openModulePortlet(item);
            });
        }, this, {single: true});
        
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
        }];
    }
});