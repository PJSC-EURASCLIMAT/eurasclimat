Ext.define('EC.CRM.view.Demoprojects.Configurator.ServicesList', {

    extend: 'Ext.grid.Panel',

    title: 'Сопутствующие услуги',
    
    alias: 'widget.DemoprojectsConfiguratorServicesList',
    
    layout: 'fit',
    
    region: 'center',
    
    border: false,
    
    store: 'EC.CRM.store.Demoprojects.Configurator.Services',
    
    permissions: acl.isUpdate('crm', 'demoprojects'),
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'checkcolumn',
            bubbleEvents: ['checkchange'],
            header: 'вкл/выкл',
            width: 80,
            dataIndex: 'id'
        }, {
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Сроки',
            dataIndex: 'term',
            width: 120
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 120,
            renderer: xlib.formatCurrency
        }, {
            xtype:'actioncolumn',
            width: 30,
            items: [{
                icon: '/images/icons/edit.png',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                isDisabled: function(view, rowIndex, colIndex, item, record) {
                    return !record.get('id');
                },
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            }]
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            hidden: !this.permissions,
            action: 'additem'
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }]
        
        this.callParent(arguments);
    }
});