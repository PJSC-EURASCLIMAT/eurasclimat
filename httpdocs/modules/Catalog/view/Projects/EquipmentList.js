Ext.define('EC.Catalog.view.Projects.EquipmentList', {

    extend: 'Ext.grid.Panel',

    title: 'Оборудование',
    
    alias: 'widget.ProjectsEquipmentList',
    
    layout: 'fit',
    
    store: 'EC.Catalog.store.Projects.Equipment',
    
    permissions: acl.isUpdate('catalog', 'projects'),
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
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
            width: 60
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить оборудование в проект',
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