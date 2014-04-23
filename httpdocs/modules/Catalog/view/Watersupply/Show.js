Ext.define('EC.Catalog.view.Watersupply.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.WatersupplyShow'],

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
        'amperage',
        'sensor_inputs',
        'pressure',
        'noise_level_min',

        'filters_performance',
        'performance',
        'pollution_size',
        'eer',

        'weight',
        'dimensions',
        'cable_length',

        'pipe_diameter',
        'delivery_height',
        'immersion_depth',

        'warranty',
        'storage',
        'reserve',
        'order'
    ],

    initComponent: function() {

        Ext.apply(this.productProps, {
            temp: {                 name: 'Гарантированный диапазон наружных температур (обогрев)', units: '°C' },
            filters_performance: {  name: 'Производительность фильтров', units: 'м³/ч' },
            performance: {          name: 'Производительность', units: 'м³/ч' },
            pollution_size: {         name: 'Крупность выделения загрязнений', units: 'мкм' },

            pipe_diameter: {         name: 'Диаметр трубы', units: 'мм' },
            delivery_height: {        name: 'Высота подачи', units: 'м' },
            immersion_depth: {        name: 'Глубина погружения', units: 'м' }
        });

        this.callParent();

    }
});