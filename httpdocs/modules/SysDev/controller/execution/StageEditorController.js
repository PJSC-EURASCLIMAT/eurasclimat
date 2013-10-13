Ext.define('EC.SysDev.controller.execution.StageEditorController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'editor', selector: 'project-execution-stage-editor' }, // this.getEditor()
        { ref: 'saveButton', selector: 'project-execution-stage-editor [itemId="save-button"]' } // this.getSaveButton()
    ],
    
    run: function() {
        
        this.listen({
            component: {
                'project-execution-stage-editor': {
                    dirtychange: this.onFormChange
                },
                'project-execution-stage-editor [itemId="cancel-button"]': {
                    click: this.onCancelButtonClick
                },
                'project-execution-stage-editor [itemId="save-button"]': {
                    click: this.onSaveButtonClick
                },
                'project-execution-stage-editor [itemId="add-button"]': {
                    click: this.onAddButtonClick
                }
            }
//            ,controller: {
//                '*': {
//                    'stage-editing-requested': this.onEditingRequest
//                }
//            }
        });

    },
            
    onEditingRequest: function(record) {

        var editor = this.getEditor();

        this.getEditor().down('#add-button').hide();
        this.getEditor().down('#save-button').show();

        editor.show();
        
        editor.loadRecord(record);

    },

    onAddingRequest: function(record) {

        var editor = this.getEditor();

        this.getEditor().down('#add-button').show();
        this.getEditor().down('#save-button').hide();

        editor.show();

        editor.loadRecord(record);


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
                            'project-stage-editor-hidden'
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
                'project-stage-editor-hidden'
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

    onAddButtonClick: function() {

        var editor = this.getEditor();
        var saveButton = this.getSaveButton();
        var basicForm = editor.getForm();
        var record = basicForm.getRecord();
        var values = basicForm.getValues();

        saveButton.disable();

        record.set(values); // изменяем значения записи, чтобы сработал метод save()

        basicForm.submit({
            url: '/json/sysdev/project-stages/add',
            params: values,
            success: function(form, action) {
                basicForm.loadRecord(record); // загружаем запись в форму повторно, чтобы форма перестала быть dirty
                basicForm.checkDirty();

                this.fireEvent(
                    'project-stage-editor-hidden',
                    this.projectStageCode
                );

                this.fireEvent(
                    'project-stage-updated',
                    record
                );
            },

            scope: this
        });

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
            url: '/json/sysdev/project-stages/update',
            params: values,
            success: function(form, action) {
                basicForm.loadRecord(record); // загружаем запись в форму повторно, чтобы форма перестала быть dirty
                basicForm.checkDirty();

                this.fireEvent(
                    'project-stage-editor-hidden',
                    this.projectStageCode
                );

                this.fireEvent(
                    'project-stage-updated',
                    record
                );
            },

            scope: this
        });

    }
    
});