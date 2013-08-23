Ext.define('Project.store.execution.StageStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-stage-store',
   
    model: 'Project.model.StageModel',

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