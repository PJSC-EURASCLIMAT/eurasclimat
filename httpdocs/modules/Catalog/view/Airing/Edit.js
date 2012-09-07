Ext.define('EC.Catalog.view.Airing.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.AiringEdit',

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
                    xtype: 'AiringFilterMark',
                    name: 'mark_id'
                }, {
                    xtype: 'AiringFilterGroup',
                    name: 'group_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }, {
                    xtype: 'AiringFilterProductType',
                    name: 'product_type_id'
                }, {
                    xtype: 'AiringFilterImplementationType',
                    name: 'implementation_type_id'
                }, {
                    xtype: 'AiringFilterControlType',
                    name: 'control_type_id'
                }, {
                    xtype: 'AiringFilterConnectionType',
                    name: 'connection_type_id'
                }, {
                    xtype: 'AiringFilterProtectionType',
                    name: 'protection_type_id'
                }, {
                    xtype: 'AiringFilterPowerSource',
                    name: 'power_source_id'
                }, {
                    xtype: 'AiringFilterMaterial',
                    name: 'material_id'
                }, {
                    xtype: 'AiringFilterIsolationClass',
                    name: 'isolation_class_id'
                }, {
                    xtype: 'AiringFilterCountry',
                    name: 'country'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Гарантированный диапазон наружных температур (охлаждение) (°C)',
                    name: 'temp'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Напряжение питания (В)',
                    name: 'power_supply'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Потребляемая мощность (обогрев) (кВт)',
                    name: 'heating_power_consumption'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Рабочий ток (ампер)',
                    name: 'amperage'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Входов для подключаемых датчиков (ед.)',
                    name: 'sensor_inputs'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Максимальное рабочее давление (бар)',
                    name: 'pressure'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Уровень звукового давления (дБ(А))',
                    name: 'noise_level_min'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Энергоэффективность (EER)',
                    name: 'eer'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Вес (кг)',
                    name: 'weight'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Габариты (ШхДхВ) (мм)',
                    name: 'dimensions'
                }, { 
                    xtype: 'numberfield',
                    fieldLabel: 'Длина кабеля (мм)',
                    name: 'cable_length'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Диаметр трубок (мм)',
                    name: 'pipe_diameter'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Скорость (1/мин)',
                    name: 'speed'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Макс. расход воздуха (м³/ч)',
                    name: 'air_flow'
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