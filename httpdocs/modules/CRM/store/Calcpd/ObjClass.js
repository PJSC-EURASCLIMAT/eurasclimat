Ext.define('EC.CRM.store.Calcpd.ObjClass', {

    extend: 'EC.CRM.store.Calcpd.ConfigAbstract',
   
    apiConfig: {
        create:     '/json/crm/calcpd-config/create-obj-class',
        read:       '/json/crm/calcpd-config/read-obj-class',
        update:     '/json/crm/calcpd-config/update-obj-class',
        destroy:    '/json/crm/calcpd-config/destroy-obj-class'
    }
});