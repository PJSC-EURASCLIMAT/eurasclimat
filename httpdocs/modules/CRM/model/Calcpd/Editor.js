Ext.define('EC.CRM.model.Calcpd.Editor', {

    extend: 'Ext.data.Model',
   
    fields: [
        {name: 'id', type: 'int'},
        {name: 'obj_class_name', type: 'string', persist: false},
        {name: 'serv_name', type: 'string', persist: false},
        {name: 'price', type: 'float', persist: false},
        {name: 'square', type: 'float'}
    ]
});