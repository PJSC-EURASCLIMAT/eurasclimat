Ext.define('EC.CRM.store.Calcpd.ObjType', {

    extend: 'EC.CRM.store.Calcpd.ConfigAbstract',
   
    apiConfig: {
        create:     '/json/crm/calcpd-config/create-obj-type',
        read:       '/json/crm/calcpd-config/read-obj-type',
        update:     '/json/crm/calcpd-config/update-obj-type',
        destroy:    '/json/crm/calcpd-config/destroy-obj-type'
    }
});