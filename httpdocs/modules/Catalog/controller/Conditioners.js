Ext.define('EC.Catalog.controller.Conditioners', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Conditioners'
    ],
    
    models: [
        'EC.Catalog.model.Conditioners'
    ],

    views: [
        'EC.Catalog.view.Conditioners.Layout',
        'EC.Catalog.view.Conditioners.FiltersPanel',
        'EC.Catalog.view.Conditioners.List',
        'EC.Catalog.view.Conditioners.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Conditioners.Filter.Availability',
        'EC.Catalog.view.Conditioners.Filter.Condition',
        'EC.Catalog.view.Conditioners.Filter.InputCooling',
        'EC.Catalog.view.Conditioners.Filter.InputHeating',
        'EC.Catalog.view.Conditioners.Filter.OutputCooling',
        'EC.Catalog.view.Conditioners.Filter.OutputHeating',
        'EC.Catalog.view.Conditioners.Filter.Purpose',
        'EC.Catalog.view.Conditioners.Filter.Square',
        'EC.Catalog.view.Conditioners.Filter.Volume',
        'EC.Catalog.view.Conditioners.Filter.Warranty',
        'EC.Catalog.view.Conditioners.Filter.Country',
        'EC.Catalog.view.Conditioners.Filter.Group',
        'EC.Catalog.view.Conditioners.Filter.Mark',
        'EC.Catalog.view.Conditioners.Filter.ProductType',
        'EC.Catalog.view.Conditioners.Filter.ImplementationType'
    ],
    
    init: function(container) {
        
        if (!acl.isView('catalog', 'conditioners')) {
            return;
        }
        
        if ('portlet' == container.getXType()) {
            
            /*
            var filtersPanel = container.add({
                xtype: 'ConditionersFiltersPanel',
                preventHeader: true,
                border: false
            });
            */
            
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
                xtype: 'ConditionersLayout',
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
            
            Ext.each(catalog.down('ConditionersFiltersPanel').query('combo'), function(item) {
                item.on('change', this.onFilter, catalog);
            }, this);
            
            catalog.down('ConditionersFiltersPanel tool[action=resetfilters]').on({
                click: this.resetFilters,
                scope: catalog
            });
            
            if (acl.isUpdate('catalog', 'conditioners')) {
            
                catalog.down('ConditionersFiltersPanel tool[action=settings]').on({
                    click: this.editSettings,
                    scope: this
                });
                
                catalog.down('ConditionersList').on({
                    edititem: this.editItem,
                    deleteitem: this.deleteItem,
                    scope: this
                });
                catalog.down('ConditionersList tool[action=additem]').on({
                    click: this.addItem,
                    scope: this
                });
            }
            
            catalog.down('ConditionersList tool[action=refresh]').on({
                click: function(button) {
                    button.up('ConditionersList').getStore().load();
                }
            });
            catalog.down('ConditionersList tool[action=expandrows]').on({
                click: this.expandRows,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    catalog.down('ConditionersList').getStore().load();
                }
            });
        }
    },
    
    onFilter: function(combo, newValue, oldValue, eOpts) {
        var grid = this.down('ConditionersList'),
            store = grid.getStore()
            field = combo.fieldName;
        
        store.filters.each(function(f) {
            if (f.property == field) {
                store.filters.remove(f);
            }
        });
        
        if (Ext.isEmpty(newValue)) {
            store.load();
        } else {
            store.filter(field, newValue);
        }
        console.log(store.filters.items);
    },
    
    resetFilters: function() {
        this.down('ConditionersFiltersPanel').cascade(function(cmp) {
            if (cmp.isFormField) {
                cmp.suspendEvents();
                cmp.reset();
                cmp.resumeEvents();
            }
        });
        this.down('ConditionersList').getStore().clearFilter();
    },
    
    editSettings: function() {
        var controller = 'EC.Catalog.controller.Settings',
            view = 'EC.Catalog.view.Conditioners.SettingsLayout';
        this.getController(controller).init(view);
    }, 
    
    addItem: function() {
        var view = Ext.widget('ConditionersEdit');
        view.down('button[action=save]').on({
            click: function() {
                this.createItem(view);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        var view = Ext.widget('ConditionersEdit', {
            recordId: record.get('id'),
            title: 'Редактирование позиции №' + record.get('id')
        });
        view.down('form').loadRecord(record);
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view);
            },
            scope: this
        });
    },
    
    createItem: function(view) {
        var form = view.down('form');
        form.submit({
            url: '/json/catalog/conditioners/add',
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
            url: '/json/catalog/conditioners/update',
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
                    url: '/json/catalog/conditioners/delete',
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
        var grid = button.up('ConditionersList'),
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