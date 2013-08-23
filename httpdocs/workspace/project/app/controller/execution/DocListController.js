Ext.define('Project.controller.execution.DocListController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'docList', selector: 'project-doc-list' } // this.getDocList()
    ],
    
    init: function() {
        
        this.listen({
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected
                }
            }
        });
        
    },
            
    onProjectSelected: function(record) {

        if (record.get('leaf') != true) {
            return;
        }
        
        if (!acl.isView('projectdev', 'docs')) {
            return;
        }

        this.getDocList().getStore().load({
            params: {
                project_id: record.get('id')
            }
        });

    }
    
});