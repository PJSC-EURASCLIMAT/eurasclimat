Ext.define('EC.Main.store.AboutSystem.ThemesTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Main.model.AboutSystem.ThemesTree',
    
    defaultRootId: null,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '/json/aboutsystem/themes/get-tree'
    }    
});