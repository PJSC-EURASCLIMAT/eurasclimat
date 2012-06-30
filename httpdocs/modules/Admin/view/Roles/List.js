Ext.define('EC.Admin.view.Roles.List', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.AdminRolesList'],
    
    store: 'EC.Admin.store.Roles',
    
    layout: 'fit',
    
    border: false,
    
    rootVisible: false,
    
    useArrows: true,
    
    allowEditing: true,
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'treecolumn',
            header: 'Роль',
            dataIndex: 'name',
            flex: 1,
            editor: this.allowEditing && acl.isUpdate('admin') ? {
                xtype: 'textfield',
                allowBlank: false
            } : null
        }]; 
        
        if (this.allowEditing) {
            
            var actions = [];
            
            if (acl.isUpdate('admin')) {
                
                this.Editing = Ext.create('Ext.grid.plugin.CellEditing');
                
                this.plugins = [this.Editing];
                
                this.viewConfig = {
                    plugins: {
                        ptype: 'treeviewdragdrop'
                    }
                };
                
                actions.push({
                    iconCls: 'icon-edit',
                    icon: '/images/icons/fam/plugin.gif',
                    tooltip: 'Редактировать'
                });
            }
            
            if (acl.isDelete('admin')) {
                
                actions.push({
                    iconCls: 'icon-delete',
                    icon: '/images/icons/fam/delete.gif',
                    tooltip: 'Удалить'
                });
            }
                        
            this.columns.push({
                xtype: 'actioncolumn',
                width: 40,
                items: [actions]
            });
            
            this.tbar = [{
                xtype: 'button',
                iconCls: 'add',
                text: 'Добавить',
                tooltip: 'Добавить',
                action: 'add',
                disabled: !acl.isAdd('admin')
            }, '->', {
                xtype: 'button',
                iconCls: 'x-tbar-loading',
                text: 'Обновить',
                tooltip: 'Обновить',
                action: 'refresh'
            }];
        }
        
        this.callParent(arguments);
    }
});