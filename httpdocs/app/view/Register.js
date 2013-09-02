Ext.define('App.view.Register', {
    
    extend: 'Ext.window.Window',
    
    uses: [
        'xlib.CountryCombo',
        'xlib.LanguageCombo'
    ],
    
    title: 'Регистрация пользователя системы',
    
    border: false,
    
    autoShow: true,
    
    autoScroll: true,
    
    modal: true,
    
    width: 600,

    constrain: true,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                msgTarget: 'side'
            },
            items: [{
                xtype: 'fieldset',
                title: 'Общие данные',
                defaultType: 'textfield',
                layout: {
                    type: 'table',
                    columns: 2,
                    tdAttrs: {
                        width: '50%',
                        style: 'padding: 10px 0; font-size: x-small; text-align: justify;',
                        valign: 'top'
                    }
                },
                items: [, {
                    name: 'login',
                    allowBlank: false,
                    vtype: 'email',
                    fieldLabel: 'Email <sup style="color: red;">*</sup>'
                }, {
                    xtype: 'label',
                    html: 'Этот адрес можно использовать для обращения в службу поддержки. ' +
                        'Также на него будет выслан <a href="#">запрос о подтверждении</a>.'
                }, {
                    name: 'name',
                    allowBlank: false,
                    fieldLabel: 'ФИО <sup style="color: red;">*</sup>'
                }, {
                    xtype: 'label',
                    html: 'Просим вас указать настоящие имя и фамилию. ' +
                          'Это поможет восстановить доступ к сервисам ' +
                          'OAO "Евразклимат", если вы забудете свой пароль.'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Пароль доступа',
                defaultType: 'textfield',
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [{
                    inputType: 'password',
                    allowBlank: false,
                    fieldLabel: 'Придумайте пароль <sup style="color: red;">*</sup>',
                    labelWidth: 150,
                    minLength: 3,
                    maxLength: 15,
                    itemId: 'passwordFieldRegister',
                    name: 'password',
                    listeners: {
                        validitychange: function(field){
                            this.up('form').down('#passwordFieldRegisterConfirm').validate();
                        },
                        blur: function(field){
                            this.up('form').down('#passwordFieldRegisterConfirm').validate();
                        }
                    }
                }, {
                    xtype: 'label',
                    style: 'padding-left: 10px; font-size: x-small;',
                    html: '<a href="#">Как выбрать пароль</a>'
                }, {
                    inputType: 'password',
                    allowBlank: false,
                    fieldLabel: 'Повторите пароль <sup style="color: red;">*</sup>',
                    labelWidth: 150,
                    minLength: 3,
                    maxLength: 15,
                    vtype: 'password',
                    itemId: 'passwordFieldRegisterConfirm',
                    initialPassField: 'passwordFieldRegister'
                }, {
                    xtype: 'label'
                }]
            }, {
                xtype: 'container',
                layout: {
                    type: 'table',
                    columns: 2,
                    tdAttrs: {
                        valign: 'top',
                        style: 'padding: 10px; font-size: x-small; text-align: justify;'
                    }
                },
                items: [{
                    xtype: 'checkbox',
                    isValid: function() {
                        return this.getValue();
                    }
                }, {
                    xtype: 'label',    
                    html: 'Нажимая кнопку "Зарегистрироваться", я принимаю условия ' +
                          '<a href="#">Пользовательского соглашения</a> и даю своё ' +
                          'согласие ОАО "Евразклимат" на обработку моих персональных ' +
                          'данных, в соответствии с Федеральным законом от 27.07.2006 года ' +
                          '№152-Ф3 "О персональных данных", на условиях и для целей, ' +
                          'определённых <a href="#">Политикой конфиденциальности</a>.'
                }]
            }],
            buttons: [{
                text: 'Отменить',
                scope: this,
                handler: this.close
            }, {
                text: 'Зарегистрироваться',
                formBind: true,
                action: 'submit'
            }]
        }];

        this.keys = {
            fn: function(key, e) {
                this.fireEvent('enterPressed');
            },
            key: Ext.EventObject.ENTER,
            scope: this
        }
        
        this.callParent(arguments);
    }
});