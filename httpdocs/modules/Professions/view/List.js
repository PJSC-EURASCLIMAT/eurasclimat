Ext.define('EC.Professions.view.List', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Professions.store.Professions',
    
    alias: ['widget.ProfessionsList'],

    permissions: acl.isUpdate('professions'),

    border: false,

    initComponent: function() {

        var actions = [];

        this.columns =  [{
            text: 'Код',
            width: 50,
            dataIndex: 'id'
        },{
            text: 'КЧ',
            width: 50,
            dataIndex: 'kch'
        },{
            text: 'Наименование',
            flex: 1,
            dataIndex: 'name'
        },{
            text: 'Код выпуска ЕТКС',
            width: 70,
            dataIndex: 'etks'
        },{
            text: 'Код по ОКЗ',
            width: 70,
            dataIndex: 'okz'
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