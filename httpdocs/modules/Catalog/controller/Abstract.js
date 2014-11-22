Ext.define('EC.Catalog.controller.Abstract', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.RelatedServices',
        'EC.Catalog.store.Currency'
    ],
    
    models: [
        'EC.Catalog.model.RelatedServices',
        'EC.Catalog.model.ListAbstract'
    ],
    
    uses: [
        'EC.Catalog.view.Images',
        'EC.Catalog.view.RelatedServices.List',
        'EC.Catalog.view.RelatedServices.Edit',
        'EC.Catalog.view.Services.Combo',
        'EC.Catalog.view.FilterMark',
        'EC.Catalog.view.CurrencyCombo',
        'EC.Catalog.view.ListAbstract',
        'EC.Catalog.view.AddAbstract',
        'EC.Catalog.view.EditAbstract',
        'EC.Catalog.view.FiltersPanelAbstarct'
    ],
    
    entity: null,
    
    catalogName: null,
    
    fields: [],
    
    viewPermition: acl.isView('catalog'),
    
    editPermition: acl.isUpdate('catalog'),
    
    showXType: null,
    
    fieldsURL: null,
    
    listURL: null,
    
    getURL: null,
    
    addURL: null,
    
    updateURL: null,
    
    deleteURL: null,
    
    uploadURL: null,
    
    getImagesURL: null,
    
    deleteImageURL: null,
    
    getRelatedServicesURL: null,
    
    addRelatedServicesURL: null,
    
    editRelatedServicesURL: null,
    
    deleteRelatedServicesURL: null,
    
    run: function(container) {
        
        if (!this.viewPermition) {
            return;
        }
        
        this.Container = container; 
        
        if ('portlet' == container.getXType() || container.up('portlet')) {
            
            container.removeAll(true);
            
            container.add({
                border: false,
                title: false,
                items: [Ext.create('Ext.panel.Panel', {
                    border: false,
                    title: false,
                    bodyPadding: 5,
                    padding: '0 0 5px 0',
                    autoScroll: true,
                    style: 'text-align: justify;',
                    html: 'При раз&shy;вер&shy;ты&shy;ва&shy;нии ви&shy;дже&shy;та ' +
                        'и на&shy;жа&shy;тии в поле сле&shy;ва на ка&shy;кую-либо ' +
                        'по&shy;зи&shy;цию из спис&shy;ка ка&shy;та&shy;ло&shy;гов ' +
                        'то&shy;ва&shy;ров, в этом поле вы смо&shy;же&shy;те ' +
                        'озна&shy;ко&shy;мить&shy;ся с рас&shy;кры&shy;ва&shy;ю&shy;щей ' +
                        'или по&shy;яс&shy;ня&shy;ю&shy;щей ин&shy;фор&shy;ма&shy;ци&shy;ей ' +
                        'о дан&shy;ном ка&shy;та&shy;ло&shy;ге то&shy;ва&shy;ров, ' +
                        'а так&shy;же уви&shy;деть гра&shy;фик ак&shy;тив&shy;но&shy;сти ' +
                        'поль&shy;зо&shy;ва&shy;те&shy;лей при ра&shy;бо&shy;те ' +
                        'с дан&shy;ным ка&shy;та&shy;ло&shy;гом то&shy;ва&shy;ров.'
                })]
            });
            
            return;
        }
        
        // load fields list
        Ext.Ajax.request({
            url: this.fieldsURL,
            success: function (response, opts) {
                var fields = Ext.decode(response.responseText);
                this.parseFields(fields);
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить структуру.');
            },
            scope: this
        });
        
        container.setLoading('Загрузка...', true);
        var catalog = container.add({
            layout: 'border',
            border: false,
            items: [{
                xtype: 'CatalogFiltersPanelAbstarct',
                region: 'east',
                width: 200,
                collapsible: true,
                split: true
            }, {
                xtype: 'CatalogListAbstract',
                region: 'center',
                split: true,
                entity: this.entity,
                listURL: this.listURL,
                title: 'Каталог "' + this.catalogName + '"'
            }],
            listeners: {
                afterLayout: function() {
                    container.setLoading(false);
                }
            }
        });
        
        
        // To enable filters panel let initialize grid to create filters
        catalog.down('CatalogListAbstract').filters.createFilters();
        
        var filterCombos = catalog.down('CatalogFiltersPanelAbstarct').query('combo'), 
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
        
        
        catalog.down('CatalogFiltersPanelAbstarct tool[action=resetfilters]').on({
            click: function() {
                this.resetFilters(catalog);
            },
            scope: this
        });
        
        catalog.down('CatalogListAbstract tool[action=refresh]').on({
            click: function(button) {
                button.up('CatalogListAbstract').getStore().load();
            },
            scope: this
        });
        
        if (this.editPermition) {
        
        	/*
            catalog.down('CatalogFiltersPanelAbstarct tool[action=settings]').on({
                click: this.editSettings,
                scope: this
            });
            */
        	
            catalog.down('CatalogListAbstract tool[action=additem]').on({
                click: this.addItem,
                scope: this
            });
            
            catalog.down('CatalogListAbstract button[action=additem]').on({
                click: this.addItem,
                scope: this
            });
            
            catalog.down('CatalogListAbstract').on({
                edititem: this.editItem,
                deleteitem: this.deleteItem,
                scope: this
            });
        }
        
        var catalogGridStore = catalog.down('CatalogListAbstract').getStore(); 
        this.on({
            'itemSaved': function() {
                catalogGridStore.load();
            },
            scope: this
        }, this);
    },
    
    onFilter: function(combo, newValue, oldValue, eOpts) {

        var filter = this.Container.down('CatalogListAbstract').filters.getFilter(combo.fieldName),
            value = combo.getFilter();
            
        if (value === '') {
            filter.setActive(false);
        } else {
            filter.setValue(value);
            filter.setActive(true);
        }
    },
    
    resetFilters: function(view) {
        
        view.down('CatalogFiltersPanelAbstarct').cascade(function(cmp) {
            if (cmp.isFormField) {
                cmp.suspendEvents();
                cmp.reset();
                cmp.resumeEvents();
            }
        });
        view.down('CatalogListAbstract').filters.clearFilters();
    },
    
    editSettings: function() {
        this.getController('EC.Catalog.controller.Settings').run(this.settingsView);
    }, 
    
    addItem: function() {
        var view = Ext.create('EC.Catalog.view.AddAbstract');
        view.down('button[action=save]').on({
            click: function() {
                this.createItem(view);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var recordId = (record instanceof Ext.data.Record) ? record.get('id') : record.id; 
        
        var view = Ext.create('EC.Catalog.view.EditAbstract', {
            catalog: this.entity,
            fields: this.fields,
            recordId: recordId,
            title: 'Редактирование позиции №' + recordId,
            allowEdit: this.editPermition
        });
        
        var catalogRelatedServicesPanel = view.down('CatalogRelatedServices');
        
        catalogRelatedServicesPanel.on({
            activate: function(panel) {
                var store = panel.getStore();
                store.load({url: this.getRelatedServicesURL, id: recordId});
            },
            scope: this
        });
        
        catalogRelatedServicesPanel.down('button[action=refresh]').on({
            click: function() {
                var store = catalogRelatedServicesPanel.getStore();
                store.load({url: this.getRelatedServicesURL, id: recordId});
            },
            scope: this
        });
        
        var catalogImagesPanel = view.down('CatalogImages');
        
        catalogImagesPanel.on({
            activate: function(panel) {
                var store = panel.viewPanel.getStore();
                store.load({url: this.getImagesURL, id: recordId});
            },
            scope: this
        });
        
        catalogImagesPanel.down('button[action=refresh]').on({
            click: function() {
                var store = catalogImagesPanel.viewPanel.getStore();
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
            
            catalogRelatedServicesPanel.down('button[action=add]').on({
                click: function() {
                    this.onAddService(recordId, catalogRelatedServicesPanel);
                },
                scope: this
            });
            
            catalogRelatedServicesPanel.on({
                deleteservice: function(view, record) {
                    this.onDeleteService(record.get('id'), catalogRelatedServicesPanel);
                },
                editservice: function(view, record) {
                    this.onEditService(record, catalogRelatedServicesPanel);
                },
                scope: this
            });
            
            catalogImagesPanel.down('button[action=add]').on({
                click: function() {
                    this.onUpload(recordId, catalogImagesPanel);
                },
                scope: this
            });
            
            catalogImagesPanel.on({
                deleteImage: this.onDeleteImage,
                scope: this
            });
        }
        
        view.down('form').load({
            url: this.getURL,
            params: {id: recordId},
            success: function() {
                var fields = view.down('form').getForm().getFields();
                fields.each(function(i) {
                    if (i.getXType() == 'combobox' && null != i.getValue()) {
                        i.setValue(parseInt(i.getValue()));
                    }
                }, this);
            },
            scope: this
        });
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
                        try {
                            var r = Ext.decode(response.responseText);
                            if (!r.success) {
                                return failureFn(arguments);
                            }
                        } catch(e) {
                            return failureFn(arguments);
                        }
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    },
    
    onDeleteImage: function(view, record) {
        
        Ext.Msg.show({
            title: 'Подтверждение',
            msg: 'Вы уверены?',
            buttons: Ext.Msg.YESNO,
            fn: function(b) {
                if ('yes' == b) {
                    view.setLoading({msg: 'Загрузка...'});
                    Ext.Ajax.request({
                        url: this.deleteImageURL,
                        params: {id: record.get('id')},
                        callback: function() {
                            view.setLoading(false);
                            view.setActive(true);
                        },
                        scope: this
                    });
                }
            },
            icon: Ext.MessageBox.QUESTION,
            scope: this
        });
    },
    
    onUpload: function(id, panel) {
        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.uploadURL,
            uploadParams: {id: id},
            uploadExtraHeaders: {'Content-Type': 'multipart/form-data'},
            listeners: {
                'uploadcomplete': {
                    fn: function(upDialog, manager, items, errorCount) {
                        if (!errorCount) {
                            upDialog.close();
                            panel.viewPanel.getStore().load({url: this.getImagesURL, id: id});
                        }
                    },
                    scope: this
                }
            }
        });
    },
    
    onAddService: function(itemId, panel) {
        
        var f = Ext.create('EC.Catalog.view.RelatedServices.Edit'),
            w = Ext.create('Ext.window.Window', {
            title: 'Добавление услуги к товару',
            modal: true,
            width: 400,
            autoShow: true,
            layout: 'fit',
            border: false,
            items: [f],
            buttons: ['->',{
                text: 'Сохранить',
                handler: function() {
                    f.getForm().submit({
                        url: this.addRelatedServicesURL,
                        params: {item_id: itemId},
                        success: function(response, opts) {
                            panel.setActive(true);
                            w.close();
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
                        },
                        scope: this
                    });
                },
                scope: this
            }, {
                text: 'Отменить',
                scope: this,
                handler: function() {
                    w.close();
                }
            }]
        });
    },
    
    onEditService: function(record, panel) {
        
        var f = Ext.create('EC.Catalog.view.RelatedServices.Edit'),
            w = Ext.create('Ext.window.Window', {
            title: 'Редактирование услуги к товару',
            modal: true,
            width: 400,
            autoShow: true,
            layout: 'fit',
            border: false,
            items: [f],
            buttons: ['->',{
                text: 'Сохранить',
                handler: function() {
                    f.getForm().submit({
                        url: this.editRelatedServicesURL,
                        success: function(response, opts) {
                            panel.setActive(true);
                            w.close();
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Ошибка', 'Сохранение не выполнено!');
                        },
                        scope: this
                    });
                },
                scope: this
            }, {
                text: 'Отменить',
                scope: this,
                handler: function() {
                    w.close();
                }
            }]
        });
        
        f.getForm().loadRecord(record);
    },
    
    onDeleteService: function(id, panel) {
        
        Ext.Msg.show({
            title: 'Подтверждение',
            msg: 'Вы уверены?',
            buttons: Ext.Msg.YESNO,
            fn: function(b) {
                if ('yes' == b) {
                    panel.setLoading({msg: 'Загрузка...'});
                    Ext.Ajax.request({
                        url: this.deleteRelatedServicesURL,
                        params: {id: id},
                        callback: function() {
                            panel.setLoading(false);
                            panel.setActive(true);
                        },
                        scope: this
                    });
                }
            },
            icon: Ext.MessageBox.QUESTION,
            scope: this
        });
    },
    
    openFiltered: function(button) {
        
        var MC = this.getController('App.controller.Main'), 
            values = [];
        Ext.each(button.up('CatalogFiltersPanelAbstarct').query('combo'), function(item) {
            var value = {name: item.getXType(), value: item.getValue()};
            values.push(value);
        }, this);
        
        this.Container.initConfig.filters = values; 
        
        MC.openModuleTab(this.Container);
    },
    
    parseFields: function(fields) {
        
        Ext.each(fields, function(f) {
            
            if (f.xtype == 'combo') {
                var values = f.values, data = [];
                Ext.iterate(values, function(value, key) {
                    data.push({
                        id: key,
                        name: value
                    });
                });
                f.store = {
                    xtype: 'store',
                    fields: ['id', 'name'],
                    data: data
                };
                f.valueField = 'id'; 
                f.displayField = 'name';
                f.queryMode = 'local';
            }
        });
        this.fields = fields;
    }
});