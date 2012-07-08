Ext.define('EC.Catalog.controller.Watersupply', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Watersupply'
    ],
    
    models: [
        'EC.Catalog.model.Watersupply'
    ],

    views: [
        'EC.Catalog.view.Watersupply.Layout',
        'EC.Catalog.view.Watersupply.FiltersPanel',
        'EC.Catalog.view.Watersupply.List',
        'EC.Catalog.view.Watersupply.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Watersupply.Filter.Mark',
        'EC.Catalog.view.Watersupply.Filter.Group',
        'EC.Catalog.view.Watersupply.Filter.ProductType',
        'EC.Catalog.view.Watersupply.Filter.ImplementationType',
        'EC.Catalog.view.Watersupply.Filter.ControlType',
        'EC.Catalog.view.Watersupply.Filter.ConnectionType',
        'EC.Catalog.view.Watersupply.Filter.ProtectionType',
        'EC.Catalog.view.Watersupply.Filter.PowerSource',
        'EC.Catalog.view.Watersupply.Filter.Material',
        'EC.Catalog.view.Watersupply.Filter.Country'
    ],
    
    init: function(container) {
        
        if (!acl.isView('catalog', 'watersupply')) {
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
                xtype: 'WatersupplyLayout',
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
            
            Ext.each(catalog.down('WatersupplyFiltersPanel').query('combo'), function(item) {
                item.on('change', this.onFilter, catalog);
            }, this);
            
            catalog.down('WatersupplyFiltersPanel tool[action=resetfilters]').on({
                click: this.resetFilters,
                scope: catalog
            });
            
            if (acl.isUpdate('catalog', 'watersupply')) {
            
                catalog.down('WatersupplyFiltersPanel tool[action=settings]').on({
                    click: this.editSettings,
                    scope: this
                });
                
                catalog.down('WatersupplyList').on({
                    edititem: this.editItem,
                    deleteitem: this.deleteItem,
                    scope: this
                });
                catalog.down('WatersupplyList tool[action=additem]').on({
                    click: this.addItem,
                    scope: this
                });
            }
            
            catalog.down('WatersupplyList tool[action=refresh]').on({
                click: function(button) {
                    button.up('WatersupplyList').getStore().load();
                }
            });
            catalog.down('WatersupplyList tool[action=expandrows]').on({
                click: this.expandRows,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    catalog.down('WatersupplyList').getStore().load();
                }
            });
            
            // To enable filters panel let initialize grid to create filters
            catalog.down('WatersupplyList').filters.createFilters();
        }
    },
    
    onFilter: function(combo, newValue, oldValue, eOpts) {

        var filter = this.down('WatersupplyList').filters.getFilter(combo.fieldName)
            value = combo.getFilter();
            
        if (value === '') {
            filter.setActive(false);
        } else {
            filter.setValue(value);
            filter.setActive(true);
        }
    },
    
    resetFilters: function() {
        this.down('WatersupplyFiltersPanel').cascade(function(cmp) {
            if (cmp.isFormField) {
                cmp.suspendEvents();
                cmp.reset();
                cmp.resumeEvents();
            }
        });
        this.down('WatersupplyList').filters.clearFilters();
    },
    
    editSettings: function() {
        var controller = 'EC.Catalog.controller.Settings',
            view = 'EC.Catalog.view.Watersupply.SettingsLayout';
        this.getController(controller).init(view);
    }, 
    
    addItem: function() {
        var view = Ext.widget('WatersupplyEdit');
        view.down('button[action=save]').on({
            click: function() {
                this.createItem(view);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        var view = Ext.widget('WatersupplyEdit', {
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
            url: '/json/catalog/watersupply/add',
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
            url: '/json/catalog/watersupply/update',
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
                    url: '/json/catalog/watersupply/delete',
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
        var grid = button.up('WatersupplyList'),
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