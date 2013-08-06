Ext.define('EC.Main.store.ProjectdevEditor.Comments', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.ProjectdevEditor.Comments',
    
    entity: null,

    proxy: {
        type: 'ajax',
        api: {
            create:     '/json/sysdev/project-discussions/add',
            read:       '/json/sysdev/project-discussions/get-by-project'
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