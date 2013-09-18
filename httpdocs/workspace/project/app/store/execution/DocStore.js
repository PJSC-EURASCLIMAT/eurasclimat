Ext.define('Project.store.execution.DocStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-doc-store',
   
    model: 'Project.model.DocModel',
  
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-docs/get-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});