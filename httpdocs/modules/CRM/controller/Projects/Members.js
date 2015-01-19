Ext.define('EC.CRM.controller.Projects.Members', {
    
    extend: 'Ext.app.Controller',
    
    stores: ['EC.CRM.store.Projects.Members'],
    
    models: ['EC.CRM.model.Projects.Members'],
    
    views: ['EC.CRM.view.Projects.Members'],
    
    uses: [
        'xlib.AccountsCombo'
    ],
    
    addURL: '/json/crm/projects/add-member',
    
    deleteURL: '/json/crm/projects/delete-member',
    
    editURL: '/json/crm/projects/edit-member',
    
    projectID: null,
    
    permissions: acl.isUpdate('projects'),
    
    run: function(container) {

        this.Container = container; 
        
        var membersPanel = container.add(Ext.create('EC.CRM.view.Projects.Members', {
            permissions: this.permissions,
            projectID: this.projectID
        }));
        
        membersPanel.down('button[action=refresh]').on('click', this.loadStore, this);
        
        if (this.permissions) {
        
            membersPanel.on('deleteitem', this.onDelete, this);
            
            Ext.each(membersPanel.query('checkcolumn'), function(item) {
                item.on('checkchange', this.onEdit, this);
            }, this);
                
            
            var addButtons = membersPanel.query('menuitem');
            Ext.each(addButtons, function(item) {
                item.on({
                    click: function(b) {
                        this.onAdd(b.role);
                    },
                    scope: this
                });
            }, this);
            
        } else {
        	
        	Ext.each(membersPanel.query('checkcolumn'), function(item) {
        		item.on('beforecheckchange', function() {
        			return false;
        		});
        	}, this);
        }
        
        this.loadStore();
    },
    
    loadStore: function() {
        this.Container.down('#ProjectsMembersPanel').getStore().load({
            params: {project_id: this.projectID}
        });
    },
    
    onAdd: function(role) {
        
        var win = Ext.create('Ext.window.Window', {
            autoShow: true,
            modal: true,
            border: false,
            width: 400,
            title: 'Добавить участника',
            layout: 'fit',
            items: [{
                xtype: 'AccountsCombo',
                anchor: '100%',
                hideLabel: true
            }],
            buttons: ['->', {
                text: 'Добавить',
                handler: function() {
                    this.saveData(win.down('combo').getValue(), role);
                    win.close();
                },
                scope: this
            }],
            scope: this
        });
        
    },
    
    saveData: function(account_id, role) {
        
        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
        }
        
        Ext.Ajax.request({
            params: {
                project_id: this.projectID,
                account_id: account_id,
                role: role
            },
            url: this.addURL,
            success: function(response, opts) {
                try {
                    var r = Ext.decode(response.responseText);
                    if (!r.success) {
                        return failureFn(arguments);
                    }
                } catch(e) {
                    return failureFn(arguments);
                }
                this.loadStore();
            },
            failure: failureFn,
            scope: this
        });
    },
    
    onDelete: function(id) {
        
        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить участника?', function(b) {
            
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {id: id},
                    url: this.deleteURL,
                    success: function(response, opts) {
                        try {
                            var r = Ext.decode(response.responseText);
                            if (!r.success) {
                                return failureFn(arguments);
                            }
                        } catch(e) {
                            return failureFn(arguments);
                        }
                        this.loadStore();
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    },
    
    onEdit: function(checkColumn, recordIndex, checked, record, dataIndex) {
        
        var failure = function() {
            record.reject();
            Ext.Msg.alert('Ошибка', 'Ошибка при установке свойства!');
        };
        
        Ext.Ajax.request({
            params: {
                id: record.get('id'),
                value: checked
            },
            url: this.editURL,
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                record.commit();
            },
            failure: failure,
            scope: this
        });
    }
});