Ext.define('EC.Catalog.view.Heating.Edit', {
    
    extend: 'EC.Catalog.view.EditAbstract',
    
    alias: 'widget.HeatingEdit',

    catalog: 'heating',
    
    fields: [{
        xtype: 'FilterMark',
        name: 'mark_id'
    }, {
        xtype: 'HeatingFilterGroup',
        name: 'group_id'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Маркировка',
        name: 'marking'
    }, {
        xtype: 'HeatingFilterProductType',
        name: 'product_type_id'
    }, {
        xtype: 'HeatingFilterImplementationType',
        name: 'implementation_type_id'
    }, {
        xtype: 'HeatingFilterControlType',
        name: 'control_type_id'
    }, {
        xtype: 'HeatingFilterConnectionType',
        name: 'connection_type_id'
    }, {
        xtype: 'HeatingFilterProtectionType',
        name: 'protection_type_id'
    }, {
        xtype: 'HeatingFilterPowerSource',
        name: 'power_source_id'
    }, {
        xtype: 'HeatingFilterMaterial',
        name: 'material_id'
    }, {
        xtype: 'HeatingFilterCountry',
        name: 'country'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Максимальная температура горячей воды (°C)',
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
        fieldLabel: 'Мощность котла (кВт)',
        name: 'power'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Производительность (кг/ч)',
        name: 'productivity'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Мощность горелки (кВт)',
        name: 'burner_power'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Рабочий ток (ампер)',
        name: 'amperage'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Входов для подключаемых датчиков (ед.)',
        name: 'sensor_inputs'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Давление (бар)',
        name: 'pressure'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Уровень шума (мин) (дБ(А))',
        name: 'noise_level_min'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Противодавление топки (мбар)',
        name: 'back_pressure'
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
        fieldLabel: 'Длина горелочной трубы (мм)',
        name: 'burner_tube_length'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Отверстие для горелки (мм)',
        name: 'burner_tube_hole'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Диаметр дымохода (мм)',
        name: 'chimney_diameter'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'КПД (%)',
        name: 'efficiency'
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