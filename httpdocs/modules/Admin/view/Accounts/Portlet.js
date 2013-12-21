Ext.define('EC.Admin.view.Accounts.Portlet', {

    extend: 'Ext.grid.Panel',
    
    alias: ['widget.AdminAccountsPortlet'],
    
    uses: ['xlib.CountryCombo'],
    
    store: 'EC.Admin.store.Accounts',
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
        
        this.columns = [{
            header: 'Логин',
            dataIndex: 'login',
            flex: .5,
            editor: {
                xtype: 'textfield',
                minLength: 3,
                allowBlank: false
            }
        }, {
            header: 'Имя',
            dataIndex: 'name',
            flex: .5,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
            store: this.store
        });
        
        this.callParent(arguments);
    }
});