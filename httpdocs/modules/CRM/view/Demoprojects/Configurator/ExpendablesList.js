Ext.define('EC.CRM.view.Demoprojects.Configurator.ExpendablesList', {

    extend: 'Ext.grid.Panel',

    title: 'Инструменты и материалы',
    
    alias: 'widget.DemoprojectsConfiguratorExpendablesList',
    
    layout: 'fit',
    
    region: 'center',
    
    border: false,
    
    store: 'EC.CRM.store.Demoprojects.Configurator.Expendables',
    
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
            header: 'Ед. изм.',
            dataIndex: 'measure',
            width: 120
        }, {
            header: 'Количество',
            dataIndex: 'number',
            width: 120,
            renderer: function(v) {
                return Ext.util.Format.currency(v, ' ', 3);
            }
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 120,
            renderer: xlib.formatCurrency
        }, {
            header: 'Сумма',
            dataIndex: 'summ',
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