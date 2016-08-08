Ext.define('EC.CRM.store.Calcpd.ObjTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.CRM.model.Calcpd.ObjTree',
    
    proxy: {
        type: 'ajax',
        url: '/json/crm/calcpd-config/get-obj-tree'
    }    
});