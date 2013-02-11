Ext.define('EC.Admin.view.Accounts.Portlet', {

    extend: 'Ext.grid.Panel',
    
    alias: ['widget.AdminAccountsPortlet'],
    
    uses: ['xlib.CountryCombo'],
    
    store: 'EC.Admin.store.Accounts',
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
        
        this.columns = [{
            header: 'Имя',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Страна',
            dataIndex: 'country',
            width: 100,
            renderer: xlib.CountryCombo.getDisplayValue
        }, {
            header: 'Город',
            dataIndex: 'city',
            width: 100
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
            store: this.store
        });
        
        this.callParent(arguments);
    }
});