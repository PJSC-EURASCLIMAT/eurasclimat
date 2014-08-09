Ext.define('EC.Market.model.DocsVersions', {

    extend: 'Ext.data.Model',

    idProperty: 'id',
   
    fields: [
        'id',
        'doc_id',
        'file_id',
        'file_name',
        'item_id',
        {name: 'date_create', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});