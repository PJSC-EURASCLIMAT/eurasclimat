Ext.define('App.view.Auth', {
    
    extend: 'Ext.window.Window',

    alias: 'widget.loginwindow',
    
    title: 'Вход в систему',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 230,

    listeners: {
        afterrender: function(field) {
            this.down('[name=login]').focus(false, 300);
        }
    },
    
    items : [{
        xtype: 'form',
        bodyPadding: 5,
        items: [{
            xtype: 'hidden',
            name: 'do',
            value: 1
        }, {
            xtype: 'textfield',
            labelWidth: 50,
            allowBlank: false,
            name: 'login',
            fieldLabel: 'E-mail',
            inputAttrTpl: [
                'autocomplete="on"'
            ]
        }, {
            xtype: 'textfield',
            labelWidth: 50,
            allowBlank: false,
            inputType: 'password',
            fieldLabel: 'Пароль',
            name: 'password',
            listeners: {
                specialkey: function(f,e){
                    if (e.getKey() == e.ENTER) {
                        this.up('window').fireEvent('enterPressed');
                    }
                }
            }
        }],

        buttons: [{
            text: 'Зарегистрироваться',
            action: 'doRegister'
        }, '->', {
            text: 'Войти',
            formBind: true,
            action: 'doLogin'
        }]
    }]


});