Ext.define('Project.controller.preparation.InfoController', {
    
    extend: 'Project.controller.abstract.InfoController',
    
    projectStageCode: 1,
    
    refs: [
        { ref: 'info', selector: 'project-preparation-info-component' } // this.getInfo()
    ],
    
    init: function() {
        
        this.listen({
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected
                }
            }
        });
        
    }
    
});