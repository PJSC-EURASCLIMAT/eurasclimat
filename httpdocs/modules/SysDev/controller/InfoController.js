Ext.define('EC.SysDev.controller.InfoController', {
    
    extend: 'Ext.app.Controller',

    currentProjectId: null,

    curProjectData: null,

    refs: [
        { ref: 'info', selector: 'project-info-component' }, // this.getInfo()
        { ref: 'editButton', selector: 'project-info-component [itemId="edit-button"]' } // this.getEditButton()
    ],

    run: function() {

        this.listen({
            component: {
                'project-info-component [itemId="edit-button"]': {
                    click: this.onEditButtonClick
                },
                'project-info-component': {
                    'show-full_desc': this.showFullDesc
                }
            }
        });
        this.getInfo().getLoader().on('load',this.onInfoLoad,this);
    },

    showFullDesc: function() {
        this.getController('EC.SysDev.controller.InfoEditController').openFullDesc(this.curProjectData);
    },

    onProjectSelected: function(record) {

        if (record.get('leaf') != true) {
            return;
        }

        if (!acl.isView('sysdev', 'info')) {
            return;
        }

        this.currentProjectId = record.get('id');

        this.curProjectModel = record;

        this.getInfo().getLoader().load({
            params: {
                id: this.currentProjectId
            }
        });

    },

    onInfoLoad: function(loader, response, options) {
        this.curProjectData = Ext.JSON.decode(response.responseText).data;
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