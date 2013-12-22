Ext.define('EC.Experts.controller.Experts', {

    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Experts.store.Experts',
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
    
    getURL: '/json/experts/experts/get',

    addURL: '/json/experts/experts/add',

    editURL: '/json/experts/experts/update',
    
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
            permissions: this.permissions
        }));

        this.grid = grid;
        
        grid.down('button[action=refresh]').on({
            click: function() {
                grid.getStore().load();
            },
            scope: this
        });
        
        if (this.permissions) {
            
            grid.down('button[action=additem]').on({
                click: function(){
                    this.addItem(false);
                },
                scope: this
            });
            
            grid.on({
                edititem: this.editItem,
                itemdblclick: this.showItem,
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
        
    },

    activeChange: function(rowIndex, checked) {
        var record = this.grid.store.getAt(rowIndex);

        Ext.Ajax.request({
            params: {
                id: record.get('id'),
                active: checked
            },
            url: this.editURL,
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

        var view = Ext.create('EC.Experts.view.Experts.Edit',{record: record, fromCurrent: fromCurrent});

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

    showItem: function(grid, record) {
        var recordId = (record instanceof Ext.data.Record) ? record.get('id') : record.id;
        var card = Ext.widget('ExpertInfo');

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
//
//    showItem: function(grid, record) {
//
//        var view = Ext.create('EC.Experts.view.Experts.Edit',{record: record});
//
//        view.down('button[action=save]').on({
//            click: function() {
//                var form = view.down('form');
//                form.submit({
//                    url: this.editURL,
//                    success: function(form, action) {
//                        view.close();
//                        this.fireEvent('itemSaved');
//                    },
//                    failure: function(form, action) {
//                        switch (action.failureType) {
//                            case Ext.form.action.Action.CLIENT_INVALID:
//                                Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
//                                break;
//                            case Ext.form.action.Action.CONNECT_FAILURE:
//                                Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
//                                break;
//                            case Ext.form.action.Action.SERVER_INVALID:
//                                Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
//                        }
//                    },
//                    scope: this
//                });
//            },
//            scope: this
//        });
//    },

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