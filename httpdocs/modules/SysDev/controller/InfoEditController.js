Ext.define('EC.SysDev.controller.InfoEditController', {
    
    extend: 'EC.SysDev.controller.abstract.InfoEditController',

    fullDescWin: null,
    
//    projectStageCode: 1,
    
    refs: [
        { ref: 'editor', selector: 'project-info-editor' }, // this.getEditor()
        { ref: 'saveButton', selector: 'project-info-editor [itemId="save-button"]' } // this.getSaveButton()
    ],

    
    run: function() {
        
        this.listen({
            component: {
                'project-info-editor': {
//                    dirtychange: this.onFormChange,
                    formChanged: this.onFormChange2
                },
                'project-info-editor [itemId="cancel-button"]': {
                    click: this.onCancelButtonClick
                },
                'project-info-editor [itemId="full_desc-button"]': {
                    click: this.openFullDesc
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

    },

    saveFullDesc: function(data) {

        Ext.Ajax.request({
            params: data,
            url: '/json/sysdev/project-info/save',
            success: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'Детальное описание успешно сохранено');
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Детальное описание не сохранено!');
            },
            scope: this
        });

    },

    openFullDesc: function() {

        var fullDesc = this.curProjectModel.get('full_desc');

        if(this.fullDescWin === null) {
            this.fullDescWin = Ext.create('EC.SysDev.view.FullDescWindow',{
                data: this.curProjectModel.data
            });
            this.fullDescWin.on("save",this.saveFullDesc,this);
        }

        var win = this.fullDescWin;
        var form = win.down('#edit').getForm();
        var info = win.down('#info');

        form.reset();
        form.setValues(this.curProjectModel.data);
        win.down('[name=full_desc]').setValue(this.curProjectModel.get('full_desc'));
        info.data = this.curProjectModel.data;
        win.show();

    }

});