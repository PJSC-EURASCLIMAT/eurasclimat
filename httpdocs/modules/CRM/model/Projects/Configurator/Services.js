Ext.define('EC.CRM.model.Projects.Configurator.Services', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'number',
        'code',
        'name',
        'price',
        'measure',
        'term',
        {name: 'summ', type: 'float'}
    ]
});