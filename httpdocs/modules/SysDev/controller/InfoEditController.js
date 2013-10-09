Ext.define('EC.SysDev.controller.InfoEditController', {
    
    extend: 'EC.SysDev.controller.abstract.InfoEditController',
    
//    projectStageCode: 1,
    
    refs: [
        { ref: 'editor', selector: 'project-info-editor' }, // this.getEditor()
        { ref: 'saveButton', selector: 'project-info-editor [itemId="save-button"]' } // this.getSaveButton()
    ],
    
    run: function() {
        
        this.listen({
            component: {
                'project-info-editor': {
                    dirtychange: this.onFormChange
                },
                'project-info-editor [itemId="cancel-button"]': {
                    click: this.onCancelButtonClick
                },
                'project-info-editor [itemId="save-button"]': {
                    click: this.onSaveButtonClick
                }
            }
//            ,controller: {
//                'preparation-project-controller': {
//                    'project-selected': this.onProjectSelected,
////                    'shitEvent': this.testListen,
//                    'project-description-editing-requested': this.onEditorRequested
//                }
//            }
        });
        
    }

});