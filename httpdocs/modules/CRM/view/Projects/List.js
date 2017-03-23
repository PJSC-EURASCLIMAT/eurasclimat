Ext.define('EC.CRM.view.Projects.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ProjectsList',
    
    layout: 'fit',
    
    //title: 'Заказы-проекты',
    
    frame: true,
    
    border: false,
    
    store: 'EC.CRM.store.Projects.Projects',
    
    permissions: null,
    
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
        }

        if (acl.isUpdate('admin')) {
            
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
        	header: 'Группа',
            dataIndex: 'group_name'
        }, {
            text: 'Формирование',
            columns: [{
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Подготовка',
                dataIndex: 'preparation',
                renderer: function(value, metaData, record) {
                    if ('preparation' === record.get('stage')) {
                        metaData.style = 'background-color: lightgreen;';
                    }
                    return Ext.util.Format.date(value, 'd.m.Y');
                }
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Согласование',
                dataIndex: 'coordination',
                renderer: function(value, metaData, record) {
                    if ('coordination' === record.get('stage')) {
                        metaData.style = 'background-color: lightgreen;';
                    }
                    return Ext.util.Format.date(value, 'd.m.Y');
                }
            }]
        }, {
            text: 'Исполнение',
            columns: [{
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Выполнение',
                dataIndex: 'execution',
                renderer: function(value, metaData, record) {
                    if ('execution' === record.get('stage')) {
                        metaData.style = 'background-color: lightgreen;';
                    }
                    return Ext.util.Format.date(value, 'd.m.Y');
                }
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y',
                text: 'Внедрение',
                dataIndex: 'implementation',
                renderer: function(value, metaData, record) {
                    if ('implementation' === record.get('stage')) {
                        metaData.style = 'background-color: lightgreen;';
                    }
                    return Ext.util.Format.date(value, 'd.m.Y');
                }
            }]
        }, {
            xtype: 'templatecolumn',
            header: 'Создатель проекта',
            tpl: '<a href="#/profile/{creator_id}/show">{creator_name}</a>',
            dataIndex: 'creator_name',
            width: 200
        }, {
            xtype: 'datecolumn',
            header: 'Дата создания',
            dataIndex: 'created_date',
            format: 'd.m.Y H:i',
            width: 100
        }, {
            xtype: 'actioncolumn',
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