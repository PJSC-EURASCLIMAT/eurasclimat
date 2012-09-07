Ext.define('EC.Catalog.view.Conditioners.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.ConditionersEdit',

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
                defaults: {
                    border: false,
                    padding: 5
                },
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 160,
                    anchor: '-5'
                },
                layout: 'column',
                columns: 4,
                items: [{
                    xtype: 'ConditionersFilterMark',
                    name: 'mark_id'
                }, {
                    xtype: 'ConditionersFilterGroup',
                    name: 'group_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }, {
                    xtype: 'ConditionersFilterProductType',
                    name: 'product_type_id'
                }, {
                    xtype: 'ConditionersFilterImplementationType',
                    name: 'implementation_type_id'
                }, {
                    xtype: 'ConditionersFilterControlType',
                    name: 'control_type_id'
                }, {
                    xtype: 'ConditionersFilterConnectionType',
                    name: 'connection_type_id'
                }, {
                    xtype: 'ConditionersFilterProtectionType',
                    name: 'protection_type_id'
                }, {
                    xtype: 'ConditionersFilterPowerSource',
                    name: 'power_source_id'
                }, {
                    xtype: 'ConditionersFilterMaterial',
                    name: 'material_id'
                }, {
                    xtype: 'ConditionersFilterCountry',
                    name: 'country'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Холодопроизводительность (кВт)',
                    name: 'cooling_capacity'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Теплопроизводительность (кВт)',
                    name: 'heating_capacity'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Гарантированный диапазон наружных температур (охлаждение) (°C)',
                    name: 'cooling_outdor_temp'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Гарантированный диапазон наружных температур (обогрев) (°C)',
                    name: 'heating_outdor_temp'
                }, { 
                    xtype: 'numberfield',
                    fieldLabel: 'Напряжение питания (В)',
                    name: 'power_supply'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Потребляемая мощность (охлаждение) (кВт)',
                    name: 'cooling_power_consumption'
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
                    fieldLabel: 'Расход воздуха (мин) (м³/ч)',
                    name: 'air_consumption_min'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Расход воздуха (макс) (м³/ч)',
                    name: 'air_consumption_max'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Входов для подключаемых датчиков (ед.)',
                    name: 'sensor_inputs'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Давление (бар)',
                    name: 'pressure'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Уровень шума (мин) (дБ(А))',
                    name: 'noise_level_min'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Уровень шума (макс) (дБ(А))',
                    name: 'noise_level_max'
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
                    fieldLabel: 'Диаметр трубок (жидкость) (мм)',
                    name: 'pipe_diameter_liquid'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Диаметр трубок (газ) (мм)',
                    name: 'pipe_diameter_gas'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Диаметр дренажа (мм)',
                    name: 'drain_diameter'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Максимальная длина магистрали (м)',
                    name: 'trunk_length'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Максимальный перепад высот (м)',
                    name: 'elevation_difference'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Площадь кондиционирования (м²)',
                    name: 'square'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Площадь кондиционирования (м³/ч)',
                    name: 'volume'
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