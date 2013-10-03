Ext.define('EC.Project.controller.execution.InfoEditController', {
    
    extend: 'EC.Project.controller.abstract.InfoEditController',
    
    projectStageCode: 2,
    
    refs: [
        { ref: 'editor', selector: 'project-execution-info-editor' }, // this.getEditor()
        { ref: 'saveButton', selector: 'project-execution-info-editor [itemId="save-button"]' }, // this.getSaveButton()
    ],
    
    init: function() {
        
        this.listen({
            component: {
                'project-execution-info-editor': {
                    dirtychange: this.onFormChange
                },
                'project-execution-info-editor [itemId="cancel-button"]': {
                    click: this.onCancelButtonClick
                },
                'project-execution-info-editor [itemId="save-button"]': {
                    click: this.onSaveButtonClick
                }
            },
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected,
                    'project-description-editing-requested': this.onEditorRequested
                }
            }
        });
        
    }
    
});