Ext.define('EC.Admin.controller.Accounts', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Admin.store.Accounts',
        'EC.Admin.store.AccountRoles'
    ],
    
    models: [
        'EC.Admin.model.Accounts',
        'EC.Admin.model.AccountRoles'
    ],

    views: [
        'EC.Admin.view.Accounts.Portlet',
        'EC.Admin.view.Accounts.Password',
        'EC.Admin.view.Accounts.Roles',
        'EC.Admin.view.Accounts.List'
    ],
    
    init: function(container) {
        
        if ('portlet' == container.getXType()) {
            
            var gridpanel = container.add({
                xtype: 'AdminAccountsPortlet',
                preventHeader: true,
                border: false
            });
            
        } else {
        
            container.setLoading('Загрузка...', true);
            
            var gridpanel = container.add({
                xtype: 'AdminAccountsList',
                preventHeader: true,
                border: false,
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
            
            // For update sync 
            gridpanel.Editing.on('edit', function(editor, e, eOpts) {
                e.grid.getStore().sync();
            });
            
            gridpanel.down('button[action=add]').on('click', this.onAddItem); 
            gridpanel.down('button[action=refresh]').on('click', function() {
                gridpanel.getStore().load();
            }); 
            gridpanel.down('actioncolumn').on('click', this.onActionClick, this); 
        }
        
        gridpanel.getStore().load();
    },
    
    onAddItem: function(button, e, options) {

        var gridpanel = button.up('AdminAccountsList'),
            view = gridpanel.getView(),
            store = gridpanel.getStore(),
            record = Ext.create('EC.Admin.model.Accounts', {}), column;

        store.insert(0, record);
        
        Ext.each(view.getGridColumns(), function(o) {
            if (o.dataIndex == 'login') {
                column = o;
                return false;
            }
        });
        
        gridpanel.Editing.on('canceledit', function() {
            store.rejectChanges();
        }, this, {single: true});
        
        gridpanel.Editing.startEdit(record, column); 
    },
    
    onActionClick: function(view, cell, rowIndex, colIndex, e, record, row, options) {
        
        var t = e.getTarget().className.match(/\icon-(\w+)\b/);
        if (!t) {
            return;
        }
        var action = t[1];
        
        switch (action) {
            case 'edit': 
                this.onEditItem.apply(this, arguments);
                break;
            case 'password':
                this.onChangePassword.apply(this, arguments);
                break;
            case 'roles':
                this.onChangeRoles.apply(this, arguments);
                break;
            case 'delete':
                this.onDeleteItem.apply(this, arguments);
                break;
        }
    },
    
    onEditItem: function(view, cell, rowIndex, colIndex, e, record, row, options) {
        
        var column;
        Ext.each(view.getGridColumns(), function(o) {
            if (o.dataIndex == 'name') {
                column = o;
                return false;
            }
        });
        
        // options.scope = treepanel
        options.scope.Editing.startEdit(record, column);
    },
    
    onChangePassword: function(view, cell, rowIndex, colIndex, e, record, row, options) {
        
        var win = Ext.create('EC.Admin.view.Accounts.Password', {
            record: record,
            title: 'Установка пароля учётной записи "' + record.get('login') + '"'
        });
        win.down('button[action=save]').on({
            click: function() {
                this.updatePassword(win);
            },
            scope: this
        });
    },
    
    updatePassword: function(win) {
        var form = win.down('form');
        form.submit({
            url: '/json/admin/accounts/change-password',
            params: {
                id: win.record.get('id')
            },
            success: function(form, action) {
                win.record.set('password_set', 1);
                win.record.commit();
                win.close();
                Ext.Msg.alert('Сообщение', 'Новый пароль установлен.');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером!');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
               }
            },
            scope: this
        });
    },
    
    onChangeRoles: function(view, cell, rowIndex, colIndex, e, record, row, options) {
        
        var win = Ext.widget('AdminAccountRoles', {
            title: 'Роли учётной записи "' + record.get('login') + '"'
        });
        
        win.down('button[action=save]').on({
            click: function() {
                this.updateRoles(win, record);
            },
            scope: this
        });
        
        win.down('button[action=cancel]').on({
            click: function() {
                win.close();
            }
        });
        
        win.on('show', function() {
            this.loadRoles(win, record);
        }, this);
        
        win.show();
    },
    
    loadRoles: function(win, record) {
        
        var setChecks = function(tree, roles) {
    
            var tree = win.down('treepanel'), 
                f = function(node) {
                node.set('checked', false);
                node.expand();
                Ext.each(roles, function(r) {
                    if (node.get('id') == r.id) {
                        node.set('checked', true);
                        return false;
                    }
                });
                node.eachChild(f);
            }; 
                
            tree.getRootNode().eachChild(f);
            win.setLoading(false);
        }
        
        win.setLoading('Загрузка...');
        Ext.Function.defer(setChecks, 500, this, [win, record.get('roles')]);
    },
    
    updateRoles: function(win, record) {
        
        var tree = win.down('treepanel'),
            data = tree.getChecked(),
            failure = function() {
                Ext.Msg.alert('Ошибка', 'Ошибка при установке ролей!');
            },
            roles = [];
            
        Ext.each(data, function(r) {
            roles.push({id: r.get('id'), name: r.get('name')});
        });
        
        Ext.Ajax.request({
            params: {
                id: record.get('id'),
                roles: Ext.encode(roles)
            },
            url: '/json/admin/accounts/set-roles',
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                record.set('roles', roles);
                record.commit();
                win.close();
                Ext.Msg.alert('Сообщение', 'Роли успешно установлены.');
            },
            failure: failure,
            scope: this
        });
    },
    
    onDeleteItem: function(view, cell, rowIndex, colIndex, e, record, row, options) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить учетную запись?', function(b) {
            if ('yes' === b) {
                var store = view.getStore();
                store.remove(record);
                store.sync();
            }
        });
    }    
});