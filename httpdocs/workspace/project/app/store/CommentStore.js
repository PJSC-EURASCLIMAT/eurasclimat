Ext.define('Project.store.CommentStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-comment-store',
   
    model: 'Project.model.CommentModel',
    
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