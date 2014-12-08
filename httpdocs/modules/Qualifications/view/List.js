Ext.define('EC.Qualifications.view.List', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Qualifications.store.Qualifications',
    
    alias: ['widget.qualifications-list'],

    title: 'Квалификации',

    permissions: false,
    
    enableColumnMove: false,

    initComponent: function() {

        var actions = [];

        this.columns = [{
            text: 'Значимость',
            width: 100,
            sortable: false,
            hideable: false,
            dataIndex: 'num'
        }, {
            text: 'Наименование',
            flex: 1,
            sortable: false,
            hideable: false,
            dataIndex: 'name'
        }];

        if (this.permissions && !this.isPortlet ) {

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
            }, '->', {
                xtype: 'button',
                tooltip: 'Обновить',
                iconCls: 'x-tbar-loading',
                handler: function() {
                    this.store.load();
                },
                scope: this
            }];
        }
        this.callParent();
    }
});