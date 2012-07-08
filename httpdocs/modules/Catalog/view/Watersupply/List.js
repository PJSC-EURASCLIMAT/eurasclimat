Ext.define('EC.Catalog.view.Watersupply.List', {

    extend: 'Ext.grid.Panel',
    
    requires: [
        'xlib.RowExpander',
        'xlib.grid.FiltersFeature'
    ],
   
    alias: ['widget.WatersupplyList'],
    
    store: 'EC.Catalog.store.Watersupply',
    
    layout: 'fit',
    
    //forceFit: true,
    
    title: 'Результаты выборки',
    
    tools: [{
        type: 'expand',
        tooltip: 'Раскрыть/закрыть все строки',
        action: 'expandrows'
    }, {
        type: 'plus',
        tooltip: 'Добавить позицию',
        action: 'additem',
        hidden: !acl.isUpdate('catalog', 'watersupply')
    }, {
        type: 'refresh',
        tooltip: 'Обновить список',
        action: 'refresh'
    }],
    
    features: [{ftype: 'filters', encode: true, showMenu: false}],
    
    constructor: function() {
        
        this.plugins = [{
            ptype: 'rowexpander',
            pluginId: 'rowexpander',
            rowBodyTpl: Ext.create('Ext.XTemplate', 
                '<div style="padding: 10px;"><table width="100%" border="0">',
                '<tr valign="top">',
                
                '<td rowspan="2" width="320"><img src="http://placehold.it/300x220"/>',
                
                '<p>Ссылка: <b>{url}</b></p><br/>',
                '<p>Цена: <b>{price}&nbsp;р.</b></p>',
                '<p>СМР: <b>{mount_price}&nbsp;р.</b></p>',
                
                '</td><td colspan="3" height="40"><h1><p>',
                '{[this.r("WatersupplyFilterMark", values.mark_id)]} ',
                '{marking}</p></h1>',
                '<p>Группа оборудования: <b>',
                '{[this.r("WatersupplyFilterGroup", values.group_id)]}',
                '</b></p>',
                
                '</td></tr><tr valign="top"><td>',
                '<p>Тип продукции: <b>',
                '{[this.r("WatersupplyFilterProductType", values.product_type_id)]}',
                '</b></p>',
                '<p>Тип исполнения: <b>',
                '{[this.r("WatersupplyFilterImplementationType", values.implementation_type_id)]}',
                '</b></p>',
                '<p>Способ управления системой: <b>',
                '{[this.r("WatersupplyFilterControlType", values.control_type_id)]}',
                '</b></p>',
                '<p>Тип присоединения: <b>',
                '{[this.r("WatersupplyFilterConnectionType", values.connection_type_id)]}',
                '</b></p>',
                '<p>Тип защиты: <b>',
                '{[this.r("WatersupplyFilterProtectionType", values.protection_type_id)]}',
                '</b></p>',
                '<p>Источник питания: <b>',
                '{[this.r("WatersupplyFilterPowerSource", values.power_source_id)]}',
                '</b></p>',
                '<p>Материал: <b>',
                '{[this.r("WatersupplyFilterMaterial", values.material_id)]}',
                '</b></p>',
                '<p>Страна изготовления: <b>',
                '{[this.r("WatersupplyFilterCountry", values.country)]}',
                '</b></p>',
                '<p>Гарантированный диапазон наружных температур (обогрев): <b>{temp}&nbsp;°C</b></p>',
                '<p>Напряжение питания: <b>{power_supply}&nbsp;В</b></p>',
                
                '</td><td>',
                
                '<p>Потребляемая мощность (обогрев): <b>{heating_power_consumption}&nbsp;кВт</b></p>',
                '<p>Рабочий ток: <b>{amperage}&nbsp;ампер</b></p>',
                '<p>Входов для подключаемых датчиков: <b>{sensor_inputs}&nbsp;ед.</b></p>',
                '<p>Давление: <b>{pressure}&nbsp;бар</b></p>',
                '<p>Уровень шума (мин): <b>{noise_level_min}&nbsp;дБ(А)</b></p>',
                '<p>Производительность фильтров: <b>{filters_performance}&nbsp;м³/ч</b></p>',
                '<p>Производительность: <b>{performance}&nbsp;м³/ч</b></p>',
                '<p>Крупность выделения загрязнений: <b>{pollution_size}&nbsp;мкм</b></p>',
                '<p>Энергоэффективность: <b>{eer}&nbsp;EER</b></p>',
                '<p>Вес: <b>{weight}&nbsp;кг</b></p>',
                '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>',
                '<p>Длина кабеля: <b>{cable_length}&nbsp;мм</b></p>',
                
                '</td><td>',
                
                '<p>Диаметр трубы: <b>{pipe_diameter}&nbsp;мм</b></p>',
                '<p>Высота подачи: <b>{delivery_height}&nbsp;м</b></p>',
                '<p>Глубина погружения: <b>{immersion_depth}&nbsp;м</b></p>',
                '<p>Гарантия: <b>{warranty}&nbsp;лет</b></p>',
                '<p>Склад: <b>{storage}&nbsp;ед.</b></p>',
                '<p>Резерв: <b>{reserve}&nbsp;ед.</b></p>',
                '<p>Заказ: <b>{order}&nbsp;ед.</b></p>',
                
                '</td></tr></table></div>', 
                {r: Ext.bind(this.comboRenderer, this)}
            )
        }]
        
        this.callParent(arguments);
    
    },
    
    initComponent: function() {

        var actions = [];
        
        if (acl.isUpdate('catalog', 'watersupply')) {
            
            actions = [{
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
                
            }];
        }
        
        this.columns = [{
            header: 'Марка',
            dataIndex: 'mark_id',
            width: 100,
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterMark', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Группа оборудования',
            dataIndex: 'group_id',
            flex: 1,
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterGroup', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Маркировка',
            width: 150,
            dataIndex: 'marking',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Тип продукции',
            width: 150,
            dataIndex: 'product_type_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterProductType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип исполнения',
            width: 150,
            dataIndex: 'implementation_type_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterImplementationType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Способ управления системой',
            hidden: true,
            dataIndex: 'control_type_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterControlType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип присоединения',
            hidden: true,
            dataIndex: 'connection_type_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterConnectionType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип защиты',
            hidden: true,
            dataIndex: 'protection_type_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterProtectionType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Источник питания',
            hidden: true,
            dataIndex: 'power_source_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterPowerSource', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Материал',
            hidden: true,
            dataIndex: 'material_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterMaterial', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Страна',
            hidden: true,
            dataIndex: 'country',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterCountry', value);
            },
            filter: {
                type: 'string'
            }
        }, {
            header: 'Допустимый диапазон температур (°C)',
            hidden: true,
            dataIndex: 'temp',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Напряжение питания (В)',
            hidden: true,
            dataIndex: 'power_supply',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Потребляемая мощность (обогрев) (кВт)',
            hidden: true,
            dataIndex: 'heating_power_consumption',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Рабочий ток (ампер)',
            hidden: true,
            dataIndex: 'amperage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Входов для подключаемых датчиков (ед.)',
            hidden: true,
            dataIndex: 'sensor_inputs',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Давление (бар)',
            hidden: true,
            dataIndex: 'pressure',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Уровень шума (мин) (дБ(А))',
            hidden: true,
            dataIndex: 'noise_level_min',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Производительность фильтров (м³/ч)',
            hidden: true,
            dataIndex: 'filters_performance',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Производительность (м³/ч)',
            hidden: true,
            dataIndex: 'performance',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Крупность выделения загрязнений (мкм)',
            hidden: true,
            dataIndex: 'pollution_size',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Энергоэффективность (EER)',
            hidden: true,
            dataIndex: 'eer',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Вес (кг)',
            hidden: true,
            dataIndex: 'weight',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Габариты (ШхДхВ) (мм)',
            hidden: true,
            dataIndex: 'dimensions'
        }, {
            header: 'Длина кабеля (мм)',
            hidden: true,
            dataIndex: 'cable_length',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Диаметр трубы (мм)',
            hidden: true,
            dataIndex: 'pipe_diameter',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Высота подачи (м)',
            hidden: true,
            dataIndex: 'delivery_height',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Глубина погружения (м)',
            hidden: true,
            dataIndex: 'immersion_depth',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Гарантия (лет)',
            hidden: true,
            dataIndex: 'warranty',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Склад (ед.)',
            hidden: true,
            dataIndex: 'storage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Резерв (ед.)',
            hidden: true,
            dataIndex: 'reserve',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Заказ (ед.)',
            hidden: true,
            dataIndex: 'order',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Ссылка',
            hidden: true,
            dataIndex: 'url'
        }, {
            header: 'Цена (р)',
            width: 80,
            dataIndex: 'price',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'СМР (р)',
            hidden: true,
            dataIndex: 'mount_price',
            filter: {
                type: 'numeric'
            }
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            hideable: false,
            menuDisabled: true,
            width: 40,
            items: actions
        }];

        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
        
        Ext.defer(function() {
            this.getStore().load();
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