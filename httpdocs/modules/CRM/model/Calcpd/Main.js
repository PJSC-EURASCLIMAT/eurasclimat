Ext.define('EC.CRM.model.Calcpd.Main', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'obj_type_id',
        'obj_type_name',
        {name: 'date', type: 'date', dateReadFormat: 'Y-m-d H:i:s'},
        'account_id',
        'account_name'
    ]
});