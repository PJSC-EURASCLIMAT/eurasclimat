Ext.define('EC.CRM.store.Calcpd.Serv', {

    extend: 'EC.CRM.store.Calcpd.ConfigAbstract',
   
    apiConfig: {
        create:     '/json/crm/calcpd-config/create-serv',
        read:       '/json/crm/calcpd-config/read-serv',
        update:     '/json/crm/calcpd-config/update-serv',
        destroy:    '/json/crm/calcpd-config/destroy-serv'
    }
});