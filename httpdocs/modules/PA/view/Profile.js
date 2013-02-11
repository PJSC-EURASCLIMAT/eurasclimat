Ext.define('EC.PA.view.Profile', {
    
    extend: 'Ext.window.Window',
    
    uses: ['xlib.CountryCombo'],
    
    title: 'Профиль пользователя',
    
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
                xtype: 'displayfield',
                name: 'login',
                fieldLabel: 'Логин'
            }, {
                xtype: 'displayfield',
                name: 'name',
                fieldLabel: 'ФИО'
            }, {
                xtype: 'displayfield',
                name: 'email',
                fieldLabel: 'Email'
            }, {
                xtype: 'displayfield',
                name: 'country',
                fieldLabel: 'Страна',
                renderer: xlib.CountryCombo.getDisplayValue
            }, {
                xtype: 'displayfield',
                name: 'city',
                fieldLabel: 'Город'
            }],
            buttons: [{
//                text: 'Сохранить',
//                formBind: true,
//                action: 'submit'
//            }, {
                text: 'ОК',
                scope: this,
                handler: this.close
            }]
        }];
        
        this.callParent(arguments);
    }
});