Ext.define('EC.Catalog.view.ListAbstract', {

    extend: 'Ext.grid.Panel',
    
    requires: ['xlib.grid.FiltersFeature'],
   
    layout: 'fit',
    
    title: 'Результаты выборки',

    updatePermission: true,
    
    features: [{ftype: 'filters', encode: true, showMenu: false}],
    
    rowBodyTpl: '',
    
    constructor: function() {
        
        this.tools = [{
            type: 'plus',
            tooltip: 'Добавить позицию',
            action: 'additem',
            hidden: !this.updatePermission
        }, {
            type: 'refresh',
            tooltip: 'Обновить список',
            action: 'refresh'
        }],
        
        this.plugins = [{
            ptype: 'rowexpander',
            rowBodyTpl: Ext.create('Ext.XTemplate', this.rowBodyTpl, 
                {r: Ext.bind(this.comboRenderer, this)})
        }];
        
        this.callParent(arguments);
    
    },
    
    initComponent: function() {

        var actions = [];
        
        actions.push({
            icon: '/images/icons/catalog.png',
            tooltip: 'Карточка товара',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                this.fireEvent('showitem', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
        });
        
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
        
        this.columns.push({
            xtype: 'actioncolumn',
            sortable: false,
            hideable: false,
            menuDisabled: true,
            width: parseInt(actions.length) * 20,
            items: actions
        });
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
        
        Ext.defer(function() {
            this.getStore().load();
        }, 1000, this);
    },
    
    comboRenderer: function(storeName, value) {
        var store = Ext.getStore(storeName);
        var idx = store.find('id', value);
        if (idx == -1) return value;
        var rec = store.getAt(idx);
        return rec.get('name');
    }
});