Ext.define('EC.Catalog.model.Configurator.Equipment', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'entity',
        'entity_id',
        'number',
        'code',
        'marking',
        'price',
        'mark',
        {name: 'summ', type: 'float'}
    ]
});