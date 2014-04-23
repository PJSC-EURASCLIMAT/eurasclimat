Ext.define('EC.Catalog.view.Electricity.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.ElectricityShow'],


    props: [
        'product_type_name',
        'implementation_type_name',
        'control_type_name',
        'connection_type_name',
        'protection_type_name',
        'power_source_name',
        'material_name',
        'isolation_type_name',
        'country',

        'temp',
        'power_supply',
        'power',
        'amperage',

        'sensor_inputs',
        'noise_level_min',
        'eer',
        'weight',
        'dimensions',
        'cable_length',

        'warranty',
        'storage',
        'reserve',
        'order'
    ],

    initComponent: function() {

        Ext.apply(this.productProps, {
            speed: {              name: 'Макс. частота вращения', units: '1/мин' },
            switching_time: {     name: 'Время переключения', units: 'с' }
        });

        this.callParent();

    }
});