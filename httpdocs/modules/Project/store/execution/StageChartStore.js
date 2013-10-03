Ext.define('EC.Project.store.execution.StageChartStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-stage-chart-store',
   
    model: 'EC.Project.model.StageChartModel',

    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-stages/get-chart-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});