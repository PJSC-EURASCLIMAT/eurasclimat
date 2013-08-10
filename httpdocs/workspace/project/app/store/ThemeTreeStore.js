Ext.define('Project.store.ThemeTreeStore', {

    extend: 'Ext.data.TreeStore',
    
    alias: 'store.project-theme-tree-store',
   
    model: 'Project.model.ThemeTreeModel',
    
    defaultRootId: null,
    
    proxy: {
        type: 'ajax',
        url: '/json/sysdev/projects/get-tree'
    }    

});