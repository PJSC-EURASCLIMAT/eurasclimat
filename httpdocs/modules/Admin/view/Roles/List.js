Ext.define('EC.Admin.view.Roles.List', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.AdminRolesList'],
    
    store: 'EC.Admin.store.Roles',
    
    layout: 'fit',
    
    border: false,
    
    rootVisible: false,
    
    useArrows: true,
    
    initComponent: function() {
        
        this.Editing = Ext.create('Ext.grid.plugin.CellEditing');
        
        this.plugins = [this.Editing];
        
        this.columns = [{
            xtype: 'treecolumn',
            header: 'Роль',
            dataIndex: 'name',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            xtype: 'actioncolumn',
            width: 40,
            items: [{
                iconCls: 'icon-edit',
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать'
            }, {
                iconCls: 'icon-delete',
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить'
            }]
        }];
        
        this.tbar = [{
            xtype: 'button',
            iconCls: 'add',
            text: 'Добавить',
            tooltip: 'Добавить',
            action: 'add'
        }, '->', {
            xtype: 'button',
            iconCls: 'x-tbar-loading',
            text: 'Обновить',
            tooltip: 'Обновить',
            action: 'refresh'
        }]
        
        this.callParent(arguments);
    }
});