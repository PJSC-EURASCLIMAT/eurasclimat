Ext.define('EC.SysDev.store.Docs.Groups', {

    extend: 'Ext.data.Store',

    model: 'EC.CRM.model.Projects.Groups',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: '/json/sysdev/projects-docs/get-docs-groups-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});