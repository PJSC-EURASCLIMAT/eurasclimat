Ext.define('Project.controller.execution.InfoController', {
    
    extend: 'Project.controller.abstract.InfoController',
    
    projectStageCode: 2,
    
    refs: [
        { ref: 'info', selector: 'project-execution-info-component' } // this.getInfo()
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