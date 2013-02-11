Ext.define('App.view.Register', {
    
    extend: 'Ext.window.Window',
    
    uses: ['xlib.CountryCombo'],
    
    title: 'Регистрация пользователя системы',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelWidth: 100,
                allowBlank: false,
                anchor: '-5'
            },
            items: [{
                xtype: 'textfield',
                name: 'login',
                minLength: 3,
                maxLength: 15,
                fieldLabel: 'Логин'
            }, {
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: 'Пароль',
                minLength: 3,
                maxLength: 15,
                name: 'password'
            }, {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: 'ФИО'
            }, {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Email'
            }, {
                xtype: 'CountryCombo',
                name: 'country'
            }, {
                xtype: 'textfield',
                name: 'city',
                fieldLabel: 'Город'
            }],
            buttons: [{
                text: 'Сохранить',
                formBind: true,
                action: 'submit'
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