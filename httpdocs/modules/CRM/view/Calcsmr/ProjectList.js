Ext.define('EC.CRM.view.Calcsmr.ProjectList', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    maximizable: true,
    
    width: 1200,
    
    height: 600,
    
    permission: false,
    
    tbar: [{
        xtype: 'button',
        text: 'Добавить систему в проект',
        iconCls: 'add',
        action: 'add'
//    }, {
//        xtype: 'button',
//        text: 'Настройки проекта и ПНР',
//        iconCls: 'edit',
//        hidden: !acl.isUpdate('calcsmr'),
//        action: 'configure'
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }],
    
    items: [{
        xtype: 'grid',
        itemId: 'CalcsmrProjectList',
        store: 'EC.CRM.store.Calcsmr.Project',
        enableColumnHide: false,
        enableColumnMove: false,
        columnLines: true,
        features: [{
            ftype: 'summary'
        }],
        columns: {
            defaults: {
                minWidth: 30,
                width: 120,
                align: 'right',
                sortable: false
            },
            items: [{
                xtype: 'actioncolumn',
                align: 'center',
                minWidth: 60,
                width: 60,
                items: [{
                    icon: '/images/icons/inbox.png',
                    tooltip: 'Открыть проект',
                    iconCls: 'x-btn',
                    handler: function(view, rowIndex, colIndex) {
                        var grid = view.up('#CalcsmrProjectList');
                        grid.fireEvent('opensystem', grid, grid.getStore().getAt(rowIndex));
                    },
                    isDisabled: function(view, rowIndex, colIndex, item, record) {
                        return !record.get('id');
                    }
                }, {
                    icon: '/images/icons/edit.png',
                    tooltip: 'Настройки системы',
                    iconCls: 'x-btn',
                    handler: function(view, rowIndex, colIndex) {
                        var grid = view.up('#CalcsmrProjectList');
                        grid.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                    },
                    isDisabled: function(view, rowIndex, colIndex, item, record) {
                        return !record.get('id') || !this.permission;
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
                    },
                    isDisabled: function(view, rowIndex, colIndex, item, record) {
                        return !record.get('id') || !this.permission;
                    }
                }]
            }, {
                header: 'Наименование системы',
                dataIndex: 'system_name',
                align: 'left',
                width: 150,
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return 'ВСЕГО';
                }
            }, {
                header: 'оборуд.',
                tooltip: 'Стоимость основного оборудования и материалов',
                dataIndex: 'system_sum',
                summaryType: 'sum',
                renderer: function(value) {
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'расх. мат.',
                tooltip: 'Стоимость сопутствующего расходного материала',
                dataIndex: 'related',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    var k = record.get('k_related');
                    if (!!k) {
                        metaData.tdCls = 'x-grid-dirty-cell';
                        metaData.tdAttr = 'data-qtip="' +
                                'Коэф. К = <b>' + k + '</b><br/>' +
                                'Формула = <b>оборуд. * К</b>"';
                    }
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'обор.+расх.мат.',
                tooltip: 'Общая стоимость затрат на материалы и оборудование',
                dataIndex: 'related_system_sum_total',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    if (!!value && !!record.get('id')) {
                        metaData.tdCls = 'x-grid-dirty-cell';
                        metaData.tdAttr = 'data-qtip="' +
                            'Формула = <b>обор. + расх.мат.</b>"';
                    }
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'Оплата труда',
                tooltip: 'опл. труда',
                dataIndex: 'compensation',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    var k = record.get('k_compensation');
                    if (!!k && !!record.get('id')) {
                        metaData.tdCls = 'x-grid-dirty-cell';
                        metaData.tdAttr = 'data-qtip="' +
                                'Коэф. К = <b>' + k + '</b><br/>' +
                                'Формула = <b>(обор. + расх.мат.) * К</b>"';
                    } else {
                        if (!!k && !record.get('id')) {
                            metaData.tdCls = 'x-grid-dirty-cell';
                            metaData.tdAttr = 'data-qtip="' +
                                'Коэф. К = <b>' + k + '</b><br/>' +
                                'Формула = <b>(сумма опл. труда всех сист.) * К</b>"';
                        }
                    } 
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'экспл. мех.',
                tooltip: 'Эксплуатация машин и механизмов',
                dataIndex: 'amortisation',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    var k = record.get('k_amortisation');
                    if (!!k) {
                        metaData.tdCls = 'x-grid-dirty-cell';
                        metaData.tdAttr = 'data-qtip="' +
                                'Коэф. К = <b>' + k + '</b><br/>' +
                                'Формула = <b>опл. труда * К</b>"';
                    }
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'накл. расх.',
                tooltip: 'Накладные расходы',
                dataIndex: 'overheads',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    var k = record.get('k_overheads');
                    if (!!k) {
                        metaData.tdCls = 'x-grid-dirty-cell';
                        metaData.tdAttr = 'data-qtip="' +
                                'Коэф. К = <b>' + k + '</b><br/>' +
                                'Формула = <b>опл. труда * К</b>"';
                    }
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'сметн. приб.',
                tooltip: 'Сметная прибыль',
                dataIndex: 'estimated',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    var k = record.get('k_estimated');
                    if (!!k) {
                        metaData.tdCls = 'x-grid-dirty-cell';
                        metaData.tdAttr = 'data-qtip="' +
                                'Коэф. К = <b>' + k + '</b><br/>' +
                                'Формула = <b>опл. труда * К</b>"';
                    }
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'Всего',
                dataIndex: 'total',
                summaryType: 'sum',
                renderer: function(value) {
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'НДС',
                dataIndex: 'vat',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    var k = record.get('k_vat');
                    if (!!k) {
                        metaData.tdCls = 'x-grid-dirty-cell';
                        metaData.tdAttr = 'data-qtip="' +
                                'Коэф. К = <b>' + k + '</b><br/>' +
                                'Формула = <b>всего * К</b>"';
                    }
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }, {
                header: 'Всего с НДС',
                dataIndex: 'vat_total',
                summaryType: 'sum',
                renderer: function(value, metaData, record) {
                    metaData.tdCls = 'x-grid-dirty-cell';
                    metaData.tdAttr = 'data-qtip="' +
                        'Формула = <b>всего + НДС</b>"';
                    return !value ? '' : xlib.formatCurrency(value);
                }
            }]
        }
    }]
});