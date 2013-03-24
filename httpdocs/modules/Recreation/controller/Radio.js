Ext.define('EC.Recreation.controller.Radio', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.Radio.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Радио 1'
        }, {
            text: 'Радио 2'
        }];
    }
});