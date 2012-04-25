Ext.define('EC.Catalog.view.ConditionersList', {

    extend: 'Ext.grid.Panel',
    
    requires: ['xlib.RowExpander'],
   
    alias: ['widget.ConditionersList'],
    
    store: 'EC.Catalog.store.Conditioners',
    
    layout: 'fit',
    
    border: false,
    
    forceFit: true,
    
    //disableSelection: true,
    
    dockedItems: [{
        title: 'Фильтр продукции',
        xtype: 'panel',
        bodyCls: 'x-tab-bar',
        layout: 'column',
        collapsible: true,
        collapseFirst: false,
        border: false,
        dock: 'top',
        defaults: {
            padding: 10,
            bodyCls: 'x-tab-bar',
            border: false,
            width: 170
        },
        items: [{
            items: [{ 
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Группа оборудования',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Наименование',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Марка',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }]
        }, {
            items: [{ 
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Тип продукции',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Тип исполнения',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Страна',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }]
        }, {
            items: [{
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Назначение',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Состояние',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Наличие',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }]
        }, {
            items: [{
                xtype: 'displayfield',
                value: 'Производительность:',
                height: 22
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Охлаждение',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Обогрев',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }]
        }, {
            items: [{
                xtype: 'displayfield',
                value: 'Потребление:',
                height: 22
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Охлаждение',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Обогрев',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }]
        }, {
            items: [{
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Площадь',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Объём',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Гарантия',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [] })
            }]
        }],
        tools: [{
            type: 'plus',
            iconCls: 'add',
            tooltip: 'Добавить',
            handler: function(grid, rowIndex, colIndex) {
                alert("Добавление");
            }
        }],
        listeners: {
            collapse: function(panel) {
                panel.ownerCt.ownerCt.doLayout();
            },
            expand: function(panel) {
                panel.ownerCt.ownerCt.doLayout();
            } 
        }
    }],
    
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<div style="padding: 10px;"><table width="100%" border="0">',
            '<tr valign="top">',
            '<td rowspan="3" width="320"><img src="http://placehold.it/300x220"/></td>',
            '<td colspan="3" height="40"><h1><p>{name} {mark} {marking}</p></h1></td>',
            '</tr><tr valign="top"><td>',
            '<p>Тип продукции: <b>{product_type}</b></p>',
            '<p>Тип исполнения: <b>{implementation_type}</b></p>',
            '<p>Назначение продукции: <b>{purpose}</b></p>',
            '<p>Состояние продукции: <b>{condition}</b></p>',
            '<p>Страна изготовления: <b>{country}</b></p>',
            '<p>Единица измерения: <b>{measure}</b></p>',
            '</td><td>',
            '<p><b>Производительность</b></p>',
            '<p>Охлаждение: <b>{output_cooling} кВт</b></p>',
            '<p>Обогрев: <b>{output_heating} кВт</b></p>',
            '<br/>',
            '<p><b>Потребление</b></p>',
            '<p>Охлаждение: <b>{input_cooling} кВт</b></p>',
            '<p>Обогрев: <b>{input_heating} кВт</b></p>',
            '</td><td>',
            '<p>Площадь: <b>{square} м²</b></p>',
            '<p>Объём: <b>{volume} м³</b></p>',
            '<p>Гарантия: <b>{years} лет</b></p>',
            '<br/>',
            '<p>Склад: <b>{storage}</b></p>',
            '<p>Резерв: <b>{reserve}</b></p>',
            '<p>Заказ: <b>{order}</b></p>',
            '</td></tr>',
            '<tr valign="top">',
            '<td colspan="3" height="40"><p>Цена: <b>{price} руб.</b></p></td>',
            '</tr></table></div>'
        ]
    }],
    
    initComponent: function() {

        this.columns = [{
            header: 'Группа оборудования', 
            dataIndex: 'group'
        }, {
            header: 'Наименование',
            dataIndex: 'name'
        }, {
            header: 'Марка',
            dataIndex: 'mark'
        }, {
            header: 'Маркировка',
            dataIndex: 'marking'
        }, {
            header: 'Тип продукции',
            dataIndex: 'product_type'
        }, {
            header: 'Тип исполнения',
            dataIndex: 'implementation_type'
        }, {
            header: 'Страна',
            hidden: true,
            dataIndex: 'country'
        }, {
            header: 'Назначение продукции',
            hidden: true,
            dataIndex: 'purpose'
        }, {
            header: 'Состояние продукции',
            hidden: true,
            dataIndex: 'condition'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'input_cooling'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'input_heating'
        }, {
            header: 'Площадь м²',
            hidden: true,
            dataIndex: 'square'
        }, {
            header: 'Объём м³',
            hidden: true,
            dataIndex: 'volume'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'output_cooling'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'output_heating'
        }, {
            header: 'Гарантия',
            hidden: true,
            dataIndex: 'years'
        }, {
            header: 'Склад',
            hidden: true,
            dataIndex: 'storage'
        }, {
            header: 'Резерв',
            hidden: true,
            dataIndex: 'reserve'
        }, {
            header: 'Заказ',
            hidden: true,
            dataIndex: 'order'
        }, {
            header: 'Ед. изм.',
            hidden: true,
            dataIndex: 'measure'
        }, {
            header: 'Цена',
            dataIndex: 'price'
        }, {
            xtype:'actioncolumn',
            width: 20,
            items: [{
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Редактирование " + rec.get('marking'));
                }
            }, {
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Удаление " + rec.get('marking'));
                }
            }]
        }];

        this.callParent(arguments);
    }
    
});