Ext.define('EC.PA.model.Message', {

    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        {name: 'id',  type: 'number'},
        {name: 'sender_id',  type: 'number'},
        {name: 'receiver_id',  type: 'number'},
        {name: 'sender_name',  type: 'string'},
        {name: 'receiver_name',  type: 'string'},
        {name: 'subject',  type: 'string'},
        {name: 'type',  type: 'int'},
        {name: 'message',  type: 'string'},
        {name: 'date', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'readed',   type: 'number'},
        {name: 'parent', type: 'string'},
        {name: 'checked', type: 'int'},
        {name: 'deleted', type: 'int'},
        {name: 'expanded', type: 'boolean', defaultValue: false}
    ]

});