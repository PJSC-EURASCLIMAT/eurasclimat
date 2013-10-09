Ext.define('EC.SysDev.store.execution.DocStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-doc-store',
   
    model: 'EC.SysDev.model.DocModel',
  
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-docs/get-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});