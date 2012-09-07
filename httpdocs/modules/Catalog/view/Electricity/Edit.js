Ext.define('EC.Catalog.view.Electricity.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.ElectricityEdit',

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
                    xtype: 'ElectricityFilterMark',
                    name: 'mark_id'
                }, {
                    xtype: 'ElectricityFilterGroup',
                    name: 'group_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }, {
                    xtype: 'ElectricityFilterProductType',
                    name: 'product_type_id'
                }, {
                    xtype: 'ElectricityFilterImplementationType',
                    name: 'implementation_type_id'
                }, {
                    xtype: 'ElectricityFilterControlType',
                    name: 'control_type_id'
                }, {
                    xtype: 'ElectricityFilterConnectionType',
                    name: 'connection_type_id'
                }, {
                    xtype: 'ElectricityFilterProtectionType',
                    name: 'protection_type_id'
                }, {
                    xtype: 'ElectricityFilterPowerSource',
                    name: 'power_source_id'
                }, {
                    xtype: 'ElectricityFilterMaterial',
                    name: 'material_id'
                }, {
                    xtype: 'ElectricityFilterIsolationType',
                    name: 'isolation_type_id'
                }, {
                    xtype: 'ElectricityFilterCountry',
                    name: 'country'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Рекомендованные температуры эксплуатации (°C)',
                    name: 'temp'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Напряжение питания (В)',
                    name: 'power_supply'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Мощность (кВт)',
                    name: 'power'
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
                    fieldLabel: 'Уровень шума (мин) (дБ(А))',
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
                    fieldLabel: 'Макс. частота вращения (1/мин)',
                    name: 'speed'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Время переключения (c)',
                    name: 'switching_time'
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