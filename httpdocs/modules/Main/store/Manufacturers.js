Ext.define('EC.Main.store.Manufacturers', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Main.model.Manufacturers',
    
    defaultRootId: null,
    
    autoLoad: false,
    
    root: {
        children: [],
        expanded: true
    },
    
    proxy: {
        type: 'ajax',
        url: '/json/default/manufacturers/index'
    }    

});