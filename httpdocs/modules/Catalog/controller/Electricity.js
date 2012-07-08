Ext.define('EC.Catalog.controller.Electricity', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Electricity'
    ],
    
    models: [
        'EC.Catalog.model.Electricity'
    ],

    views: [
        'EC.Catalog.view.Electricity.Layout',
        'EC.Catalog.view.Electricity.FiltersPanel',
        'EC.Catalog.view.Electricity.List',
        'EC.Catalog.view.Electricity.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Electricity.Filter.Mark',
        'EC.Catalog.view.Electricity.Filter.Group',
        'EC.Catalog.view.Electricity.Filter.ProductType',
        'EC.Catalog.view.Electricity.Filter.ImplementationType',
        'EC.Catalog.view.Electricity.Filter.ControlType',
        'EC.Catalog.view.Electricity.Filter.ConnectionType',
        'EC.Catalog.view.Electricity.Filter.ProtectionType',
        'EC.Catalog.view.Electricity.Filter.PowerSource',
        'EC.Catalog.view.Electricity.Filter.Material',
        'EC.Catalog.view.Electricity.Filter.IsolationType',
        'EC.Catalog.view.Electricity.Filter.Country'
    ],
    
    init: function(container) {
        
        if (!acl.isView('catalog', 'electricity')) {
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
                xtype: 'ElectricityLayout',
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
            
            Ext.each(catalog.down('ElectricityFiltersPanel').query('combo'), function(item) {
                item.on('change', this.onFilter, catalog);
            }, this);
            
            catalog.down('ElectricityFiltersPanel tool[action=resetfilters]').on({
                click: this.resetFilters,
                scope: catalog
            });
            
            if (acl.isUpdate('catalog', 'electricity')) {
            
                catalog.down('ElectricityFiltersPanel tool[action=settings]').on({
                    click: this.editSettings,
                    scope: this
                });
                
                catalog.down('ElectricityList').on({
                    edititem: this.editItem,
                    deleteitem: this.deleteItem,
                    scope: this
                });
                catalog.down('ElectricityList tool[action=additem]').on({
                    click: this.addItem,
                    scope: this
                });
            }
            
            catalog.down('ElectricityList tool[action=refresh]').on({
                click: function(button) {
                    button.up('ElectricityList').getStore().load();
                }
            });
            catalog.down('ElectricityList tool[action=expandrows]').on({
                click: this.expandRows,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    catalog.down('ElectricityList').getStore().load();
                }
            });
            
            // To enable filters panel let initialize grid to create filters
            catalog.down('ElectricityList').filters.createFilters();
        }
    },
    
    onFilter: function(combo, newValue, oldValue, eOpts) {

        var filter = this.down('ElectricityList').filters.getFilter(combo.fieldName)
            value = combo.getFilter();
            
        if (value === '') {
            filter.setActive(false);
        } else {
            filter.setValue(value);
            filter.setActive(true);
        }
    },
    
    resetFilters: function() {
        this.down('ElectricityFiltersPanel').cascade(function(cmp) {
            if (cmp.isFormField) {
                cmp.suspendEvents();
                cmp.reset();
                cmp.resumeEvents();
            }
        });
        this.down('ElectricityList').filters.clearFilters();
    },
    
    editSettings: function() {
        var controller = 'EC.Catalog.controller.Settings',
            view = 'EC.Catalog.view.Electricity.SettingsLayout';
        this.getController(controller).init(view);
    }, 
    
    addItem: function() {
        var view = Ext.widget('ElectricityEdit');
        view.down('button[action=save]').on({
            click: function() {
                this.createItem(view);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        var view = Ext.widget('ElectricityEdit', {
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
            url: '/json/catalog/electricity/add',
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
            url: '/json/catalog/electricity/update',
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
                    url: '/json/catalog/electricity/delete',
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
        var grid = button.up('ElectricityList'),
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