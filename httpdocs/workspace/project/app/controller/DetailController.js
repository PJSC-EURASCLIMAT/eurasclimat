Ext.define('Project.controller.DetailController', {
    
    extend: 'Ext.app.Controller',
    
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



    }
    
});