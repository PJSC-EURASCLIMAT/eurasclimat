Ext.define('EC.Catalog.view.Airing.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.AiringShow'],

    props: [
        'product_type_name',
        'implementation_type_name',
        'control_type_name',
        'connection_type_name',
        'protection_type_name',
        'power_source_name',
        'material_name',
        'isolation_class_name',
        'country',
        'temp',
        'power_supply',
        'heating_power_consumption',
        'amperage',
        'sensor_inputs',
        'pressure',
        'noise_level_min',
        'eer',
        'weight',
        'dimensions',
        'cable_length',
        'pipe_diameter',
        'speed',
        'air_flow',
        'warranty',
        'storage',
        'reserve',
        'order'
    ],

    initComponent: function() {
        this.productProps.noise_level_min.name = 'Уровень звукового давления';
        this.callParent();
    }



});