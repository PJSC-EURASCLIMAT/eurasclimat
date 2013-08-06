Ext.define('EC.Main.store.ProjectdevEditor.Votes', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.ProjectdevEditor.Votes',
    
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