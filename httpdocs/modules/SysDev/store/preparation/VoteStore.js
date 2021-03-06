Ext.define('EC.SysDev.store.preparation.VoteStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-vote-store',
   
    model: 'EC.SysDev.model.VoteModel',
    
    entity: null,

    proxy: {
        type: 'ajax',
        api: {
            create:     '/json/sysdev/project-votes/add',
            read:       '/json/sysdev/project-votes/get-by-project'
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