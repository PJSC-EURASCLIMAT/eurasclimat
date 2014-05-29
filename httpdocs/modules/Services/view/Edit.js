Ext.define('EC.Services.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Информация об эксперте',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,

    height: 400,

    hideFiles: true,

    getFilesURL: null,

    items: [{
        xtype: 'form',
        fields: [{
            fieldLabel: 'test'
        }]
    }],

    requires: [
        'EC.Experts.view.Experts.InfoForm',
        'EC.Experts.view.Experts.FilesList'
    ],

    editURL: '/json/experts/experts/update',


    initComponent: function() {
        this.callParent(arguments);

        this.expertEditForm = this.down('#edit-service-form');
        this.expertEditForm.down('[action=save]').on('click', this.editExpert, this);
    },

    editExpert: function() {

        this.expertEditForm.getForm().submit({
            url: this.editURL,
            success: function(form, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Обновление профиля специалиста прошло успешно.</span>');
                this.fireEvent('updateSuccess', action);
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        var errorMsg = action.result.errors[0].msg;
                        if(errorMsg === 'Expert exists already.') {
                            Ext.Msg.alert('Ошибка', 'Эксперт с таким аккаунтом уже зарегистрирован.');
                        } else {
                            Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                        }


                }
                this.fireEvent('updateFailure');
            },
            scope: this
        });

    }
});