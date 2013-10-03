Ext.define('EC.Project.view.preparation.ProjectTree', {

    extend: 'EC.Project.view.abstract.ProjectTree',
    
    alias: 'widget.project-preparation-tree',
    
    initComponent: function() {
        
        this.store = Ext.getStore({
            type: 'project-preparation-tree-store',
            autoload: true
        });
        
        this.callParent(arguments);
    }
    
});