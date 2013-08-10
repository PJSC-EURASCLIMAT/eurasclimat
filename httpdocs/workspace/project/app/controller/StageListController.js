Ext.define('Project.controller.StageListController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'stageList', selector: 'project-stage-list' } // this.getStageList()
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
        
        if (!acl.isView('projectdev', 'stages')) {
            return;
        }

        this.getStageList().getStore().load({
            params: {
                project_id: record.get('id')
            }
        });

    }
    
});