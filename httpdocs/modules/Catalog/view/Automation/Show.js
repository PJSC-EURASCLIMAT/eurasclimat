Ext.define('EC.Catalog.view.Automation.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.AutomationShow'],

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
        'temp_adjustment_range',
        'temp_setting_range',
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
        'spray_angle',
        'warranty',
        'storage',
        'reserve',
        'order'
    ],
    
    initComponent: function() {
        this.productProps.pressure.name = 'Диапазон перепада давления';
        this.callParent();
    }
});