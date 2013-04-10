Ext.define('EC.Main.store.Projectdev.ThemesTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Main.model.Projectdev.ThemesTree',
    
    defaultRootId: null,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/projects/get-tree'
    }    

});