Ext.define('EC.Main.store.Projectdev.StagesChart', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.Projectdev.StagesChart',
    
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-stages/get-chart-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});