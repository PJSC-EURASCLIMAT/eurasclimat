Ext.define('EC.Catalog.view.Heating.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.HeatingShow'],

    props: [
        'product_type_name',
        'implementation_type_name',
        'control_type_name',
        'connection_type_name',
        'protection_type_name',
        'power_source_name',
        'material_name',
        'country',

        'temp',
        'power_supply',
        'heating_power_consumption',
        'power',

        'productivity',
        'burner_power',
        'amperage',

        'sensor_inputs',
        'pressure',

        'noise_level_min',
        'back_pressure',

        'eer',
        'weight',
        'dimensions',
        'cable_length',

        'burner_tube_length',
        'burner_tube_hole',
        'chimney_diameter',
        'efficiency',

        'warranty',
        'storage',
        'reserve',
        'order'
    ],

    initComponent: function() {

        Ext.apply(this.productProps, {
            temp: {                 name: 'Максимальная температура горячей воды', units: '°C' },
            power: {                name: 'Мощность котла', units: 'кВт' },

            productivity: {         name: 'Производительность', units: 'кг/ч' },
            burner_power: {         name: 'Мощность горелки', units: 'кВт' },
            back_pressure: {        name: 'Противодавление топки', units: 'мбар' },

            burner_tube_length: {   name: 'Длина горелочной трубы', units: 'мм' },
            burner_tube_hole: {     name: 'Отверстие для горелки', units: 'мм' },
            chimney_diameter: {     name: 'Диаметр дымохода', units: 'мм' },
            efficiency: {           name: 'КПД', units: '%' }
        });

        this.callParent();

    }
});