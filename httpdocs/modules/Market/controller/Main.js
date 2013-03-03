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
        
        container.add({
            xtype: 'MarketPanel',
            listeners: {
                show: function() {
                    var MC = this.getController('App.controller.Main');
                    MC.populateStaticMenu(this.getMenu());
                },
                scope: this
            }
        });
    },
    
    getMenu: function() {
        return [{
            text: 'Торговая площадка 1'
        }, {
            text: 'Торговая площадка 2'
        }];
    }
});