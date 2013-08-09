Ext.define('EC.Main.store.ProjectdevEditor.Docs', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.ProjectdevEditor.Docs',
  
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