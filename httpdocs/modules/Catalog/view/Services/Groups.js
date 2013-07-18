Ext.define('EC.Catalog.view.Services.Groups', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ServicesGroups',
    
    layout: 'fit',
    
    forceFit: true,
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    enableColumnResize: false,
    
    store: 'EC.Catalog.store.Services.Groups',
    
    permissions: false,
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
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
            header: 'Группы услуг',
            dataIndex: 'name',
            sortable: false,
            resizable: false,
            flex: 1
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            sortable: false,
            resizable: false,
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить группу',
            iconCls: 'add',
            hidden: !this.permissions,
            action: 'additem'
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }]
        
        this.callParent(arguments);
    }
});