Ext.define('EC.Catalog.controller.Abstract', {
    
    extend: 'Ext.app.Controller',
    
    uses: [
        'EC.Catalog.view.Images'
    ],
    
    viewPermition: false,
    
    editPermition: false,
    
    settingsView: null,
    
    catalogLayoutXType: null, 
    
    filtersPanelXType: null, 
    
    listXType: null,
    
    addXType: null,
    
    editXType: null,
    
    getURL: null,
    
    addURL: null,
    
    updateURL: null,
    
    deleteURL: null,
    
    uploadURL: null,
    
    getImagesURL: null,
    
    init: function(container) {
        
        if (!this.viewPermition) {
            return;
        }
        
        this.Container = container; 
        
        if ('portlet' == container.getXType()) {
            
            container.setLoading('Загрузка...', true);
            
            var catalog = container.add({
                xtype: this.filtersPanelXType,
                bodyBorder: false,
                header: false,
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                },
                bbar: ['->', {
                    text: 'Фильтровать',
                    pressed: true,
                    action: 'filter'
                }]
            });
            
            catalog.down('button[action=filter]').on({
                click: this.openFiltered, 
                scope: this
            });
            
        } else {
            
            container.setLoading('Загрузка...', true);
            var catalog = container.add({
                xtype: this.catalogLayoutXType,
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
            
            // To enable filters panel let initialize grid to create filters
            catalog.down(this.listXType).filters.createFilters();
            
            var filterCombos = catalog.down(this.filtersPanelXType).query('combo'), 
                filterValues = this.Container.initConfig.filters;
            
            Ext.each(filterCombos, function(item) {
                item.on('change', this.onFilter, this);
            
                if (!Ext.isEmpty(filterValues)) {
                    Ext.each(filterValues, function(f) {
                        if (item.getXType() == f.name) {
                            item.setValue(f.value);
                            return false;
                        }
                    }, this);
                }
            }, this);
            
            catalog.down(this.filtersPanelXType + ' tool[action=resetfilters]').on({
                click: function() {
                    this.resetFilters(catalog);
                },
                scope: this
            });
            
            if (this.editPermition) {
            
                catalog.down(this.filtersPanelXType + ' tool[action=settings]').on({
                    click: this.editSettings,
                    scope: this
                });
                
                catalog.down(this.listXType + ' tool[action=additem]').on({
                    click: this.addItem,
                    scope: this
                });
                
                catalog.down(this.listXType).on({
                    edititem: this.editItem,
                    deleteitem: this.deleteItem,
                    scope: this
                });
            }
            
            catalog.down(this.listXType + ' tool[action=refresh]').on({
                click: function(button) {
                    button.up(this.listXType).getStore().load();
                },
                scope: this
            });
            catalog.down(this.listXType + ' tool[action=expandrows]').on({
                click: this.expandRows,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    catalog.down(this.listXType).getStore().load();
                }
            });
            
        }
    },
    
    onFilter: function(combo, newValue, oldValue, eOpts) {

        var view = combo.up(this.catalogLayoutXType);
        
        var filter = view.down(this.listXType).filters.getFilter(combo.fieldName),
            value = combo.getFilter();
            
        if (value === '') {
            filter.setActive(false);
        } else {
            filter.setValue(value);
            filter.setActive(true);
        }
    },
    
    resetFilters: function(view) {
        
        view.down(this.filtersPanelXType).cascade(function(cmp) {
            if (cmp.isFormField) {
                cmp.suspendEvents();
                cmp.reset();
                cmp.resumeEvents();
            }
        });
        view.down(this.listXType).filters.clearFilters();
    },
    
    editSettings: function() {
        this.getController('EC.Catalog.controller.Settings').init(this.settingsView);
    }, 
    
    addItem: function() {
        var view = Ext.widget(this.addXType);
        view.down('button[action=save]').on({
            click: function() {
                this.createItem(view);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var recordId = (record instanceof Ext.data.Record) ? record.get('id') : record.id; 
        
        var view = Ext.widget(this.editXType, {
            recordId: recordId,
            title: 'Редактирование позиции №' + recordId,
            allowEdit: this.editPermition
        });
        
        view.down('form').load({
            url: this.getURL,
            params: {id: recordId}
        });
        
        view.down('CatalogImages').on({
            activate: function(panel) {
                var store = panel.viewPanel.getStore();
                store.load({url: this.getImagesURL, id: recordId});
            },
            scope: this
        });
        
        if (this.editPermition) {
            
            view.down('button[action=save]').on({
                click: function() {
                    this.updateItem(view);
                },
                scope: this
            });
            var catalogImagesPanel = view.down('CatalogImages');
            catalogImagesPanel.down('button[action=add]').on({
                click: function() {
                    this.onUpload(recordId);
                },
                scope: this
            });
        }
    },
    
    createItem: function(view) {
        
        var form = view.down('form');
        
        form.submit({
            url: this.addURL,
            success: function(form, action) {
                view.close();
                this.fireEvent('itemSaved');
                Ext.Msg.alert('Сообщение', 'Сохранено прошло успешно', function() {
                    this.editItem(null, action.result);
                }, this);
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
    
    updateItem: function(view) {
        
        var form = view.down('form');
        
        form.submit({
            url: this.updateURL,
            params: {
                id: view.recordId
            },
            success: function(form, action) {
               Ext.Msg.alert('Сообщение', 'Сохранение прошло успешно');
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
    },
    
    expandRows: function(button) {
        
        var grid = button.up(this.listXType),
            view = grid.getView(),
            plugin = grid.getPlugin('rowexpander');
            
        if (!plugin) {
            return;
        }
        
        for (var i = 0; i < view.getNodes().length; i++) {
            plugin.toggleRow(i);
        }
    },
    
    onUpload: function(id) {
        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.uploadURL,
            uploadParams: {id: id},
            uploadExtraHeaders: {'Content-Type': 'multipart/form-data'},
            listeners: {
                'uploadcomplete' : {
                    fn: function(upDialog, manager, items, errorCount) {
                        if (!errorCount) {
                            upDialog.close();
                        }
                    },
                    scope: this
                }
            }
        });
    },
    
    openFiltered: function(button) {
        
        var MC = this.getController('EC.Catalog.controller.Main'), 
            values = [];
        Ext.each(button.up(this.filtersPanelXType).query('combo'), function(item) {
            var value = {name: item.getXType(), value: item.getValue()};
            values.push(value);
        }, this);
        
        this.Container.initConfig.filters = values; 
        
        MC.openModuleTab(this.Container);
    }
});