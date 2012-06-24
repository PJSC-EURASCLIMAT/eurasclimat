Ext.define('EC.Admin.view.Accounts.List', {

    extend: 'Ext.grid.Panel',
    
    alias: ['widget.AdminAccountsList'],
    
    store: 'EC.Admin.store.Accounts',
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
        
        this.Editing = Ext.create('Ext.grid.plugin.RowEditing', {errorSummary: false});
        
        this.plugins = [this.Editing];
        
        this.columns = [{
            header: 'Логин',
            dataIndex: 'login',
            editor: {
                xtype: 'textfield',
                minLength: 3,
                allowBlank: false
            }
        }, {
            header: 'Имя',
            dataIndex: 'name',
            flex: .5,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            header: 'Email',
            dataIndex: 'email',
            flex: .2,
            editor: {
                xtype: 'textfield',
                vtype: 'email',
                allowBlank: false
            }
        }, {
            header: 'Роли',
            dataIndex: 'roles',
            flex: .5,
            renderer: function(value) {
                if (Ext.isArray(value)) {
                    var roles = [];
                    Ext.each(value, function(v) {
                        roles.push(v.name);
                    });
                    return roles.join(', ');
                } else {
                    return value;
                }
            }
        }, {
            header: 'Активный',
            dataIndex: 'active',
            align: 'center',
            width: 80,
            renderer: function(value) {
                return 1 == value ? 'Да' : 'Нет';
            },
            editor: {
                xtype: 'checkbox',
                inputValue: 1
            }
        }, {
            xtype: 'actioncolumn',
            width: 80,
            items: [{
                iconCls: 'x-btn icon-edit',
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать'
            }, {
                iconCls: 'x-btn icon-password',
                icon: '/images/icons/fam/connect.gif',
                tooltip: 'Сменить пароль'
            }, {
                iconCls: 'x-btn icon-roles',
                icon: '/images/icons/fam/user_suit.gif',
                tooltip: 'Установить роли'
            }, {
                iconCls: 'x-btn icon-delete',
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
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});