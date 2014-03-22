Ext.define('EC.CRM.model.Demoprojects.Configurator.Expendables', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'code',
        'measure',
        {name: 'number', type: 'float'},
        {name: 'price', type: 'float'},
        {name: 'summ', type: 'float'}
    ]
});