Ext.define('EC.Main.store.Projectdev.Docs', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.Projectdev.Docs',
        
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/project-docs/get-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});