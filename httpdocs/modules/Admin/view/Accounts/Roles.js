Ext.define('EC.Admin.view.Accounts.Roles', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.AdminAccountRoles',

    title: 'Роли учётной записи',
    
    layout: 'fit',
    
    border: false,
    
    modal: true,
    
    width: 400,
    
    height: 300,
    
    buttons: [{
        text: 'Сохранить',
        action: 'save'
    }, {
        text: 'Отменить',
        action: 'cancel'
    }],
    
    items: [{
        
        xtype: 'treepanel',
        
        store: Ext.create('EC.Admin.store.AccountRoles'),
        
        rootVisible: false,
        
        useArrows: true,
        
        displayField: 'name'
        
    }]
});