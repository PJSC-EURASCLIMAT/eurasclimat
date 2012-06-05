Ext.define('EC.Catalog.model.Conditioners', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'group_id',
        'mark_id',
        'marking',
        'product_type_id',
        'implementation_type_id',
        'country',
        'condition',
        'purpose',
        'square',
        'volume',
        'input_cooling',
        'input_heating',
        'output_cooling',
        'output_heating',
        'warranty',
        'storage',
        'reserve',
        'order',
        'measure',
        'price'
    ]
});