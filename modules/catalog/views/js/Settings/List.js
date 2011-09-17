Ext.ns('Catalog.Marks');

Catalog.Marks.List = Ext.extend(Ext.grid.GridPanel, {
    
    title: 'Марки',

    listURL:    link('catalog', 'marks', 'get-list'),
    
    deleteURL:  link('catalog', 'marks', 'delete'),
    
    loadMask: true,

    permissions: acl.isUpdate('catalog'),

    defaultSortable: true,
    
    initComponent: function() {
        
        this.autoExpandColumn = Ext.id();
        
        this.ds = new Ext.data.JsonStore({
            url: this.listURL,
            remoteSort: true,
            autoLoad: true,
            root: 'data',
            sortInfo: {
                field: 'id',
                direction: 'ASC'
            },
            fields: ['id', 'name', 'country']
        });
        
        this.sm = new Ext.grid.RowSelectionModel();
        
        var actions = new xlib.grid.Actions({
            autoWidth: true,
            items: [{
                text: 'Редактировать',
                iconCls: 'edit',
                hidden: !acl.isUpdate('catalog'),
                handler: this.onUpdate,
                scope: this
            }, {
                text: 'Удалить',
                iconCls: 'delete',
                hidden: !acl.isUpdate('catalog'),
                handler: this.onDelete,
                scope: this
            }],
            scope: this
        });
        
        this.colModel = new Ext.grid.ColumnModel({
            defaultSortable: true,
            columns: [{
                header: '№',
                dataIndex: 'id',
                width: 40
            }, {
                header: 'Название',
                dataIndex: 'name',
                id: this.autoExpandColumn
            }, {
                header: 'Страна',
                dataIndex: 'country',
                width: 200
            }]
        });
        
        this.filtersPlugin = new Ext.grid.GridFilters({
            filters: [
                {type: 'string',  dataIndex: 'name'}
            ]
        });
        
        this.plugins = [actions, this.filtersPlugin];

        this.addBtn = new Ext.Toolbar.Button({
            text: 'Добавить',
            iconCls: 'add',
            hidden: !this.permissions,
            tooltip: 'Добавить',
            handler: this.onAdd,
            scope: this
        });
        
        this.tbar = new Ext.Toolbar({
            items: [
                this.addBtn, 
                ' ', 
                this.filtersPlugin.getSearchField({width: 400}), 
                ' ', {
                    xtype: 'button',
                    tooltip: 'Обновить',
                    iconCls: 'x-tbar-loading',
                    handler: function() {
                        this.getStore().reload();
                    },
                    scope: this
                }
            ]
        });
        
        Catalog.Marks.List.superclass.initComponent.apply(this, arguments);
        
        if (this.permissions) {
            this.on('rowdblclick', this.onUpdate, this);
        }
    },
    
    onAdd: function(b, e) {
        
        var formPanel = new Catalog.Marks.Form();
        
        formPanel.getForm().on('saved', function() {
            this.getStore().reload();
        }, this);
    },
    
    onUpdate: function(g, rowIndex) {
        
        var record = g.getStore().getAt(rowIndex);
        var id = parseInt(record.get('id'));
        
        var formPanel = new Catalog.Marks.Form({
            itemId: id
        });
        
        formPanel.getForm().on('saved', function() {
            this.getStore().reload();
        }, this);
    },
    
    onDelete: function(g, rowIndex) {
        
        var record = g.getStore().getAt(rowIndex);
        var id = parseInt(record.get('id'));
        
        xlib.Msg.confirm('Вы уверены?', function() {
            
            Ext.Ajax.request({
                url: this.deleteURL,
                params: {
                    id: id
                },
                callback: function(options, success, response) {
                    var res = xlib.decode(response.responseText);
                    if (true == success && res && true == res.success) {
                        g.getStore().reload();
                        return;
                    }
                    xlib.Msg.error('Ошибка при удалении.');
                },
                scope: this
            });
            
        }, this);
    }
});

Ext.reg('Catalog.Marks.List', Catalog.Marks.List);