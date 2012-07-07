Ext.define('EC.Catalog.view.Watersupply.List', {

    extend: 'Ext.grid.Panel',
    
    requires: [
        'xlib.RowExpander',
        'xlib.grid.FiltersFeature'
    ],
   
    alias: ['widget.WatersupplyList'],
    
    store: 'EC.Catalog.store.Watersupply',
    
    layout: 'fit',
    
    forceFit: true,
    
    title: 'Результаты выборки',
    
    tools: [{
        type: 'expand',
        tooltip: 'Раскрыть/закрыть все строки',
        action: 'expandrows'
    }, {
        type: 'plus',
        tooltip: 'Добавить позицию',
        action: 'additem',
        hidden: !acl.isUpdate('catalog', 'watersupply')
    }, {
        type: 'refresh',
        tooltip: 'Обновить список',
        action: 'refresh'
    }],
    
    features: [{ftype: 'filters', encode: true, showMenu: false}],
    
    constructor: function() {
        
        this.plugins = [{
            ptype: 'rowexpander',
            pluginId: 'rowexpander',
            rowBodyTpl: Ext.create('Ext.XTemplate', 
                '<div style="padding: 10px;"><table width="100%" border="0">',
                '<tr valign="top">',
                '<td rowspan="2" width="320"><img src="http://placehold.it/300x220"/></td>',
                '<td height="40"><h1><p>',
                '{[this.r("WatersupplyFilterMark", values.mark_id)]} {marking}',
                '</p></h1></td>',
                '</tr><tr valign="top"><td>',
                '<p>Группа оборудования: <b>',
                '{[this.r("WatersupplyFilterGroup", values.group_id)]}',
                '</b></p>',
                '</td></tr></table></div>', 
                {r: Ext.bind(this.comboRenderer, this)}
            )
        }]
        
        this.callParent(arguments);
    
    },
    
    initComponent: function() {

        var actions = [];
        
        if (acl.isUpdate('catalog', 'watersupply')) {
            
            actions = [{
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            }, {
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
                
            }];
        }
        
        this.columns = [{
            header: 'Группа оборудования',
            //flex: 1,
            dataIndex: 'group_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterGroup', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Марка',
            dataIndex: 'mark_id',
            renderer: function(value) {
                return this.comboRenderer('WatersupplyFilterMark', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Маркировка',
            dataIndex: 'marking',
            filter: {
                type: 'string'
            }
        }, {
            xtype:'actioncolumn',
            width: 40,
            items: actions
        }];

        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
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