Ext.define('EC.Main.store.SmokerCabin.ThemesTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Main.model.SmokerCabin.ThemesTree',
    
    defaultRootId: null,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '/json/smokercabin/themes/get-tree'
    }    
});