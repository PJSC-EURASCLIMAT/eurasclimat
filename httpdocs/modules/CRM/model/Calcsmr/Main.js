Ext.define('EC.CRM.model.Calcsmr.Main', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        {name: 'date', type: 'date', dateReadFormat: 'Y-m-d H:i:s'},
        'account_id',
        'account_name',
        {name: 'k_compensation', type: 'float'},
        {name: 'k_overheads', type: 'float'},
        {name: 'k_estimated', type: 'float'},
        {name: 'k_vat', type: 'float'}
    ]
});