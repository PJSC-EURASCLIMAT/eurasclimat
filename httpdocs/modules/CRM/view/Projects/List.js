Ext.define('EC.CRM.view.Projects.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ProjectsList',
    
    layout: 'fit',
    
    store: 'EC.CRM.store.Projects',
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/fam/cog.gif',
                tooltip: 'Конфигурировать проект',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('configure', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
            actions.push({
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать проект',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
            actions.push({
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить проект',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
                
            });
        }
        
        this.columns = [{
            header: 'Имя проекта',
            dataIndex: 'name',
            flex: .5
        }, {
            header: 'Инициатор',
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