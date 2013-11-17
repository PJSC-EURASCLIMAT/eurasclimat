Ext.define('EC.Catalog.controller.SpecialServices', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.SpecialServices.Groups',
        'EC.Catalog.store.SpecialServices.List',
        'EC.Catalog.store.SpecialServices.RelatedExpendables'
    ],
    
    models: [
        'EC.Catalog.model.SpecialServices.Groups',
        'EC.Catalog.model.SpecialServices.List',
        'EC.Catalog.model.SpecialServices.RelatedExpendables'
    ],
    
    views: [
        'EC.Catalog.view.SpecialServices.PortletLayout',
        'EC.Catalog.view.SpecialServices.Layout',
        'EC.Catalog.view.SpecialServices.Groups',
        'EC.Catalog.view.SpecialServices.List',
        'EC.Catalog.view.SpecialServices.RelatedExpendables'
    ],
    
    groupID: null,
    
    permissions: acl.isUpdate('catalog', 'specialservices'),
    
    addGroupURL: '/json/catalog/special-services-groups/add',
    
    editGroupURL: '/json/catalog/special-services-groups/update',
    
    deleteGroupURL: '/json/catalog/special-services-groups/delete',
    
    addURL: '/json/catalog/special-services/add',
    
    editURL: '/json/catalog/special-services/update',
    
    deleteURL: '/json/catalog/special-services/delete',
    
    run: function(container) {

        this.Container = container; 
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet')); 
        
        if (isPortlet) {
            var content = container.add(Ext.create('EC.Catalog.view.SpecialServices.PortletLayout', {
                permissions: this.permissions
            }));
        } else { 
            var content = container.add(Ext.create('EC.Catalog.view.SpecialServices.Layout', {
                permissions: this.permissions
            }));
        }
        
        var groupsPanel = content.down('SpecialServicesGroups'),
            groupsStore = groupsPanel.getStore(),
            servicesPanel = content.down('SpecialServicesList');
        
        if (isPortlet) {
            groupsPanel.on('itemdblclick', function(panel, record) {
                this.groupID = record.get('id');
                var MC = this.getController('App.controller.Main');
                MC.openModuleTab(this.Container);
            }, this);
        }
        
        groupsPanel.on('select', function(selModel, record, index, eOpts) {
            this.showList(record.get('id'), servicesPanel);
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
                    configure: this.configureItem,
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
        
        if (!Ext.isEmpty(this.groupID)) {
            
            if (groupsStore.getTotalCount() > 0) {
                this.selectGroup(groupsStore, groupsPanel);
            }
            
            groupsStore.on('load', function() {
                this.selectGroup(groupsStore, groupsPanel);
            }, this)
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
        
        var view = Ext.create('EC.Catalog.view.SpecialServices.AddGroup');
        view.down('button[action=save]').on({
            click: function() {
                this.updateGroup(view, this.addGroupURL);
            },
            scope: this
        });
    },
    
    editGroup: function(grid, record) {
        
        var view = Ext.create('EC.Catalog.view.SpecialServices.EditGroup');
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
                        this.fireEvent('groupSaved');
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
   
    configureItem: function(grid, record) {
        
        var w = Ext.create('Ext.window.Window', {
            //title: 'Добавление материала к услуге',
            title: 'Инструменты, механизмы и вспомогательные материалы',
            modal: true,
            width: 800,
            height: 400,
            autoShow: true,
            layout: 'fit',
            border: false
        });
        
        var relatedExpendablesWidget = this.getController('EC.Catalog.controller.RelatedExpendables');
        
        relatedExpendablesWidget.serviceID = record.get('id');
        relatedExpendablesWidget.allowEdit = this.permissions;
        relatedExpendablesWidget.run(w);
        
        /*
        var grid = w.down('ServicesList');
        
        w.down('button[action=add]').on({
            click: function() {
                var rows = grid.getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.saveExpendable(rows[0].get('id'), record.get('id'), panel);
                w.close();
            },
            scope: this
        });
        
        grid.on({
            itemdblclick: function(g, record) {
                this.saveExpendable(record.get('id'), id, panel);
                servicesWindow.close();
            },
            scope: this
        });
        */
    },
    
    addItem: function() {
        
        if (Ext.isEmpty(this.groupID)) {
            Ext.Msg.alert('Ошибка', 'Выберите группу для добавления услуги.');
            return;
        }
        
        var view = Ext.create('EC.Catalog.view.SpecialServices.Add', {groupID: this.groupID});
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.addURL);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.create('EC.Catalog.view.SpecialServices.Edit');
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
        
        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteURL,
                    success: function(response, opts) {
                        if (!response.responseText || response.responseText.success != true) {
                            failureFn(arguments);
                            return;
                        }
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    }
});