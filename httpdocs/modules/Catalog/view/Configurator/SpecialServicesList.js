Ext.define('EC.Catalog.view.Configurator.SpecialServicesList', {

    extend: 'Ext.grid.Panel',

    title: 'Специальные виды услуг',
    
    alias: 'widget.ConfiguratorSpecialServicesList',
    
    layout: 'fit',
    
    store: 'EC.Catalog.store.Configurator.SpecialServices',
    
    permissions: acl.isUpdate('catalog', 'projects'),
    
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    
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
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Ед. изм.',
            dataIndex: 'measure',
            width: 60
        }, {
            header: 'Сроки',
            dataIndex: 'term',
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
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.String.format('<b>Итого: {0} р.</b>', value); 
            }
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