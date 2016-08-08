Ext.define('EC.Catalog.view.SpecialServices.RelatedExpendables', {
    
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.CatalogSpecialServicesRelatedExpendables',

    store: 'EC.Catalog.store.SpecialServices.RelatedExpendables',
	
    autoScroll: true,

    border: false,
    
    permissions: false,
    
    layout: 'fit',
    
    monitorResize: true,
    
    initComponent: function() {
        
        this.tbar = [{
            text: 'Добавить',
            tooltip: 'Добавить',
            iconCls: 'add',
            action: 'add',
            hidden: !this.permissions,
            scope: this
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }];
        
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
            width: 100
        }, {
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Ед. изм.',
            dataIndex: 'measure',
            width: 100
        }, {
            header: 'Количество',
            dataIndex: 'number',
            width: 100
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 100,
            renderer: xlib.formatCurrency
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            hideable: false,
            menuDisabled: true,
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.callParent(arguments);
    }
});