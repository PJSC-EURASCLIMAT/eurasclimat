Ext.define('EC.Catalog.view.Electricity.Edit', {
    
    extend: 'EC.Catalog.view.EditAbstract',
    
    alias: 'widget.ElectricityEdit',

    catalog: 'electricity',
    
    fields: [{
        xtype: 'FilterMark',
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
        xtype: 'textfield',
        fieldLabel: 'Ссылка',
        name: 'url'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Цена (р)',
        name: 'price'
    }]
});