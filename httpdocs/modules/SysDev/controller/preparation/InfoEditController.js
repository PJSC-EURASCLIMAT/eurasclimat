Ext.define('EC.Project.controller.preparation.InfoEditController', {
    
    extend: 'EC.Project.controller.abstract.InfoEditController',
    
    projectStageCode: 1,
    
    refs: [
        { ref: 'editor', selector: 'project-preparation-info-editor' }, // this.getEditor()
        { ref: 'saveButton', selector: 'project-preparation-info-editor [itemId="save-button"]' } // this.getSaveButton()
    ],
    
    run: function() {
        
        this.listen({
            component: {
                'project-preparation-info-editor': {
                    dirtychange: this.onFormChange
                },
                'project-preparation-info-editor [itemId="cancel-button"]': {
                    click: this.onCancelButtonClick
                },
                'project-preparation-info-editor [itemId="save-button"]': {
                    click: this.onSaveButtonClick
                }
            }
            ,controller: {
                'preparation-project-controller': {
                    'project-selected': this.onProjectSelected,
//                    'shitEvent': this.testListen,
                    'project-description-editing-requested': this.onEditorRequested
                }
            }
        });
        
    }

    ,testListen: function(){
        console.log("TEST LISTEN PROJECT SELECTION");
    }
    
});