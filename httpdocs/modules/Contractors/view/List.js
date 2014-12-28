Ext.define('EC.Contractors.view.List', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Contractors.store.Contractors',
    
    alias: ['widget.Contractors-list'],

    title: false,

    permissions: false,
    
    enableColumnMove: false,

    initComponent: function() {

        var actions = [];

        this.columns = [{
        	text: 'Торговая марка',
        	flex: .5,
        	sortable: false,
        	hideable: false,
        	dataIndex: 'trademark'
        }, {
            text: 'Наименование',
            xtype: 'templatecolumn',
            tpl: '<a href="#/contractors/{id}">{name}</a>',
            flex: 1,
            sortable: false,
            hideable: false,
            dataIndex: 'name'
        }, {
        	text: 'Юридический адрес',
        	flex: .5,
        	sortable: false,
        	hideable: false,
        	dataIndex: 'legal_address'
        }, {
        	text: 'Ген.директор',
        	flex: .5,
        	sortable: false,
        	hideable: false,
        	dataIndex: 'general_director'
        }, {
        	text: 'Главный бухгалтер',
        	flex: .5,
        	sortable: false,
        	hideable: false,
        	dataIndex: 'chief_accountant'
        }, {
        	text: 'Телефон (секретарь)',
        	flex: .5,
        	sortable: false,
        	hideable: false,
        	dataIndex: 'phone'
        }, {
        	text: 'Сайт',
        	xtype: 'templatecolumn',
            tpl: '<a target="_blank" href="{site}">{site}</a>',
        	flex: .5,
        	sortable: false,
        	hideable: false,
        	dataIndex: 'site'
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
                    this.getStore().load();
                },
                scope: this
            }];
        }
        this.callParent();
    }
});