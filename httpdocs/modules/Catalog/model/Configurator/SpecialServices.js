Ext.define('EC.Catalog.model.Configurator.SpecialServices', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'code',
        'name',
        'price',
        'measure',
        'term',
        'number',
        {name: 'summ', type: 'float'}
    ]
});