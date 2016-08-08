Ext.define('EC.CRM.model.Projects.Configurator.Expendables', {

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