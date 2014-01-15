Ext.define('EC.Experts.controller.Experts', {

    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Experts.store.Experts',
        'EC.Experts.store.ActiveExperts',
        'EC.Experts.store.Equipment',
        'EC.Experts.store.JobTypes',
        'EC.Experts.store.Rating',
        'EC.Experts.store.Statuses'
    ],
    
    models: [
        'EC.Experts.model.Expert'
    ],
    
    views: [
        'EC.Experts.view.Experts.List',
        'EC.Experts.view.Experts.Edit',
        'EC.Experts.view.Experts.Info'
    ],
    
    permissions: acl.isUpdate('experts'),
    
    addURL: '/json/experts/experts/add',

    editURL: '/json/experts/experts/update',

    activateURL: '/json/experts/experts/activate',
    
    deleteURL: '/json/experts/experts/delete',

    refNames: {
        'rating': 'Рейтинг специалистов',
        'equipment': 'Типы инженерного оборудования специалистов',
        'statuses': 'Статусы специалистов',
        'job_types': 'Типы деятельности специалистов'
    },

    run: function(container) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet')); 
        
        var grid = container.add(Ext.create('EC.Experts.view.Experts.List', {
            permissions: this.permissions,
            store: 'EC.Experts.store.Experts'
        }));

        this.grid = grid;

        grid.down('button[action=refresh]').on({
            click: function() {
                grid.getStore().load();
            },
            scope: this
        });

        grid.store.load();
        
        if (this.permissions) {

            grid.down('button[action=additem]').on({
                click: function(){
                    this.addItem(false);
                },
                scope: this
            });
            
            grid.on({
                edititem: this.editItem,
                itemdblclick: function(grid, record) {
                    this.showItem(record.get('id'));
                },
                deleteitem: this.deleteItem,
                openref: this.openRef,
                activechange: this.activeChange,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    grid.getStore().load();
                },
                scope: this
            }, this);
        }

        grid.down('toolbar [name=equip_id]').on('change', this.onEquipFilter, grid);
        grid.down('toolbar [name=status_id]').on('change', this.onStatusFilter, grid);
    },


    onEquipFilter: function(combo, newValue, oldValue, eOpts) {
        this.store.removeFilter('equipFilter');
        this.store.addFilter({
            id: 'equipFilter',
            property: 'equip_id',
            value: combo.getValue()
        });
    },

    onStatusFilter: function(combo, newValue, oldValue, eOpts) {
        this.store.removeFilter('statusFilter');
        this.store.addFilter({
            id: 'statusFilter',
            property: 'status_id',
            value: combo.getValue()
        });
    },

    onActualityFilter: function(combo, newValue, oldValue, eOpts) {
        this.getStore().getProxy().extraParams = {actuality: combo.getValue()};
        this.getStore().guaranteeRange(0, 10);
    },

    activeChange: function(rowIndex, checked) {
        var record = this.grid.store.getAt(rowIndex);

        Ext.Ajax.request({
            params: {
                id: record.get('id'),
                active: checked
            },
            url: this.activateURL,
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                record.commit();
            },
            failure: function() {
                record.reject();
                Ext.Msg.alert('Ошибка', 'Не удалось активировать специалиста!');
            },
            scope: this
        });
    },

    openRef: function(ref_name) {
        var list = Ext.create('xlib.Ref.List',{
            controllerURL: '/json/experts/experts-ref/',
            ref_name: ref_name
        });

        var container = Ext.create('Ext.window.Window', {
            title: this.refNames[ref_name],
            modal: true,
            width: 400,
            height: 400,
//            autoShow: true,
            layout: 'fit',
            border: false
        });

        container.on('close',function(){
            this.getStore('EC.Experts.store.Experts').load();
        },this);
        container.add(list);
        container.show();
    },

    addItem: function(fromCurrent) {
        
        var view = Ext.create('EC.Experts.view.Experts.Edit',{fromCurrent: fromCurrent});
        
        view.down('button[action=save]').on({
            click: function() {
                var form = view.down('form');
                form.submit({
                    url: this.addURL,
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
            scope: this
        });
    },

    editItem: function(grid, record, fromCurrent) {

        var view = Ext.create('EC.Experts.view.Experts.Edit',{data: record.data, fromCurrent: fromCurrent});

        view.down('button[action=save]').on({
            click: function() {
                var form = view.down('form');
                form.submit({
                    url: this.editURL,
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
    }
    
});