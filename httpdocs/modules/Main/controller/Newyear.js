Ext.define('EC.Main.controller.Newyear', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.Main.view.Newyear'],
    
    run: function(container) {
        container.add(this.getView('EC.Main.view.Newyear').create());
    }
    
});