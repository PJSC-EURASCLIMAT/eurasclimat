Ext.define('EC.Main.store.ProjectdevEditor.ThemesTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Main.model.ProjectdevEditor.ThemesTree',
    
    defaultRootId: null,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/projects/get-tree'
    }    

});