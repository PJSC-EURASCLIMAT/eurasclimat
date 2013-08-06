Ext.define('EC.Main.store.ProjectdevEditor.StagesChart', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.ProjectdevEditor.StagesChart',
    
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-stages/get-chart-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});