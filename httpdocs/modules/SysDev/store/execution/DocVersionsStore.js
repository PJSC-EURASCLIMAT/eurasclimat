Ext.define('EC.SysDev.store.execution.DocVersionsStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-docs-versions-store',
   
    model: 'EC.SysDev.model.DocVersionModel',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],


    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-docs-versions/get-doc-versions',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});