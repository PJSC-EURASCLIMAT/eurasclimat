Ext.define('EC.Main.store.ProjectdevEditor.Stages', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.ProjectdevEditor.Stages',
    
    autoLoad: true,
    
    buffered: true,
    
    leadingBufferZone: 15,
    
    pageSize: 15,
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-stages/get-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});