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
    
    editXType: null,
    
    addURL: null,
    
    updateURL: null,
    
    deleteURL: null,
    
    init: function(container) {
        
        if (!this.viewPermition) {
            return;
        }
        
        if ('portlet' == container.getXType()) {
            
            container.setHeight(80);
            
            container.add({
                xtype: 'panel',
                layout: 'fit',
                padding: 10,
                html: 'Разверите для просмотра',
                preventHeader: true,
                border: false
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
            
            Ext.each(catalog.down(this.filtersPanelXType).query('combo'), function(item) {
                item.on('change', this.onFilter, this);
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
                
                catalog.down(this.listXType).on({
                    edititem: this.editItem,
                    deleteitem: this.deleteItem,
                    scope: this
                });
                catalog.down(this.listXType + ' tool[action=additem]').on({
                    click: this.addItem,
                    scope: this
                });
            }
            
            catalog.down(this.listXType + ' tool[action=refresh]').on({
                click: function(button) {
                    button.up(this.listXType).getStore().load();
                }
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
            
            // To enable filters panel let initialize grid to create filters
            catalog.down(this.listXType).filters.createFilters();
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
        var view = Ext.widget(this.editXType);
        view.down('button[action=save]').on({
            click: function() {
                this.createItem(view);
            },
            scope: this
        });
        view.down('CatalogImages button[action=add]').on({
            click: function() {
                alert('Add image');
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.widget(this.editXType, {
            recordId: record.get('id'),
            title: 'Редактирование позиции №' + record.get('id'),
            allowEdit: this.editPermition
        });
        
        view.down('form').loadRecord(record);
        
        view.down('CatalogImages').on({
            activate: function(panel) {
                //panel.loadData(record.get('images'));
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
                click: catalogImagesPanel.onUpload
            });
        }
    },
    
    createItem: function(view) {
        var form = view.down('form');
        form.submit({
            url: this.addURL,
            success: function(form, action) {
               Ext.Msg.alert('Сообщение', 'Сохранено прошло успешно');
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
    }
    
});