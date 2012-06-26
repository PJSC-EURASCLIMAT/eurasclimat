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
        
        this.Editing = Ext.create('Ext.grid.plugin.CellEditing');
        
        this.plugins = [this.Editing];
        
        this.columns = [{
            xtype: 'treecolumn',
            header: 'Роль',
            dataIndex: 'name',
            flex: 1,
            editor: !this.allowEditing ? null : {
                xtype: 'textfield',
                allowBlank: false
            }
        }]; 
        
        if (this.allowEditing) {
            
            this.columns.push({
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
            });
            
            this.viewConfig = {
                plugins: {
                    ptype: 'treeviewdragdrop'
                }
            };
    
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
            }];
        }
        
        this.callParent(arguments);
    }
});