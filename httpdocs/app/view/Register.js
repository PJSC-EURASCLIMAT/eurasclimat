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

    layout: 'fit',
    
//    width: 300,

    constrain: true,
    
    initComponent: function() {
        
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                fieldDefaults:{
                    width:250
                },
                items: [{
                    xtype: 'textfield',
                    labelWidth: 70,
                    allowBlank: false,
                    fieldLabel: 'Email <sup style="color: red;">*</sup>',
                    name: 'login',
                    vtype: 'email'
                }, {
                    xtype: 'textfield',
                    labelWidth: 70,
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Пароль <sup style="color: red;">*</sup>',
                    name: 'password'
                }, {
                    xtype: 'textfield',
                    labelWidth: 70,
                    fieldLabel: 'ФИО',
                    name: 'name'
                }]

            ,buttons: [{
                text: 'Отменить',
                scope: this,
                handler: this.close
            }, {
                text: 'Зарегистрироваться',
                formBind: true,
                action: 'submit'
            }
            ]
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