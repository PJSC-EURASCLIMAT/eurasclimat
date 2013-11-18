Ext.define('EC.SysDev.store.execution.DocVersionsStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-doc-versions-store',
   
    model: 'EC.SysDev.model.DocVersionModel',
  
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-docs/get-doc-versions',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});