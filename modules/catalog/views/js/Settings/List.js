Ext.ns('Catalog.Settings');

Catalog.Settings.List = Ext.extend(Ext.grid.GridPanel, {
    
    title: false,
    
    entity: null,
    
    border: false,
    
    loadMask: true,

    permissions: true,

    defaultSortable: true,
    
    layout: 'fit',
    
    listURL:    link('catalog', 'settings', 'get-list'),
    
    deleteURL:  link('catalog', 'settings', 'delete'),
    
    initComponent: function() {
        
        if (!Ext.isDefined(this.entity)) {
            throw 'entity is not defined';
        }
        
        this.autoExpandColumn = Ext.id();
        
        this.ds = new Ext.data.JsonStore({
            url: this.listURL,
            baseParams: {
                entity: this.entity
            },
            remoteSort: true,
            autoLoad: true,
            root: 'data',
            sortInfo: {
                field: 'id',
                direction: 'ASC'
            },
            fields: ['id', 'name']
        });
        
        this.sm = new Ext.grid.RowSelectionModel();
        
        var actions = new xlib.grid.Actions({
            autoWidth: true,
            items: [{
                text: 'Редактировать',
                iconCls: 'edit',
                handler: this.onUpdate,
                scope: this
            }, {
                text: 'Удалить',
                iconCls: 'delete',
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
            tooltip: 'Добавить',
            handler: this.onAdd,
            scope: this
        });
        
        this.tbar = new Ext.Toolbar({
            items: [this.addBtn, '->', {
                xtype: 'button',
                text: 'Обновить',
                iconCls: 'x-tbar-loading',
                handler: function() {
                    this.getStore().reload();
                },
                scope: this
            }]
        });
        
        Catalog.Settings.List.superclass.initComponent.apply(this, arguments);
        
        new Ext.Window({
            title: this.windowTitle,
            layout: 'fit',
            width: 600,
            height: 400,
            modal: true,
            items: [this]
        }).show();
        
    },
    
    onAdd: function(b, e) {
        
        var formPanel = new Catalog.Settings.Form({
            entity: this.entity
        });
        
        formPanel.getForm().on('saved', function() {
            this.getStore().reload();
        }, this);
    },
    
    onUpdate: function(g, rowIndex) {
        
        var record = g.getStore().getAt(rowIndex);
        var id = parseInt(record.get('id'));
        
        var formPanel = new Catalog.Settings.Form({
            itemId: id,
            entity: this.entity
        });
        
        formPanel.getForm().loadRecord(record);
        
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
                    id: id,
                    entity: this.entity
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