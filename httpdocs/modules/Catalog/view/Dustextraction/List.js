Ext.define('EC.Catalog.view.Dustextraction.List', {

    extend: 'Ext.grid.Panel',
    
    requires: ['xlib.grid.FiltersFeature'],
   
    alias: ['widget.DustextractionList'],
    
    store: 'EC.Catalog.store.Dustextraction',
    
    layout: 'fit',
    
    title: 'Результаты выборки',
    
    tools: [{
        type: 'expand',
        tooltip: 'Раскрыть/закрыть все строки',
        action: 'expandrows'
    }, {
        type: 'plus',
        tooltip: 'Добавить позицию',
        action: 'additem',
        hidden: !acl.isUpdate('catalog', 'dustextraction')
    }, {
        type: 'refresh',
        tooltip: 'Обновить список',
        action: 'refresh'
    }],
    
    features: [{ftype: 'filters', encode: true, showMenu: false}],
    
    constructor: function() {
        
        this.plugins = [{
            ptype: 'rowexpander',
            rowBodyTpl: Ext.create('Ext.XTemplate', 
                '<div style="padding: 10px;"><table width="100%" border="0">',
                '<tr valign="top">',
                
                '<td rowspan="2" width="320"><img src="http://placehold.it/300x220"/>',
                
                '<p>Ссылка: <b>{url}</b></p><br/>',
                '<p>Цена: <b>{price}&nbsp;р.</b></p>',
                '<p>СМР: <b>{mount_price}&nbsp;р.</b></p>',
                
                '</td><td colspan="3" height="40"><h1><p>',
                '{[this.r("FilterMark", values.mark_id)]} ',
                '{marking}</p></h1>',
                '<p>Группа оборудования: <b>',
                '{[this.r("DustextractionFilterGroup", values.group_id)]}',
                '</b></p>',
                
                '</td></tr><tr valign="top"><td>',
                '<p>Фильтрация: <b>',
                '{[this.r("DustextractionFilterFiltration", values.filtration_id)]}',
                '</b></p>',
                '<p>Тип мотора: <b>',
                '{[this.r("DustextractionFilterMotor", values.motor_id)]}',
                '</b></p>',
                '<p>Страна изготовления: <b>',
                '{[this.r("DustextractionFilterCountry", values.country)]}',
                '</b></p>',
                '<p>Потребляемая мощность: <b>{power_consumption}&nbsp;кВт</b></p>',
                '<p>Мощность всасывания: <b>{vacuum_power}&nbsp;АэроВатт</b></p>',
                '<p>Поток воздуха: <b>{air_flow}&nbsp;м³/ч</b></p>',
                '<p>Уровень вакуума: <b>{vacuum_pressure}&nbsp;кПа</b></p>',
                '<p>Уровень шума: <b>{noise_level}&nbsp;дБ</b></p>',
                
                '</td><td>',
                
                '<p>Предохранитель: <b>{amperage}&nbsp;ампер</b></p>',
                '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>',
                '<p>Максимальная площадь уборки: <b>{cleaning_square}&nbsp;м²</b></p>',
                '<p>Площадь фильтра: <b>{filter_square}&nbsp;м²</b></p>',
                '<p>Максимально удаленный пневмоклапан: <b>{max_remote_pneumo_valve}&nbsp;м</b></p>',
                '<p>Максимальная высота стояка: <b>{max_riser_height}&nbsp;м</b></p>',
                '<p>Максимальная длина горизонтальной разводки: <b>{max_cabling_length}&nbsp;м</b></p>',
                '<p>Диаметр стояка: <b>{riser_diameter}&nbsp;мм</b></p>',
                '<p>Диаметр горизонтальной разводки: <b>{cabling_diameter}&nbsp;мм</b></p>',
                '<p>Резервуар для пыли: <b>{dust_tank}&nbsp;л</b></p>',
                '<p>Ресурс гарантированной работы мотора: <b>{motor_resource}&nbsp;ч</b></p>',
                '<p>Наибольшее количество одновременных пользователей: <b>{max_users}&nbsp;ед.</b></p>',
                
                '</td><td>',
                
                '<p>Дополнительный клапан на корпусе: <b>{extra_case_valve}&nbsp;есть/нет</b></p>',
                '<p>Soft-start: <b>{soft_start}&nbsp;есть/нет</b></p>',
                '<p>Clean-pipe: <b>{clean_pipe}&nbsp;есть/нет</b></p>',
                '<p>Регулировка мощности всасывания: <b>{vacuum_power_adj}&nbsp;есть/нет</b></p>',
                '<p>LCD дисплей на корпусе: <b>{case_lcd}&nbsp;есть/нет</b></p>',
                '<p>Регулировочный клапан: <b>{regulating_valve}&nbsp;есть/нет</b></p>',
                '<p>Продувной клапан: <b>{downy_valve}&nbsp;есть/нет</b></p>',
                '<p>Автоматическая чистка фильтра: <b>{auto_clean}&nbsp;есть/нет</b></p>',
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
        
        if (acl.isUpdate('catalog', 'dustextraction')) {
            
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
                return this.comboRenderer('FilterMark', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Группа оборудования',
            dataIndex: 'group_id',
            flex: 1,
            renderer: function(value) {
                return this.comboRenderer('DustextractionFilterGroup', value);
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
            header: 'Фильтрация',
            hidden: true,
            dataIndex: 'filtration_id',
            renderer: function(value) {
                return this.comboRenderer('DustextractionFilterFiltration', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип мотора',
            hidden: true,
            dataIndex: 'motor_id',
            renderer: function(value) {
                return this.comboRenderer('DustextractionFilterMotor', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Страна',
            hidden: true,
            dataIndex: 'country',
            renderer: function(value) {
                return this.comboRenderer('DustextractionFilterCountry', value);
            },
            filter: {
                type: 'string'
            }
        }, {
            header: 'Потребляемая мощность (кВт)',
            hidden: true,
            dataIndex: 'power_consumption',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Мощность всасывания (АэроВатт)',
            hidden: true,
            dataIndex: 'vacuum_power',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Поток воздуха (м³/ч)',
            hidden: true,
            dataIndex: 'air_flow',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Уровень вакуума (кПа)',
            hidden: true,
            dataIndex: 'vacuum_pressure',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Уровень шума (дБ)',
            hidden: true,
            dataIndex: 'noise_level',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Предохранитель (ампер)',
            hidden: true,
            dataIndex: 'amperage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Габариты (ШхДхВ) (мм)',
            hidden: true,
            dataIndex: 'dimensions'
        }, {
            header: 'Максимальная площадь уборки (м²)',
            hidden: true,
            dataIndex: 'cleaning_square',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Площадь фильтра (м²)',
            hidden: true,
            dataIndex: 'filter_square',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Максимально удаленный пневмоклапан (м)',
            hidden: true,
            dataIndex: 'max_remote_pneumo_valve',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Максимальная высота стояка (м)',
            hidden: true,
            dataIndex: 'max_riser_height',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Максимальная длина горизонтальной разводки (м)',
            hidden: true,
            dataIndex: 'max_cabling_length',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Диаметр стояка (мм)',
            hidden: true,
            dataIndex: 'riser_diameter',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Диаметр горизонтальной разводки (мм)',
            hidden: true,
            dataIndex: 'cabling_diameter',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Резервуар для пыли (л)',
            hidden: true,
            dataIndex: 'dust_tank',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Ресурс гарантированной работы мотора (ч)',
            hidden: true,
            dataIndex: 'motor_resource',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Наибольшее количество одновременных пользователей (ед.)',
            hidden: true,
            dataIndex: 'max_users',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Дополнительный клапан на корпусе (есть/нет)',
            hidden: true,
            dataIndex: 'extra_case_valve'
        }, {
            header: 'Soft-start (есть/нет)',
            hidden: true,
            dataIndex: 'soft_start'
        }, {
            header: 'Clean-pipe (есть/нет)',
            hidden: true,
            dataIndex: 'clean_pipe'
        }, {
            header: 'Регулировка мощности всасывания (есть/нет)',
            hidden: true,
            dataIndex: 'vacuum_power_adj'
        }, {
            header: 'LCD дисплей на корпусе (есть/нет)',
            hidden: true,
            dataIndex: 'case_lcd'
        }, {
            header: 'Регулировочный клапан (есть/нет)',
            hidden: true,
            dataIndex: 'regulating_valve'
        }, {
            header: 'Продувной клапан (есть/нет)',
            hidden: true,
            dataIndex: 'downy_valve'
        }, {
            header: 'Автоматическая чистка фильтра (есть/нет)',
            hidden: true,
            dataIndex: 'auto_clean'
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