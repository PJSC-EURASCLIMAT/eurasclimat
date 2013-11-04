Ext.define('EC.SysDev.controller.InfoEditController', {

    extend: 'Ext.app.Controller',

    fullDescWin: null,

    currentProjectId: null,

    curProjectModel: null,
    
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

        });

    },

    onProjectSelected: function(record) {

//        if (record.get('stage') !== this.projectStageCode) {
//            return;
//        }

        if (record.get('leaf') != true) {
            return;
        }

        if (!acl.isView('sysdev', 'info')) {
            return;
        }

        this.currentProjectId = record.get('id');

    },

    onEditorRequested: function(projectStageCode, projectId) {

        var editor = this.getEditor();
        var accCombo = editor.down('[name=account_id]');

        editor.show();
        editor.down("[name=id]").setValue(projectId);

        this.getModel('EC.SysDev.model.InfoModel').load(projectId, {

            success: function(record, operation) {
                editor.getForm().loadRecord(record);

                var rec = accCombo.store.getById(record.get('account_id'))
                accCombo.setValue(rec);

                this.curProjectModel = record;

            },
            scope: this

        });

    },

    onCancelButtonClick: function() {

        var editor = this.getEditor();
        var saveButton = this.getSaveButton();

        if (editor.isDirty()) {

            Ext.Msg.confirm(
                'Внимание',
                'Покинуть форму без сохранения изменений?',
                function(result) {

                    if (result == 'yes') {

                        editor.getForm().reset();

                        editor.hide();

                        saveButton.disable();

                        this.fireEvent(
                            'project-info-editor-hidden',
                            this.projectStageCode
                        );

                    }

                },
                this
            );

        } else {

            editor.getForm().reset();

            editor.hide();

            saveButton.disable();

            this.fireEvent(
                'project-info-editor-hidden',
                this.projectStageCode
            );

        }

    },


    onFormChange2: function(){

        var editor = this.getEditor();
        var saveButton = this.getSaveButton();

        if (editor.getForm().isDirty()) {
            editor.setBodyStyle('backgroundColor', '#FBEFEF');
        } else {
            editor.setBodyStyle('backgroundColor', '#FFFFFF');
        }

        if (editor.getForm().isValid()) {
            saveButton.enable();
        } else {
            saveButton.disable();
        }

    },

    onFormChange: function(basicForm, isDirty) {

        var editor = this.getEditor();

        var saveButton = this.getSaveButton();

        if (isDirty) {

            editor.setBodyStyle('backgroundColor', '#FBEFEF');
            //editor.addBodyCls('dirty-form');

            saveButton.enable();

        } else {

            editor.setBodyStyle('backgroundColor', '#FFFFFF');
            //editor.removeBodyCls('dirty-form');

            saveButton.disable();

        }

    },

    onSaveButtonClick: function() {

        var editor = this.getEditor();
        var saveButton = this.getSaveButton();
        var basicForm = editor.getForm();
        var record = basicForm.getRecord();
        var values = basicForm.getValues();

        saveButton.disable();

        record.set(values); // изменяем значения записи, чтобы сработал метод save()

        basicForm.submit({
            url: '/json/sysdev/project-info/save',
            params: values,
            success: function(form, action) {
                basicForm.loadRecord(record); // загружаем запись в форму повторно, чтобы форма перестала быть dirty
                basicForm.checkDirty();

                this.fireEvent(
                    'project-info-editor-hidden',
                    this.projectStageCode
                );

                this.fireEvent(
                    'project-info-updated',
                    record
                );
            },

            scope: this
        });

    },

    saveFullDesc: function(data) {

        Ext.Ajax.request({
            params: data,
            url: '/json/sysdev/project-info/save-full-desc',
            success: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'Детальное описание успешно сохранено');

                var infoCont = this.getController("EC.SysDev.controller.InfoController");

                infoCont.getInfo().getLoader().load({
                    params: {
                        id: parseInt(opts.params.id)
                    }
                });
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Детальное описание не сохранено!');
            },
            scope: this
        });

    },

    openFullDesc: function(data) {
        if(!Ext.isDefined(data)) {
            data = this.curProjectModel.data;
        }
        data.id = this.currentProjectId;

        if(this.fullDescWin === null) {
            this.fullDescWin = Ext.create('EC.SysDev.view.FullDescWindow',{
                data: data
            });
            this.fullDescWin.on("save",this.saveFullDesc,this);
        }

        var win = this.fullDescWin;
        win.data = data;
//        var form = win.down('#edit').getForm();
//        var info = win.down('#info');

//        form.reset();
//        form.setValues(data);
//        win.down('[name=full_desc]').setValue(data.full_desc);
//        info.update(data.full_desc);
        win.show();

    }

});