Ext.define('EC.CRM.view.Calcsmr.MainList', {

    extend: 'Ext.grid.Panel',

    layout: 'fit',
    
    store: 'EC.CRM.store.Calcsmr.Main',
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    sortableColumns: false,
    
    permission: false,
    
    initComponent: function() {
        
        var actions = [];
        
        actions.push({
            icon: '/images/icons/inbox.png',
            tooltip: 'Открыть проект',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                this.fireEvent('openproject', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
        });
        
        if (this.permission) {
            
            actions.push({
                icon: '/images/icons/edit.png',
                tooltip: 'Настройки проекта',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
            actions.push({
                icon: '/images/icons/move.gif',
                tooltip: 'Скопировать проект',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('copyproject', grid, grid.getStore().getAt(rowIndex));
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
            xtype: 'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }, {
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            xtype: 'templatecolumn',
            header: 'Создал',
            tpl: '<a href="#/profile/{account_id}/show">{account_name}</a>',
            dataIndex: 'account_name',
            width: 300
        }, {
            xtype: 'datecolumn',
            header: 'Дата создания',
            dataIndex: 'date',
            format: 'd.m.Y H:i',
            width: 100
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Создать проект',
            iconCls: 'add',
            action: 'additem',
            disabled: !this.permission
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 25,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});