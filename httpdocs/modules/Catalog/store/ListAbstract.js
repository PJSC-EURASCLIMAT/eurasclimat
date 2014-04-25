Ext.define('EC.Catalog.store.ListAbstract', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.ListAbstract',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    listURL: null,
    
    autoLoad: true,
    
    constructor: function() {
        
        this.callParent(arguments);
        
        this.setProxy({
            type: 'ajax',
            url: this.listURL,
            reader: {
                type: 'json',
                root: 'data'
            }
        });
    }
});