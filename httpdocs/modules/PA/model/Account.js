Ext.define('EC.PA.model.Account', {

    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        {name: 'id',  type: 'number'},
        {name: 'name',  type: 'string'}
    ]

});