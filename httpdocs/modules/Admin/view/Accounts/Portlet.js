Ext.define('EC.Admin.view.Accounts.Portlet', {

    extend: 'Ext.grid.Panel',
    
    alias: ['widget.AdminAccountsPortlet'],
    
    store: 'EC.Admin.store.Accounts',
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
        
        this.columns = [{
            header: 'Логин',
            dataIndex: 'login',
            width: 80
        }, {
            header: 'Имя',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Email',
            dataIndex: 'email',
            width: 100
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
            store: this.store
        });
        
        this.callParent(arguments);
    }
});