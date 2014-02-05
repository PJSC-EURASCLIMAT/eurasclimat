Ext.define('EC.Admin.view.Accounts.List', {

    extend: 'Ext.grid.Panel',
    
    alias: ['widget.AdminAccountsList'],

    store: 'EC.Admin.store.Accounts',
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
        
        var actions = [];
        
        if (acl.isUpdate('admin')) {
        
            this.Editing = Ext.create('Ext.grid.plugin.RowEditing', {errorSummary: false});
            
            this.plugins = [this.Editing];
            
            actions.push({
                iconCls: 'x-btn icon-edit',
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать'
            });
            
            actions.push({
                iconCls: 'x-btn icon-password',
                icon: '/images/icons/fam/connect.gif',
                tooltip: 'Сменить пароль'
            });
            
            actions.push({
                iconCls: 'x-btn icon-roles',
                icon: '/images/icons/fam/user_suit.gif',
                tooltip: 'Установить роли'
            });
            
            actions.push({
                iconCls: 'x-btn icon-delete',
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить'
            });
        }
        
        this.columns = [{
            header: 'Логин',
            dataIndex: 'login',
            flex: 1,
            editor: {
                xtype: 'textfield',
                vtype: 'email',
                allowBlank: false
            }
        }, {
            header: 'Имя',
            dataIndex: 'name',
            xtype: 'templatecolumn',
            tpl: '<a href="#/profile/{id}/show">{name}</a>',
            width: 200,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
//        {
//            header: 'Email',
//            dataIndex: 'email',
//            width: 200,
//            editor: {
//                xtype: 'textfield',
//                vtype: 'email',
//                allowBlank: false
//            }
//        },
            {
            header: 'Роли',
            dataIndex: 'roles',
            flex: 1,
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
            header: 'Пароль установлен',
            dataIndex: 'password_set',
            align: 'center',
            width: 120,
            renderer: function(value) {
                return 1 == value ? 'Да' : 'Нет';
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
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            iconCls: 'add',
            text: 'Добавить',
            tooltip: 'Добавить',
            action: 'add',
            disabled: !acl.isUpdate('admin')
        }, '->', {
            xtype: 'button',
            iconCls: 'x-tbar-loading',
            text: 'Обновить',
            tooltip: 'Обновить',
            action: 'refresh'
        }]
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 25,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});