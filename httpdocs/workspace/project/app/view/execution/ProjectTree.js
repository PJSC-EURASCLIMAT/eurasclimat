Ext.define('Project.view.execution.ProjectTree', {

    extend: 'Project.view.abstract.ProjectTree',
    
    alias: 'widget.project-execution-tree',
    
    initComponent: function() {
        
        this.store = Ext.getStore({
            type: 'project-execution-tree-store',
            autoload: true
        });
        
        this.callParent(arguments);
    }
    
});