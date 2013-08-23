Ext.define('Project.controller.abstract.InfoController', {
    
    extend: 'Ext.app.Controller',

    onProjectSelected: function(record) {
        
        if (record.get('stage') !== this.projectStageCode) {
            return;
        }

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