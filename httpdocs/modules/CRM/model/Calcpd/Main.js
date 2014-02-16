Ext.define('EC.CRM.model.Calcpd.Main', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        {name: 'created_date', type: 'date', dateReadFormat: 'Y-m-d H:i:s'},
        'creator_id',
        'creator_name'
    ]
});