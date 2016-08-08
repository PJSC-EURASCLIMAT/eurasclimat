Ext.define('EC.SysDev.store.preparation.CommentStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-comment-store',
   
    model: 'EC.SysDev.model.CommentModel',
    
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
    }
});