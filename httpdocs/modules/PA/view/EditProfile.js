Ext.define('EC.PA.view.EditProfile', {
    
    extend: 'Ext.window.Window',
    
    uses: [
        'xlib.ContrCityField',
        'xlib.TZCombo',
        'xlib.LanguageCombo',
        'xlib.form.ImageField'
    ],

    requires: [
        'EC.PA.view.ExpertForm',
        'EC.Experts.view.Experts.FilesList'
    ],

    title: 'Профиль пользователя ' + xlib.Acl.Storage.getIdentity().name +
        ' (' + xlib.Acl.Storage.getIdentity().login + ') ',

    layout: 'fit',

//    autoScroll: true,

    style: {
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    
    border: false,
    
    modal: true,

    getFilesURL: null,

    width: 400,

    height: 350,

    updateURL: '/json/pa/profile/update-profile',

    editExpertURL: '/json/pa/profile/edit-expert',

    addExpertDocURL: '/json/pa/profile/upload-expert-doc',

    deleteExpertDocURL: '/json/pa/profile/delete-expert-doc',

    getExpertDocsURL: '/json/pa/profile/get-expert-docs',

    addExpertJobTypesURL: 'json/pa/profile/add-expert-job-type',

    deleteExpertJobTypesURL: 'json/pa/profile/delete-expert-job-type',

    getExpertJobTypesURL: 'json/pa/profile/get-expert-job-types',

    initComponent: function() {

        this.items = [
            {
                xtype: 'tabpanel',
                itemId: 'editProfile',
                items: [
                    {
                        xtype: 'form',
                        title: 'Информация',
                        itemId: 'editForm',
                        autoScroll: true,
                        bodyPadding: 10,
                        fieldDefaults: {
                            margin: '10 0',
                            labelWidth: 150,
                            anchor: '100%'
                        },

                        trackResetOnLoad: true,

                        bbar: ['->',{
                            text: 'Сохранить',
                            scope: this,
                            handler: this.updateProfile
                        },{
                            text: 'Сбросить',
                            handler: function() {
                                this.up('form').getForm().reset();
                            }
                        }],
                        items: [
                            {
                                xtype: 'filefield',
                                name: 'photo',
                                fieldLabel: 'Фотография',
                                buttonText: 'Выбрать фото'
                            }, {
                                xtype: 'textfield',
                                name: 'name',
                                fieldLabel: 'ФИО'
                            }, {
                                xtype: 'textfield',
                                name: 'login',
                                fieldLabel: 'Email',
                                vtype: 'email'
                            }, {
                                xtype: 'ContrCityField'
                            }, {
                                xtype: 'TZCombo'
                            }, {
                                xtype: 'textfield',
                                inputType: 'password',
//                                allowBlank: false,
                                fieldLabel: 'Старый пароль <sup style="color: red;"></sup>',
                                labelWidth: 150,
                                minLength: 3,
                                maxLength: 15,
                                name: 'old_password'
                            }, {
                                xtype: 'textfield',
                                inputType: 'password',
//                                allowBlank: false,
                                fieldLabel: 'Придумайте пароль <sup style="color: red;"></sup>',
                                minLength: 3,
                                maxLength: 15,
                                itemId: 'passwordFieldRegister',
                                name: 'new_password1',
                                listeners: {
                                    validitychange: function(field){
                                        this.up('form').down('#passwordFieldRegisterConfirm').validate();
                                    },
                                    blur: function(field){
                                        this.up('form').down('#passwordFieldRegisterConfirm').validate();
                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                inputType: 'password',
//                                allowBlank: false,
                                fieldLabel: 'Повторите пароль <sup style="color: red;"></sup>',
                                minLength: 3,
                                maxLength: 15,
                                vtype: 'password',
                                name: 'new_password2',
                                itemId: 'passwordFieldRegisterConfirm',
                                initialPassField: 'passwordFieldRegister'
                            }
                        ]
                    },
                    {
                        xtype: 'profile-expert-edit-form',
                        fromCurrent: true,
                        hidden: this.hideExpert,
                        addExpertJobTypesURL: this.addExpertJobTypesURL,
                        deleteExpertJobTypesURL: this.deleteExpertJobTypesURL,
                        getExpertJobTypesURL: this.getExpertJobTypesURL,
                        data: this.data.expert_info
                    },
                    {
                        xtype: 'experts-files-list',
                        data: this.data,
                        addExpertDocURL: this.addExpertDocURL,
                        deleteExpertDocURL: this.deleteExpertDocURL,
                        getExpertDocsURL: this.getExpertDocsURL,
                        hidden: this.hideExpert
                    }
                ]
            }

        ];

        this.callParent(arguments);

        this.expertEditForm = this.down('profile-expert-edit-form');
        this.expertEditForm.down('[action=save]').on('click',this.editExpert, this);
        this.down('#editForm').getForm().setValues(this.data);

    },

    passValid: function() {
        var old_pass = this.down('[name=old_password]');
        var pass1 = this.down('[name=new_password1]');
        var pass2 = this.down('[name=new_password2]');

        if( (pass1.isDirty() || pass2.isDirty()) && !old_pass.isDirty()) {
            Ext.Msg.alert('Ответ системы', 'Для смены пароля введите старый пароль.');
            return false;
        }

        if( (!pass1.isDirty() || !pass2.isDirty()) && old_pass.isDirty()) {
            Ext.Msg.alert('Ответ системы', 'Для смены пароля введите новый пароль.');
            return false;
        }

        return true;

    },

    updateProfile: function(){
        var form = this.down('#editForm');

        if (!form.isValid() || !this.passValid()) {
            return;
        }

        this.down('#editForm').submit({
            url: this.updateURL,
            success: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Обновление аккаунта прошло успешно.</span>');
            },
            failure: function(curForm, action) {
                if(action.result.passReset === false) {
                    Ext.Msg.alert('Ответ системы',
                        '<span style="color:red;">Неверно введен старый пароль!</span>');
                    return;
                }
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка обновления аккаунта!</span>');
            },
            scope: this
        });

    },

    editExpert: function() {

        this.expertEditForm.getForm().submit({
            url: this.editExpertURL,
            success: function(form, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Обновление профиля специалиста прошло успешно.</span>');
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
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                }
            },
            scope: this
        });

    }

});