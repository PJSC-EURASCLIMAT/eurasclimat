Ext.define('EC.CRM.model.Projects.Configurator.SpecialServices', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'code',
        'name',
        'measure',
        'term',
        'number',
        'expendables',
        {name: 'price', type: 'float'},
        {name: 'summ', type: 'float'},
        {name: 'expendables_summ', type: 'float'},
        {name: 'total_summ', type: 'float'}
    ]
});