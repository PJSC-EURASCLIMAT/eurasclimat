Ext.define('App.view.Auth', {
    
    extend: 'Ext.window.Window',
    
    title: 'Вход в систему',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 200,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            defaults: {
                border: false,
                padding: 5
            },
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 50,
                allowBlank: false,
                anchor: '-5'
            },
            items: [{
                xtype: 'hidden',
                name: 'do',
                value: 1
            }, {
                xtype: 'textfield',
                name: 'login',
                fieldLabel: 'Логин',
                inputAttrTpl: [
                    'autocomplete="on"'
                ]
            }, {
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: 'Пароль',
                name: 'password',
                inputAttrTpl: [
                    'autocomplete="on"'
                ]
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