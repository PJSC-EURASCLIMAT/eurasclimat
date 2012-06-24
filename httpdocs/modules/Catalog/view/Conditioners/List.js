Ext.define('EC.Catalog.view.Conditioners.List', {

    extend: 'Ext.grid.Panel',
    
    requires: ['xlib.RowExpander'],
   
    alias: ['widget.ConditionersList'],
    
    store: 'EC.Catalog.store.Conditioners',
    
    layout: 'fit',
    
    forceFit: true,
    
    title: 'Результаты выборки',
    
    tools: [{
        type: 'expand',
        tooltip: 'Раскрыть/закрыть все строки',
        action: 'expandrows'
    }, {
        type: 'plus',
        tooltip: 'Добавить позицию',
        action: 'additem'
    }, {
        type: 'refresh',
        tooltip: 'Обновить список',
        action: 'refresh'
    }],
    
    constructor: function() {
        
        this.plugins = [{
            ptype: 'rowexpander',
            pluginId: 'rowexpander',
            rowBodyTpl: Ext.create('Ext.XTemplate', 
                '<div style="padding: 10px;"><table width="100%" border="0">',
                '<tr valign="top">',
                '<td rowspan="3" width="320"><img src="http://placehold.it/300x220"/></td>',
                '<td colspan="3" height="40"><h1><p>',
//                '{[this.r("ConditionersFilterName", values.name_id)]} ',
                '{[this.r("ConditionersFilterMark", values.mark_id)]} ',
                '{marking}</p></h1></td>',
                '</tr><tr valign="top"><td>',
                '<p>Группа оборудования: <b>',
                '{[this.r("ConditionersFilterGroup", values.group_id)]}',
                '</b></p>',
                '<p>Назначение продукции: <b>',
                '{[this.r("ConditionersFilterPurpose", values.purpose)]}',
                '</b></p>',
                '<p>Тип продукции: <b>',
                '{[this.r("ConditionersFilterProductType", values.product_type_id)]}',
                '</b></p>',
                '<p>Тип исполнения: <b>',
                '{[this.r("ConditionersFilterImplementationType", values.implementation_type_id)]}',
                '</b></p>',
//                '<p>Состояние продукции: <b>',
//                '{[this.r("ConditionersFilterCondition", values.condition)]}',
//                '</b></p>',
                '<p>Страна изготовления: <b>',
                '{[this.r("ConditionersFilterCountry", values.country)]}',
                '</b></p>',
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
                '</tr></table></div>', 
                {r: Ext.bind(this.comboRenderer, this)}
            )
        }]
        
        this.callParent(arguments);
    
    },
    
    initComponent: function() {

        this.columns = [{
            header: 'Группа оборудования',
            //flex: 1,
            dataIndex: 'group_id',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterGroup', value);
            }
        }, {
            header: 'Марка',
            dataIndex: 'mark_id',
            renderer: function(value) {
                var store = Ext.getStore('ConditionersFilterMark');
                var idx = store.find('id', value);
                if (idx == -1) return value;
                var rec = store.getAt(idx);
                return rec.get('name');
            }
        }, {
            header: 'Маркировка',
            dataIndex: 'marking'
        }, {
            header: 'Тип продукции',
            dataIndex: 'product_type_id',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterProductType', value);
            }
        }, {
            header: 'Тип исполнения',
            dataIndex: 'implementation_type_id',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterImplementationType', value);
            }
        }, {
            header: 'Страна',
            hidden: true,
            dataIndex: 'country',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterCountry', value);
            }
//        }, {
//            header: 'Состояние продукции',
//            hidden: true,
//            dataIndex: 'condition',
//            renderer: function(value) {
//                return this.comboRenderer('ConditionersFilterCondition', value);
//            }
//        }, {
//            header: 'Назначение продукции',
//            hidden: true,
//            dataIndex: 'purpose',
//            renderer: function(value) {
//                return this.comboRenderer('ConditionersFilterPurpose', value);
//            }
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
            dataIndex: 'warranty'
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
            width: 40,
            items: [{
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            }, {
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            }]
        }];

        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
        
        Ext.defer(function() {
            this.getStore().load() 
        }, 1000, this);
    },
    
    comboRenderer: function(storeName, value) {
        var store = Ext.getStore(storeName);
        var idx = store.find('id', value);
        if (idx == -1) return value;
        var rec = store.getAt(idx);
        return rec.get('name');
    }
});