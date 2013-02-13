Ext.define('EC.Main.store.Sysdev.ThemesTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Main.model.Sysdev.ThemesTree',
    
    defaultRootId: null,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/themes/get-tree'
    }    

});