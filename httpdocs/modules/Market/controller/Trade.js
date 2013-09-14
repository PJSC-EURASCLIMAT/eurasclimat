Ext.define('EC.Market.controller.Trade', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Trade.Layout'
    ],
    
    modules: [ {
        title: 'Браузер сайтов',
        icon: '/images/icons/about.png',
//        position: 'Market-NewProjects-column-3',
        allowMultiple: true,
        launchModule: 'EC.Market.controller.SiteView'
}],
    
    run: function(container) {
        
        this.getContainer(container);
        
        var MC = this.getController('App.controller.Main');

        container.on('show', function() {
            Ext.each(this.modules, function(item) {
                MC.openModuleTab(item);
//                MC.openModulePortlet(item);
            });
        }, this, {single: true});
        
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        Ext.each(this.modules, function(item) {
            item.text = item.title;
            item.handler = function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        });
        
        return this.modules;
    }
});