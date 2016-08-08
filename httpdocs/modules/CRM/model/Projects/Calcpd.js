Ext.define('EC.CRM.model.Projects.Calcpd', {

    extend: 'Ext.data.Model',
   
    fields: [
        {name: 'id', type: 'int'},
        {name: 'obj_class_name', type: 'string', persist: false},
        {name: 'obj_type_name', type: 'string', persist: false},
        {name: 'serv_name', type: 'string', persist: false},
        {name: 'price', type: 'float', persist: false},
        {name: 'square', type: 'float'},
        {name: 'summ', type: 'float'}
    ]
});