Ext.ns('Catalog.Items');

Catalog.Items.List = Ext.extend(Ext.grid.GridPanel, {

    listURL:    link('catalog', 'items', 'get-list'),
    
    deleteURL:  link('catalog', 'items', 'delete'),
    
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
            totalProperty: 'totalCount',
            fields: [
                'id', 
                'category_name',
                'category_path',
                'chapter_name',
                'chapter_path',
                'type_name',
                'type_path',
                'mark_name',
                'mark_country',
                'marking',
                'measure_name',
                'price',
                'cold',
                'warm',
                'power'
            ]
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
                header: 'Категория',
                dataIndex: 'category_name',
                minWidth: 200,
                id: this.autoExpandColumn
            }, {
                header: 'Раздел',
                dataIndex: 'chapter_name',
                width: 200
            }, {
                header: 'Марка',
                dataIndex: 'mark_name',
                width: 100
            }, {
                header: 'Тип',
                dataIndex: 'type_name',
                width: 100
            }, {
                header: 'Маркировка',
                dataIndex: 'marking',
                width: 100
            }, {
                header: 'Eд. изм.',
                dataIndex: 'measure_name',
                width: 60
            }, {
                header: 'Цена',
                dataIndex: 'price',
                width: 80,
                renderer: function(value) {
                    var summ = Ext.util.Format.number(value, '0,000.00');
                    return summ.replace(/,/g, ' ');
                }
            }, {
                header: 'Холод',
                dataIndex: 'cold',
                width: 60
            }, {
                header: 'Тепло',
                dataIndex: 'warm',
                width: 60
            }, {
                header: 'Потребление',
                dataIndex: 'power',
                width: 80,
                renderer: function(value) {
                    var summ = Ext.util.Format.number(value, '0,000.000');
                    return summ.replace(/,/g, ' ');
                }
            }]
        });
        
        this.filtersPlugin = new Ext.grid.GridFilters({
            filters: [
                {type: 'string',  dataIndex: 'marking'}
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
                ' '
            ]
        });
        
        this.bbar = new xlib.PagingToolbar({
            plugins: [this.filtersPlugin],
            store: this.ds
        });
        
        Catalog.Items.List.superclass.initComponent.apply(this, arguments);
        
        if (this.permissions) {
            this.on('rowdblclick', this.onUpdate, this);
        }
    },
    
    onAdd: function(b, e) {
        
        var formPanel = new Catalog.Items.Form({
            //categoryId: this.categoryId
        });
        
        formPanel.getForm().on('saved', function() {
            this.getStore().reload();
        }, this);
    },
    
    onUpdate: function(g, rowIndex) {
        
        var record = g.getStore().getAt(rowIndex);
        var id = parseInt(record.get('id'));
        
        var formPanel = new Catalog.Items.Form({
            itemId: id
            //,categoryId: this.categoryId
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

Ext.reg('Catalog.Items.List', Catalog.Items.List);