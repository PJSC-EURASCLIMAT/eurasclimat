Ext.define('EC.CRM.model.Calcpd.Editor', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'obj_class_name',
        'serv_name',
        {name: 'price', type: 'float'},
        {name: 'square', type: 'float'}
    ]
});