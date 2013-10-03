Ext.define('EC.Project.controller.execution.StageListController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'stageList', selector: 'project-stage-list' } // this.getStageList()
    ],
    
    init: function() {
        
        this.listen({
            component: {
                'project-stage-list': {
                    'edit-button-pressed': this.onEditButtonPressed,
                    'delete-button-pressed': this.onDeleteButtonPressed
                }
            },
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected,
                    'project-stage-editor-hidden': this.onEditorHidden
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

    },
            
    onEditButtonPressed: function(stageRecord) {

        this.getStageList().hide();
        this.fireEvent('stage-editing-requested', stageRecord);

    },
            
    onDeleteButtonPressed: function(stageRecord) {

        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(buttonName) {
            if ('yes' === buttonName) {
                
                var store = this.getStageList().getStore();
                store.remove(stageRecord);
                store.sync();
                
            }
        }, this);

    },
            
    onEditorHidden: function() {
        
        this.getStageList().show();

    }
    
});