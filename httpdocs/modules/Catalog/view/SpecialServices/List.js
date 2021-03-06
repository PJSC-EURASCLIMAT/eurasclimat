Ext.define('EC.Catalog.view.SpecialServices.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.SpecialServicesList',
    
    layout: 'fit',
    
    forceFit: true,
    
    store: 'EC.Catalog.store.SpecialServices.List',
    
    permissions: acl.isUpdate('catalog', 'specialservices'),
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/fam/cog.gif',
                tooltip: 'Конфигурировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('configure', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
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
            header: 'Артикул работ',
            dataIndex: 'code',
            width: 100
        }, {
            header: 'Наименование работ',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Ед. изм. работ',
            dataIndex: 'measure',
            width: 100
        }, {
            header: 'Сроки выполнения работ',
            dataIndex: 'term',
            width: 150
        }, {
            header: 'Цена работ',
            dataIndex: 'price',
            width: 100,
            renderer: xlib.formatCurrency
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить услугу',
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