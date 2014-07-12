Ext.define('EC.CRM.view.Calcsmr.SystemList', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    maximizable: true,
    
    width: 900,
    
    height: 600,
    
    tbar: [{
        xtype: 'button',
        text: 'Добавить оборудование в систему',
        iconCls: 'add',
        action: 'add'
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }],
    
    items: [{
        xtype: 'grid',
        itemId: 'CalcsmrSystemList',
        store: 'EC.CRM.store.Calcsmr.System',
        enableColumnHide: false,
        enableColumnMove: false,
        columnLines: true,
        features: [{
            ftype: 'summary'
        }],
        columns: {
            items: [{
                xtype: 'actioncolumn',
                align: 'center',
                width: 40,
                items: [{
                    icon: '/images/icons/edit.png',
                    tooltip: 'Редактировать',
                    iconCls: 'x-btn',
                    handler: function(view, rowIndex, colIndex) {
                        var grid = view.up('#CalcsmrSystemList');
                        grid.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                    }
                }, {
                    icon: '/images/icons/fam/delete.gif',
                    tooltip: 'Удалить',
                    iconCls: 'x-btn',
                    handler: function(view, rowIndex, colIndex) {
                        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
                            if ('yes' === b) {
                                var store = view.up('grid').getStore();
                                store.removeAt(rowIndex);
                                store.reload();
                            }
                        }, this);
                    }
                }]
            }, {
                header: 'Наименование',
                dataIndex: 'name',
                align: 'left',
                flex: 1,
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return 'ВСЕГО';
                }
            }, {
                header: 'Ед. изм.',
                dataIndex: 'measure',
                width: 100
            }, {
                header: 'Кол-во',
                dataIndex: 'qty',
                align: 'right',
                summaryType: 'sum',
                width: 100
            }, {
                header: 'Цена',
                dataIndex: 'price',
                align: 'right',
                summaryType: 'sum',
                width: 150,
                renderer: xlib.formatCurrency
            }, {
                header: 'Сумма',
                dataIndex: 'sum',
                align: 'right',
                summaryType: 'sum',
                width: 150,
                renderer: xlib.formatCurrency
            }]
        }
    }]
});