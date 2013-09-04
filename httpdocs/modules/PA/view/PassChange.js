Ext.define('EC.PA.view.PassChange', {
    
    extend: 'Ext.window.Window',

    title: 'Смена пароля пользователя' + xlib.Acl.Storage.getIdentity().name +
        ' (' + xlib.Acl.Storage.getIdentity().login + ') ',

    alias: 'widget.passchangeview',
    
    layout: 'fit',

    autoScroll: true,
    
    border: false,
    
    autoShow: true,

    modal: true,
    
    width: 320,

    items:[{
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    allowBlank: false,
                    fieldLabel: 'Старый пароль <sup style="color: red;">*</sup>',
                    labelWidth: 150,
                    minLength: 3,
                    maxLength: 15,
                    name: 'old_password'
                },
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    allowBlank: false,
                    fieldLabel: 'Придумайте пароль <sup style="color: red;">*</sup>',
                    labelWidth: 150,
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
                        },
                        change: function(field){
                            var saveBtn = this.up('window').down('#saveBtn')
                            if(this.up('form').isValid()){
                                saveBtn.enable();
                            } else {
                                saveBtn.disable();
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    allowBlank: false,
                    fieldLabel: 'Повторите пароль <sup style="color: red;">*</sup>',
                    labelWidth: 150,
                    minLength: 3,
                    maxLength: 15,
                    vtype: 'password',
                    name: 'new_password2',
                    itemId: 'passwordFieldRegisterConfirm',
                    initialPassField: 'passwordFieldRegister',
                    listeners: {
                        change: function(field){
                            var saveBtn = this.up('window').down('#saveBtn')
                            if(this.up('form').isValid()){
                                saveBtn.enable();
                            } else {
                                saveBtn.disable();
                            }
                        }
                    }
                }, {
                    xtype: 'label'
                }]

        }
    ],

    buttons : [{
        text: 'Сохранить',
        itemId: 'saveBtn',
        formBind: true,
        disabled: true
    }, '->',{
        text: 'Закрыть',
        itemId: 'closeBtn',
        handler: function(){
            this.up('window').close();
        }
    }]

//
});