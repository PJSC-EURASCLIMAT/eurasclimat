Ext.define('EC.Qualifications.view.TypesList', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Qualifications.store.QualificationsTypes',
    
    alias: ['widget.qualifications-types-list'],

    title: 'Типы квалификаций',

    permissions: false,

    require: ['Ext.grid.plugin.CellEditing'],

    initComponent: function() {

        var actions = [];

        this.columns =  [{
            text: 'Наименование',
            flex: 1,
            dataIndex: 'name'
        }];

        if (this.permissions && !this.isPortlet) {

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

        this.callParent();
    }
});