Ext.define('EC.CRM.view.Calcpd.MainListPortlet', {

    extend: 'Ext.grid.Panel',

    layout: 'fit',
    
    store: 'EC.CRM.store.Calcpd.Main',
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    sortableColumns: false,
    
    initComponent: function() {
        
        this.columns = [{
            header: 'Наименование',
            dataIndex: 'name',
            flex: .8
        }, {
            xtype: 'templatecolumn',
            header: 'Создал',
            tpl: '<a href="#/profile/{account_id}/show">{account_name}</a>',
            dataIndex: 'account_name',
            width: 100
        }, {
            xtype: 'datecolumn',
            header: 'Дата создания',
            dataIndex: 'date',
            format: 'd.m.Y H:i',
            width: 100
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 5,
            store: this.store
        });
        
        this.callParent(arguments);
    }
});