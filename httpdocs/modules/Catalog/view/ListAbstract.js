Ext.define('EC.Catalog.view.ListAbstract', {

    extend: 'Ext.grid.Panel',
    
    alias: 'widget.CatalogListAbstract',
    
    requires: [
        'xlib.grid.FiltersFeature',
        'Ext.ux.PagingToolbarResizer',
        'Ext.ux.ProgressBarPager'
    ],
   
    layout: 'fit',
    
    entity: null,
    
    listURL: null,
    
    updatePermission: acl.isUpdate('catalog'),
    
    features: [{ftype: 'filters', encode: true, showMenu: false}],
    
    initComponent: function() {
        
        this.store = Ext.create('EC.Catalog.store.ListAbstract', {
            listURL: this.listURL
        });
        
        this.tools = [{
            type: 'plus',
            tooltip: 'Добавить позицию',
            action: 'additem',
            hidden: !this.updatePermission
        }, {
            type: 'refresh',
            tooltip: 'Обновить список',
            action: 'refresh'
        }];

        var actions = [];
        
        if (this.updatePermission) {
            
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
        }
        
        this.columns = [{
            header: 'Марка',
            dataIndex: 'mark_id',
            width: 150,
            renderer: function(value, metaData, record) {
                return record.get('mark_name');
            },
            filter: {
                type: 'numeric'
            }
        }, {
            xtype: 'templatecolumn',
            tpl: '<a href="#/catalog/' + this.entity + '/{id}">{name}</a>',
            header: 'Наименование',
            tooltip: 'Брендовое наименование модели (серии)',
            flex: 1,
            dataIndex: 'name',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Цена',
            align: 'right',
            width: 100,
            dataIndex: 'price',
            renderer: xlib.formatCurrencyNoSign,
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Валюта',
            width: 60,
            dataIndex: 'currency_id',
            renderer: function(value) {
                return value == '0' ? '' : this.comboRenderer('EC.Catalog.store.Currency', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            hideable: false,
            menuDisabled: true,
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            plugins: [{ptype: 'pagingtoolbarresizer'}]
        });
        
        this.callParent(arguments);
        
//        Ext.defer(function() {
//            this.getStore().load();
//        }, 1000, this);
    },
    
    comboRenderer: function(storeName, value) {
        var store = Ext.getStore(storeName);
        var idx = store.find('id', value);
        if (idx == -1) return value;
        var rec = store.getAt(idx);
        return rec.get('name');
    }
});