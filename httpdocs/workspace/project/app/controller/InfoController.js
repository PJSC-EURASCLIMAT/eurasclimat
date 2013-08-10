Ext.define('Project.controller.InfoController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'info', selector: 'project-info-component' } // this.getInfo()
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
        
        if (!acl.isView('projectdev', 'info')) {
            return;
        }
        
        this.getInfo().getLoader().load({
            params: {
                id: record.get('id')
            }
        });

    }
    
});