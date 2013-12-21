Ext.define('EC.CRM.store.Projects.Discussions', {

    extend: 'Ext.data.Store',
    
    model: 'EC.CRM.model.Projects.Discussions',
    
    proxy: {
        type: 'ajax',
        api: {
            create:     '/json/crm/projects-discussions/add',
            read:       '/json/crm/projects-discussions/get-by-project'
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