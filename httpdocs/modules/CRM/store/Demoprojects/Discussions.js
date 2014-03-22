Ext.define('EC.CRM.store.Demoprojects.Discussions', {

    extend: 'Ext.data.Store',
    
    model: 'EC.CRM.model.Demoprojects.Discussions',
    
    proxy: {
        type: 'ajax',
        api: {
            create:     '/json/crm/demoprojects-discussions/add',
            read:       '/json/crm/demoprojects-discussions/get-by-project'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            root: 'data',
            encode: true
        }
    },

    constructor: function() {
        this.callParent(arguments);
    }
});