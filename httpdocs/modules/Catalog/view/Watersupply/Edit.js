Ext.define('EC.Catalog.view.Watersupply.Edit', {
    
    extend: 'EC.Catalog.view.EditAbstract',
    
    alias: 'widget.WatersupplyEdit',

    catalog: 'watersupply',
    
    fields: [{
        xtype: 'FilterMark',
        name: 'mark_id'
    }, {
        xtype: 'WatersupplyFilterGroup',
        name: 'group_id'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Маркировка',
        name: 'marking'
    }, {
        xtype: 'WatersupplyFilterProductType',
        name: 'product_type_id'
    }, {
        xtype: 'WatersupplyFilterImplementationType',
        name: 'implementation_type_id'
    }, {
        xtype: 'WatersupplyFilterControlType',
        name: 'control_type_id'
    }, {
        xtype: 'WatersupplyFilterConnectionType',
        name: 'connection_type_id'
    }, {
        xtype: 'WatersupplyFilterProtectionType',
        name: 'protection_type_id'
    }, {
        xtype: 'WatersupplyFilterPowerSource',
        name: 'power_source_id'
    }, {
        xtype: 'WatersupplyFilterMaterial',
        name: 'material_id'
    }, {
        xtype: 'WatersupplyFilterCountry',
        name: 'country'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Допустимый диапазон температур (°C)',
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
        fieldLabel: 'Давление (бар)',
        name: 'pressure'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Уровень шума (мин) (дБ(А))',
        name: 'noise_level_min'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Производительность фильтров (м³/ч)',
        name: 'filters_performance'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Производительность (м³/ч)',
        name: 'performance'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Крупность выделения загрязнений (мкм)',
        name: 'pollution_size'
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
        fieldLabel: 'Диаметр трубы (мм)',
        name: 'pipe_diameter'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Высота подачи (м)',
        name: 'delivery_height'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Глубина погружения (м)',
        name: 'immersion_depth'
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
});