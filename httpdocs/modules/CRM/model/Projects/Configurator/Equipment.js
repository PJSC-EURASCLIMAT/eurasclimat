Ext.define('EC.CRM.model.Projects.Configurator.Equipment', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'entity',
        'entity_id',
        'number',
        'code',
        'mark',
        'marking',
        'services',
        {name: 'price', type: 'float'},
        {name: 'eq_summ', type: 'float'},
        {name: 'services_summ', type: 'float'},
        {name: 'total_summ', type: 'float'}
    ]
});