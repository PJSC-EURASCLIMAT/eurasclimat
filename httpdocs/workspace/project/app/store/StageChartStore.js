Ext.define('Project.store.StageChartStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-stage-chart-store',
   
    model: 'Project.model.StageChartModel',
    
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-stages/get-chart-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});