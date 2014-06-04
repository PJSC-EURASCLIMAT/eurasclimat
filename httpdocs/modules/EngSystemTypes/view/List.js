Ext.define('EC.EngSystemTypes.view.List', {

    extend: 'Ext.grid.Panel',

    store: 'EC.EngSystemTypes.store.EngSystemTypes',
    
    alias: ['widget.EngSystemTypesList'],

    permissions: acl.isUpdate('crm', 'eng_system_types'),

    border: false,

    initComponent: function() {

        var actions = [];

        this.columns =  [{
            text: 'id',
            width: 50,
            dataIndex: 'id'
        },{
            text: 'Наименование',
            flex: 1,
            dataIndex: 'name'
        }];

        if (this.permissions === true && !this.isPortlet) {

            actions.push({
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });

            actions.push({
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this

            });


            this.columns.push({
                xtype:'actioncolumn',
                width: parseInt(actions.length) * 20,
                items: actions
            });


            this.tbar = [{
                xtype: 'button',
                text: 'Создать',
                iconCls: 'add',
                hidden: !this.permissions,
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('additem');
                },
                scope: this
            }];

        }

        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 25,
            store: this.store,
            displayInfo: !this.isPortlet,
            plugins: this.isPortlet ? [] : Ext.create('xlib.ProgressBarPager', {})
        });

        this.callParent();


    }

});