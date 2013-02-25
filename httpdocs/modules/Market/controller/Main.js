Ext.define('EC.Market.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Layout'
    ],
    
    init: function(container) {
        
        if (container.down('MarketPanel')) {
            container.down('MarketPanel').show();
            return;
        }
        this.mainPanel = container.add({xtype: 'MarketPanel'});
        this.mainPanel.show();
       
        this.control({
            'MarketPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});