Ext.define('Project.store.DocStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-doc-store',
   
    model: 'Project.model.DocModel',
  
    buffered: true,
    
    leadingBufferZone: 15,
    
    pageSize: 15,
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-docs/get-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});