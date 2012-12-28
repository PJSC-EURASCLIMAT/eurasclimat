Ext.define('EC.Main.controller.Newyear', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.Main.view.Newyear'],
    
    init: function(container) {
        container.add(this.getView('EC.Main.view.Newyear').create());
    }
    
});