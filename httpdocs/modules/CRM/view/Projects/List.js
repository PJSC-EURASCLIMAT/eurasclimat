Ext.define('EC.CRM.view.Projects.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ProjectsList',
    
    layout: 'fit',
    
    store: 'EC.CRM.store.Projects.Projects',
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    columnLines: true,
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    requires: [
        'Ext.grid.feature.Grouping'
    ],
    
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name} ({children.length})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'ProjectsGrouping'
    }],
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/edit.png',
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
            header: 'Проект',
            dataIndex: 'name',
            flex: .5
        }, {
            text: 'Формирование',
            columns: [{
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Подготовка',
                dataIndex: 'preparation'
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Согласование',
                dataIndex: 'coordination'
            }]
        }, {
            text: 'Исполнение',
            columns: [{
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Выполнение',
                dataIndex: 'execution'
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Внедрение',
                dataIndex: 'implementation'
            }]
        }, {
            header: 'Менеджер проекта',
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
        }, {
            xtype: 'button',
            text: 'Список групп',
            icon: '/images/icons/fam/plugin.gif',
            iconCls: 'x-btn',
            hidden: !this.permissions,
            action: 'groupslist'
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }]
        
        this.callParent(arguments);
    }
});