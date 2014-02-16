Ext.define('EC.CRM.view.Calcpd.MainList', {

    extend: 'Ext.grid.Panel',

    layout: 'fit',
    
    store: 'EC.CRM.store.Calcpd.Main',
    
    initComponent: function() {
        
        var actions = [];
        
        actions.push({
            icon: '/images/icons/edit.png',
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
        
        this.columns = [{
            header: 'Имя',
            dataIndex: 'name',
            flex: .5
        }, {
            xtype: 'templatecolumn',
            header: 'Создал',
            tpl: '<a href="#/profile/{creator_id}/show">{creator_name}</a>',
            dataIndex: 'creator_name',
            flex: .5
        }, {
            xtype: 'datecolumn',
            header: 'Дата создания',
            dataIndex: 'created_date',
            format: 'd.m.Y H:i',
            width: 100
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Создать проект',
            iconCls: 'add',
            action: 'additem'
        }, {
            xtype: 'button',
            text: 'Настройки',
            icon: '/images/icons/fam/plugin.gif',
            iconCls: 'x-btn',
            action: 'config'
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }]
        
        this.callParent(arguments);
    }
});