Ext.define('EC.Catalog.model.Conditioners', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'code',
        'group_id',
        'mark_id',
        'marking',
        'name',
        'product_type_id',
        'implementation_type_id',
        'heatingcooling_id',
        'power_source_id',
        'country',
        'cooling_capacity',
        'heating_capacity',
        'air_consumption_min',
        'air_consumption_max',
        'noise_level_min',
        'noise_level_max',
        'dimensions',
        'warranty',
        'seer',
        'scop',
        'maxblocks',
        'ports',
        'sound_power_level',
        'working_amperage',
        'operating_amperage',
        'max_working_amperage',
        'factory_refrigerant_charge',
        'price',
        'currency_id',
        'description',
        'images'
    ]
});