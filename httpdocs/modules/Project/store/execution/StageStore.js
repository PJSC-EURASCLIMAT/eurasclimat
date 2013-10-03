Ext.define('EC.Project.store.execution.StageStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-stage-store',
   
    model: 'EC.Project.model.StageModel',
    
    proxy: {
        
        type: 'ajax',
        
        url: '/json/sysdev/project-stages/get-by-project',
        
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});