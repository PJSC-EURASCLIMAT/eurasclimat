Ext.define('Project.view.preparation.ProjectTree', {

    extend: 'Project.view.abstract.ProjectTree',
    
    alias: 'widget.project-preparation-tree',
    
    initComponent: function() {
        
        this.store = Ext.getStore({
            type: 'project-preparation-tree-store',
            autoload: true
        });
        
        this.callParent(arguments);
    }
    
});