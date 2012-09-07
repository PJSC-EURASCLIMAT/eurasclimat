Ext.define('EC.Catalog.view.Dustextraction.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.DustextractionEdit',

    title: 'Новая позиция',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    width: 1000,
    
    height: 600,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'tabpanel',
            items: [{
                title: 'Параметры',
                xtype: 'form',
                layout: 'column',
                columns: 4,
                defaults: {
                    border: false,
                    padding: 5
                },
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 160,
                    anchor: '-5'
                },
                items: [{
                    xtype: 'DustextractionFilterMark',
                    name: 'mark_id'
                }, {
                    xtype: 'DustextractionFilterGroup',
                    name: 'group_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }, {
                    xtype: 'DustextractionFilterMotor',
                    name: 'motor_id'
                }, {
                    xtype: 'DustextractionFilterFiltration',
                    name: 'filtration_id'
                }, {
                    xtype: 'DustextractionFilterCountry',
                    name: 'country'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Потребляемая мощность (кВт)',
                    name: 'power_consumption'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Мощность всасывания (АэроВатт)',
                    name: 'vacuum_power'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Поток воздуха (м³/ч)',
                    name: 'air_flow'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Уровень вакуума (кПа)',
                    name: 'vacuum_pressure'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Уровень шума (дБ)',
                    name: 'noise_level'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Предохранитель (ампер)',
                    name: 'amperage'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Габариты (ШхДхВ) (мм)',
                    name: 'dimensions'
                }, { 
                    xtype: 'numberfield',
                    fieldLabel: 'Максимальная площадь уборки (м²)',
                    name: 'cleaning_square'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Площадь фильтра (м²)',
                    name: 'filter_square'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Максимально удаленный пневмоклапан (м)',
                    name: 'max_remote_pneumo_valve'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Максимальная высота стояка (м)',
                    name: 'max_riser_height'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Максимальная длина горизонтальной разводки (м)',
                    name: 'max_cabling_length'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Диаметр стояка (мм)',
                    name: 'riser_diameter'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Диаметр горизонтальной разводки (мм)',
                    name: 'cabling_diameter'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Резервуар для пыли (л)',
                    name: 'dust_tank'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Ресурс гарантированной работы мотора (ч)',
                    name: 'motor_resource'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Наибольшее количество одновременных пользователей (ед.)',
                    name: 'max_users'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Дополнительный клапан на корпусе (есть/нет)',
                    name: 'extra_case_valve'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Soft-start (есть/нет)',
                    name: 'soft_start'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Clean-pipe (есть/нет)',
                    name: 'clean_pipe'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Регулировка мощности всасывания (есть/нет)',
                    name: 'vacuum_power_adj'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'LCD дисплей на корпусе (есть/нет)',
                    name: 'case_lcd'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Регулировочный клапан (есть/нет)',
                    name: 'regulating_valve'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Продувной клапан (есть/нет)',
                    name: 'downy_valve'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Автоматическая чистка фильтра (есть/нет)',
                    name: 'auto_clean'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Гарантия (лет)',
                    name: 'warranty'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Склад (ед.)',
                    name: 'storage'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Резерв (ед.)',
                    name: 'reserve'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Заказ (ед.)',
                    name: 'order'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Ссылка',
                    name: 'url'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Цена (р)',
                    name: 'price'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'СМР (р)',
                    name: 'mount_price'
                }]
            }, {
                title: 'Изображения'
            }],
            buttons: [{
                text: 'Сохранить',
                formBind: true,
                disabled: true,
                action: 'save'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});