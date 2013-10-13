Ext.define('EC.SysDev.controller.abstract.InfoController', {
    
    extend: 'Ext.app.Controller',
    
    currentProjectId: null,

    onProjectSelected: function(record) {

        if (record.get('leaf') != true) {
            return;
        }

        if (!acl.isView('projectdev', 'info')) {
            return;
        }
        
        this.currentProjectId = record.get('id');

        this.getInfo().getLoader().load({
            params: {
                id: this.currentProjectId
            }
        });

    },
            
    onEditButtonClick: function() {

        var infoPanel = this.getInfo();
        infoPanel.hide();

        this.fireEvent(
            'project-description-editing-requested', 
            this.projectStageCode,
            this.currentProjectId
        );

    },
            
    onEditorHidden: function(projectStageCode) {

        if (projectStageCode !== this.projectStageCode) {
            return;
        }
        
        var infoPanel = this.getInfo();
        
        infoPanel.show();

    },
            
    onProjectInfoUpdated: function(record) {

        var infoPanel = this.getInfo();
        
        this.getInfo().getLoader().load({
            params: {
                id: record.get('id')
            }
        });

    }
    
});