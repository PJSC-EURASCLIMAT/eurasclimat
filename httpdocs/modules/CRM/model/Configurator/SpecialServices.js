Ext.define('EC.CRM.model.Configurator.SpecialServices', {

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