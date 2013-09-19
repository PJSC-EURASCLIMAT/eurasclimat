Ext.define('EC.Catalog.model.Configurator.Expendables', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'code',
        'price',
        'measure',
        'number',
        {name: 'summ', type: 'float'}
    ]
});