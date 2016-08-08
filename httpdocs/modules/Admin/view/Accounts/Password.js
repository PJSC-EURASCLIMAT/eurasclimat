Ext.define('EC.Admin.view.Accounts.Password', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.AdminAccountsPassword',

    title: 'Установка пароля учётной записи',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    defaultFocus: 'AdminAccountsPasswordField',

    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            width: 400,
            hideLabel: true,
            items: [{
                xtype: 'textfield',
                name: 'password',
                padding: 3,
                minLength: 3,
                allowBlank: false,
                anchor: '100%',
                itemId: 'AdminAccountsPasswordField'
            }],
            buttons: ['->',{
                text: 'Сохранить',
                formBind: true,
                disabled: true,
                action: 'save'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});