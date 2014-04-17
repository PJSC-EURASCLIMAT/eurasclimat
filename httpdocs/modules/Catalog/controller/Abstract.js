Ext.define('EC.Catalog.controller.Abstract', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.RelatedServices'
    ],
    
    models: [
        'EC.Catalog.model.RelatedServices'
    ],
    
    uses: [
        'EC.Catalog.view.Images',
        'EC.Catalog.view.RelatedServices.List',
        'EC.Catalog.view.RelatedServices.Edit',
        'EC.Catalog.view.Services.Combo',
        'EC.Catalog.view.FilterMark',
        'EC.Catalog.view.AddAbstract',
        'EC.Catalog.view.EditAbstract',
        'EC.Catalog.view.SettingsLayoutAbstract',
        'EC.Catalog.view.FiltersPanelAbstarct',
        'EC.Catalog.view.Chart'
    ],
    
    entity: null,
    
    catalogName: null,
    
    viewPermition: false,
    
    editPermition: false,
    
    settingsView: null,
    
    filtersPanelXType: null, 
    
    listXType: null,
    
    showXType: null,
    
    editXType: null,
    
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
            
        } else {
            
            container.setLoading('Загрузка...', true);
            var catalog = container.add({
                layout: 'border',
                border: false,
                items: [{
                    xtype: this.filtersPanelXType,
                    region: 'east',
                    width: 200,
                    collapsible: true,
                    split: true
                }, {
                    xtype: this.listXType,
                    region: 'center',
                    split: true,
                    title: 'Каталог "' + this.catalogName + '"'
                }],
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
            
            catalog.down(this.listXType).on({
                showitem: this.showItem,
                scope: this
            });
            
            catalog.down(this.listXType + ' tool[action=refresh]').on({
                click: function(button) {
                    button.up(this.listXType).getStore().load();
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
            
            var catalogGridStore = catalog.down(this.listXType).getStore(); 
            this.on({
                'itemSaved': function() {
                    catalogGridStore.load();
                },
                scope: this
            }, this);
            
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
        this.getController('EC.Catalog.controller.Settings').run(this.settingsView);
    }, 
    
    showItem: function(grid, record) {
        var recordId = (record instanceof Ext.data.Record) ? record.get('id') : record.id;
        var card = Ext.widget(this.showXType);
        
        Ext.Ajax.request({
            params: {
                id: recordId
            },
            url: this.getURL,
            success: function(response, opts) {
                var data = Ext.decode(response.responseText).data;
                card.showTpl.overwrite(card.down('panel').body, data);
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить карточку товара.');
            },
            scope: this
        });
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
        
        var view = Ext.widget(this.editXType, {
            recordId: recordId,
            title: 'Редактирование позиции №' + recordId,
            allowEdit: this.editPermition
        });
        
        view.down('form').load({
            url: this.getURL,
            params: {id: recordId}
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
            buttons: [{
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
            buttons: [{
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
        Ext.each(button.up(this.filtersPanelXType).query('combo'), function(item) {
            var value = {name: item.getXType(), value: item.getValue()};
            values.push(value);
        }, this);
        
        this.Container.initConfig.filters = values; 
        
        MC.openModuleTab(this.Container);
    }
});