Ext.define('Project.controller.execution.InfoController', {
    
    extend: 'Project.controller.abstract.InfoController',
    
    projectStageCode: 2,
    
    refs: [
        { ref: 'info', selector: 'project-execution-info-component' }, // this.getInfo()
        { ref: 'editButton', selector: 'project-execution-info-component [itemId="edit-button"]' } // this.getEditButton()
    ],
    
    init: function() {
        
        this.listen({
            component: {
                'project-execution-info-component [itemId="edit-button"]': {
                    click: this.onEditButtonClick
                }
            },
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected,
                    'project-info-editor-hidden': this.onEditorHidden,
                    'project-info-updated': this.onProjectInfoUpdated
                }
            }
        });
        
    }
    
});