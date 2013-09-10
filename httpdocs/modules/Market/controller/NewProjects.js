Ext.define('EC.Market.controller.NewProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.NewProjects.Layout'
    ],
    
    run: function(container) {
        
        this.getContainer(container);
        
        var MC = this.getController('App.controller.Main');

        var modulesToOpen = [{
            title: 'Госзакупки',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-1',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site4'
        }, {
            title: 'ЭТП ММББ',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-1',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site1'
        }, {
            title: 'Аэрофлот',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-2',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site5'
        }, {
            title: 'Сбербанк-АСТ',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-2',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site2'
        }, {
            title: 'Закупки Сбербанк-АСТ',
            icon: '/images/icons/about.png',
            position: 'Market-NewProjects-column-3',
            allowMultiple: true,
            launchModule: 'EC.Market.controller.NewProjects.Site6'
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
        
        return [];
    }
});