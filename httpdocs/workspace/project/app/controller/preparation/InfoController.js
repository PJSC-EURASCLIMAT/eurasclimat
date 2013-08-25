Ext.define('Project.controller.preparation.InfoController', {
    
    extend: 'Project.controller.abstract.InfoController',
    
    projectStageCode: 1,
    
    refs: [
        { ref: 'info', selector: 'project-preparation-info-component' }, // this.getInfo()
        { ref: 'editButton', selector: 'project-preparation-info-component [itemId="edit-button"]' } // this.getEditButton()
    ],
    
    init: function() {
        
        this.listen({
            component: {
                'project-preparation-info-component [itemId="edit-button"]': {
                    click: this.onEditButtonClick
                }
            },
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected
                }
            }
        });
        
    }
    
});