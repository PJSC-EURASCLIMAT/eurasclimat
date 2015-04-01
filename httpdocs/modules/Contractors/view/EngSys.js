Ext.define('EC.Contractors.view.EngSys', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Contractors.store.EngSys',
    
    alias: ['widget.Contractors-EngSys-list'],

    title: false,

    permissions: false,
    
    enableColumnMove: false,

    initComponent: function() {

        var actions = [];

        this.columns = [{
            text: 'Наименование',
            flex: 1,
            sortable: false,
            hideable: false,
            dataIndex: 'name'
        }];

        this.callParent();
    }
});