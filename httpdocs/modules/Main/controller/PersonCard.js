Ext.define('EC.Main.controller.PersonCard', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.PersonCard'],
    
    models: ['EC.Main.model.PersonCard'],
    
    views: ['EC.Main.view.PersonCard'],
    
    newsID: null,
    
    init: function(container) {
        container.add(this.getView('EC.Main.view.PersonCard').create());
    }
});