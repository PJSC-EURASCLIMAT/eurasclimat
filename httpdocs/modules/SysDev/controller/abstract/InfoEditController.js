Ext.define('EC.SysDev.controller.abstract.InfoEditController', {
    
    extend: 'Ext.app.Controller',

    currentProjectId: null,

    onProjectSelected: function(record) {

//        if (record.get('stage') !== this.projectStageCode) {
//            return;
//        }

        if (record.get('leaf') != true) {
            return;
        }
        
        if (!acl.isView('projectdev', 'info')) {
            return;
        }
        
        this.currentProjectId = record.get('id');
        
    },
            
    onEditorRequested: function(projectStageCode, projectId) {

//        if (projectStageCode !== this.projectStageCode) {
//            return;
//        }

        var editor = this.getEditor();
        
        editor.show();
        editor.down("[name=id]").setValue(projectId);
        
        this.getModel('EC.SysDev.model.InfoModel').load(projectId, {

            success: function(record, operation) {

                editor.getForm().loadRecord(record);

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

//        record.save({
//            success: function(record, operation) {
//
//                basicForm.loadRecord(record); // загружаем запись в форму повторно, чтобы форма перестала быть dirty
//                basicForm.checkDirty();
//
//                this.fireEvent(
//                    'project-info-editor-hidden',
//                    this.projectStageCode
//                );
//
//                this.fireEvent(
//                    'project-info-updated',
//                    record
//                );
//
//            },
//            scope: this
//        });

    }
    
});