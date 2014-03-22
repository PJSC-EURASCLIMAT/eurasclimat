Ext.define('EC.CRM.view.Demoprojects.PortletList', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.DemoprojectsPortletList',
    
    layout: 'fit',
    
    store: 'EC.CRM.store.Demoprojects.Projects',
    
    permissions: acl.isUpdate('crm', 'demoprojects'),
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    requires: [
        'Ext.grid.feature.Grouping'
    ],
    
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name} ({children.length})',
        hideGroupedHeader: true,
        id: 'DemoprojectsGrouping'
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
            xtype: 'templatecolumn',
            header: 'Создатель проекта',
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