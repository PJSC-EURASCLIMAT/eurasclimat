Ext.define('EC.CRM.view.Projects.Configurator.EquipmentList', {

    extend: 'Ext.grid.Panel',

    title: 'Оборудование',
    
    alias: 'widget.ConfiguratorEquipmentList',
    
    layout: 'fit',
    
    store: 'EC.CRM.store.Projects.Configurator.Equipment',
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
                
            });
        }
        
        this.columns = [{
            header: 'Артикул',
            dataIndex: 'code',
            width: 60
        }, {
            header: 'Маркировка',
            dataIndex: 'marking',
            flex: 1
        }, {
            header: 'Марка',
            dataIndex: 'mark',
            width: 60
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 60
        }, {
            header: 'Кол-во',
            dataIndex: 'number',
            width: 60
        }, {
            header: 'Сумма',
            width: 100,
            dataIndex: 'summ',
            summaryType: 'sum'
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
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