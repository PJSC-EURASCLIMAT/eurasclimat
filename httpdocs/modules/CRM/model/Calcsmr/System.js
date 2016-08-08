Ext.define('EC.CRM.model.Calcsmr.System', {

    extend: 'Ext.data.Model',
   
    fields: ['id', 'system_id', 'name', 'measure', 
        {name: 'qty', type: 'float' },
        {name: 'price', type: 'float' },
        {name: 'sum', type: 'float'}
    ]
});