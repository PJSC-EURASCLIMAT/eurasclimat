Ext.define('EC.Main.controller.Weather', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.Main.view.Weather'],
    
    init: function(container) {
        
        container.add(this.getView('EC.Main.view.Weather').create());
    }
});