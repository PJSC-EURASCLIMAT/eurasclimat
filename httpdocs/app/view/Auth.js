Ext.define('App.view.Auth', {
    
    extend: 'Ext.window.Window',
    
    title: 'Вход в систему',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 200,

    listeners: {
        afterrender: function(field) {
            this.down('[name=login]').focus(false,300);
        }
    },
    
    initComponent: function() {
        
        this.items = [{
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
                fieldLabel: 'Логин',
                inputAttrTpl: [
                    'autocomplete="on"'
                ]
            }, {
                xtype: 'textfield',
                labelWidth: 50,
                allowBlank: false,
                inputType: 'password',
                fieldLabel: 'Пароль',
                name: 'password'
            }],
            buttons: [{
                text: 'Войти',
                formBind: true,
                action: 'doLogin'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
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