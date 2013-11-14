Ext.define('EC.Catalog.view.RelatedServices.List', {
    
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.CatalogRelatedServices',

    title: 'Сопутствующие услуги',
    
    store: 'EC.Catalog.store.RelatedServices',
	
    autoScroll: true,

    border: false,
    
    allowEdit: false,
    
    layout: 'fit',
    
    monitorResize: true,
    
    catalogId: null,
    
    catalog: null,
    
    initComponent: function() {

        if (Ext.isEmpty(this.catalog)) {
            throw 'catalog must not be empty!';
        }
        
        this.tbar = new Ext.Toolbar({
            items: [{
                text: 'Добавить',
                tooltip: 'Добавить услугу',
                iconCls: 'add',
                action: 'add',
                hidden: !this.allowEdit,
                scope: this
            }, '->', {
                xtype: 'button',
                tooltip: 'Обновить',
                iconCls: 'x-tbar-loading',
                action: 'refresh'
            }]
        });
        
        var actions = [];
        
        if (this.allowEdit) {
            
            actions.push({
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать услугу',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('editservice', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
            actions.push({
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить услугу',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteservice', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
        }
        
        this.columns = [{
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Срок выполнения',
            dataIndex: 'term',
            width: 300
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 100
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            hideable: false,
            menuDisabled: true,
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.callParent(arguments);
    }
});