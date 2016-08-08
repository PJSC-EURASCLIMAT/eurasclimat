Ext.define('EC.CRM.model.Calcsmr.Project', {

    extend: 'Ext.data.Model',
   
    fields: ['id', 
        {
            name: 'project_id', 
            type: 'int'
        },
        'system_name',
        {
            name: 'system_sum', 
            type: 'float'
        },
        {
            name: 'k_related', 
            type: 'float'
        },
        {
            name: 'k_compensation', 
            type: 'float'
        },
        {
            name: 'k_amortisation', 
            type: 'float'
        },
        {
            name: 'k_overheads', 
            type: 'float'
        },
        {
            name: 'k_estimated', 
            type: 'float'
        },
        {
            name: 'k_vat', 
            type: 'float'
        },
        {
            name: 'related',
            type: 'float'
        },
        {
            name: 'related_system_sum_total',
            type: 'float'
        },
        {
            name: 'compensation', 
            type: 'float'
        },
        {
            name: 'amortisation', 
            type: 'float'
        },
        {
            name: 'overheads', 
            type: 'float'
        },
        {
            name: 'estimated', 
            type: 'float'
        },
        {
            name: 'total', 
            type: 'float'
        },
        {
            name: 'vat', 
            type: 'float'
        },
        {
            name: 'vat_total', 
            type: 'float'
        }
    ]
});