Ext.define('EC.Catalog.controller.Services', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Services.Groups',
        'EC.Catalog.store.Services.List'
    ],
    
    models: [
        'EC.Catalog.model.Services.Groups',
        'EC.Catalog.model.Services.List'
    ],
    
    views: [
        'EC.Catalog.view.Services.PortletLayout',
        'EC.Catalog.view.Services.Layout',
        'EC.Catalog.view.Services.Groups',
        'EC.Catalog.view.Services.List'
    ],
    
    groupID: null,
    
    permissions: acl.isUpdate('catalog', 'services'),
    
    addGroupURL: '/json/catalog/services-groups/add',
    
    editGroupURL: '/json/catalog/services-groups/update',
    
    deleteGroupURL: '/json/catalog/services-groups/delete',
    
    addURL: '/json/catalog/services/add',
    
    editURL: '/json/catalog/services/update',
    
    deleteURL: '/json/catalog/services/delete',
    
    run: function(container) {

        this.Container = container; 
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet')); 
        
        if (isPortlet) {
            var content = container.add(Ext.create('EC.Catalog.view.Services.PortletLayout', {
                permissions: this.permissions
            }));
        } else { 
            var content = container.add(Ext.create('EC.Catalog.view.Services.Layout', {
                permissions: this.permissions
            }));
        }
        
        var groupsPanel = content.down('ServicesGroups'),
            groupsStore = groupsPanel.getStore(),
            servicesPanel = content.down('ServicesList');
        
        if (isPortlet) {
            groupsPanel.on('itemdblclick', function(panel, record) {
                this.groupID = record.get('id');
                var MC = this.getController('App.controller.Main');
                MC.openModuleTab(this.Container);
            }, this);
        }
        
        if (!Ext.isEmpty(this.groupID)) {
            
            if (groupsStore.getTotalCount() > 0) {
                this.selectGroup(groupsStore, groupsPanel);
            }
            
            groupsStore.on('load', function() {
                this.selectGroup(groupsStore, groupsPanel);
            }, this)
        }
        
        groupsPanel.on('select', function(selModel, record, index, eOpts) {
            this.showList(record.get('id'));
        }, this);
            
        groupsPanel.down('button[action=refresh]').on({
            click: function() {
                groupsStore.load();
            },
            scope: this
        });
        
        if (!isPortlet) {
            
            var servicesStore = servicesPanel.getStore();
            
            servicesPanel.down('button[action=refresh]').on({
                click: function() {
                    this.showList(this.groupID, servicesPanel);
                },
                scope: this
            });
        }
        
        if (this.permissions) {
            
            /* Groups section */
            
            groupsPanel.down('button[action=additem]').on({
                click: this.addGroup,
                scope: this
            });
            
            groupsPanel.on({
                edititem: this.editGroup,
                deleteitem: this.deleteGroup,
                scope: this
            });
            
            this.on({
                'groupSaved': function() {
                    groupsStore.load();
                },
                scope: this
            }, this);
            
            /* Services section */

            if (!isPortlet) {
                
                servicesPanel.down('button[action=additem]').on({
                    click: this.addItem,
                    scope: this
                });
                
                servicesPanel.on({
                    edititem: this.editItem,
                    deleteitem: this.deleteItem,
                    scope: this
                });
                
                this.on({
                    'itemSaved': function() {
                        this.showList(this.groupID, servicesPanel);
                    },
                    scope: this
                }, this);
            }

        }
    },
    
    /* Common section */
    
    showList: function(id, container) {
        this.groupID = id;
        if (container) {
            container.getStore().load({params: {
                filter: Ext.encode([{
                    type: 'numeric', 
                    comparison: 'eq', 
                    value: id, 
                    field: 'group_id'
                }])
            }});
        }
    },
    
    selectGroup: function(store, panel) {
        
        var record = store.getById(this.groupID);
        if (record) {
            panel.getSelectionModel().select(record);
        }
    },
    
    /* Groups section */
    
    addGroup: function() {
        
        var view = Ext.create('EC.Catalog.view.Services.AddGroup');
        view.down('button[action=save]').on({
            click: function() {
                this.updateGroup(view, this.addGroupURL);
            },
            scope: this
        });
    },
    
    editGroup: function(grid, record) {
        
        var view = Ext.create('EC.Catalog.view.Services.EditGroup');
        view.down('button[action=save]').on({
            click: function() {
                this.updateGroup(view, this.editGroupURL);
            },
            scope: this
        });
        
        var form = view.down('form');
        form.loadRecord(record);
    },
    
    deleteGroup: function(grid, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteGroupURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    },
    
    updateGroup: function(view, URL) {
        
        var form = view.down('form');
        
        form.submit({
            url: URL,
            success: function(form, action) {
                view.close();
                this.fireEvent('groupSaved');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
               }
            },
            scope: this
        });
    },
    
    /* Services section */
   
    addItem: function() {
        
        if (Ext.isEmpty(this.groupID)) {
            Ext.Msg.alert('Ошибка', 'Выберите группу для добавления услуги.');
            return;
        }
        
        var view = Ext.create('EC.Catalog.view.Services.Add', {groupID: this.groupID});
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.addURL);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.create('EC.Catalog.view.Services.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.editURL);
            },
            scope: this
        });
        
        var form = view.down('form');
        form.loadRecord(record);
    },
    
    updateItem: function(view, URL) {
        
        var form = view.down('form');
        
        form.submit({
            url: URL,
            success: function(form, action) {
                view.close();
                this.fireEvent('itemSaved');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
               }
            },
            scope: this
        });
    },
    
    deleteItem: function(grid, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    }
});