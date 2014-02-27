Ext.define('EC.CRM.view.Calcpd.EditorLayout', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    maximizable: true,
    
    width: 1000,
    
    height: 600,
    
    tbar: [{
        xtype: 'form',
        layout: 'hbox',
        bodyStyle: 'background: transparent;',
        border: false,
        defaults: {
            inputAttrTpl: 'style="height:19px;"',
            allowBlank: false,
            margins: '0 10 0 0'
        },
        items: [{
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name', 
            fieldLabel: 'Класс объекта',
            name: 'obj_class_id',
            labelWidth: 80,
            width: 250,
            editable: false,
            value: '',
            store: {
                fields: ['id', 'name'],
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    api: {
                        read:   '/json/crm/calcpd-config/read-obj-class'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success'
                    },
                    pageParam: undefined,
                    startParam: undefined,
                    sortParam: undefined,
                    limitParam: undefined
                }
            }
        }, {
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name', 
            fieldLabel: 'Вид работы',
            name: 'serv_id',
            labelWidth: 70,
            width: 450,
            editable: false,
            value: '',
            store: {
                fields: ['id', 'name'],
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    api: {
                        read:   '/json/crm/calcpd-config/read-serv'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success'
                    },
                    pageParam: undefined,
                    startParam: undefined,
                    sortParam: undefined,
                    limitParam: undefined
                }
            }
        }, {
            xtype: 'numberfield',
            inputAttrTpl: 'style="height:20px;"',
            fieldLabel: 'Площадь',
            labelWidth: 60,
            minValue: 0,
            name: 'square',
            width: 130,
            value: 0
        }, {
            xtype: 'button',
            text: 'Добавить в проект',
            width: 120,
            formBind: true,
            action: 'addline'
        }]
    }],
    
    items: [{
        xtype: 'grid',
        store: 'EC.CRM.store.Calcpd.Editor',
        layout: 'fit',
        enableColumnHide: false,
        enableColumnMove: false,
        features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            enableGroupingMenu: false,
            hideGroupedHeader: true
        }, {
            ftype: 'summary',
            dock: 'bottom'
        }],
        plugins: [{
            ptype: 'cellediting',
            pluginId: 'CalcpdEditor',
            clicksToEdit: 1
        }],
        columns: [{
            header: 'Класс объекта',
            dataIndex: 'obj_class_name'
        }, {
            header: 'Наименование работы',
            dataIndex: 'serv_name',
            flex: 1,
            hideable: false,
            sortable: false,
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return 'Итого (' + value + ')';
            }
        }, {
            xtype: 'numbercolumn',
            header: 'Цена за м.кв.',
            hideable: false,
            sortable: false,
            dataIndex: 'price',
            renderer: xlib.formatCurrency
        }, {
            xtype: 'numbercolumn',
            header: 'Площадь (м.кв.)',
            hideable: false,
            sortable: false,
            dataIndex: 'square',
            summaryType: 'sum',
            field: {
                xtype: 'numberfield',
                minValue: 0 
            }
        }, {
            xtype: 'numbercolumn',
            header: 'Сумма',
            hideable: false,
            sortable: false,
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                return xlib.formatCurrency(record.get('price') * record.get('square'));
            },
            summaryType: function(records) {
                var i = 0, length = records.length, total = 0, record;
                for (; i < length; ++i) {
                    record = records[i];
                    total += (record.get('price') * record.get('square'));
                }
                return total;
            },
            summaryRenderer: xlib.formatCurrency
        }, {
            xtype:'actioncolumn',
            hideable: false,
            sortable: false,
            width: 45,
            items: [{
                icon: '/images/icons/edit.png',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(view, rowIndex, colIndex) {
                    var grid = view.up('grid'),
                        editor = grid.getPlugin('CalcpdEditor'),
                        record = grid.getStore().getAt(rowIndex),
                        column = grid.down('numbercolumn[dataIndex=square]');
                    editor.startEdit(record, column);
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
        }]
    }]
});