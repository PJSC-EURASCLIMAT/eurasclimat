Ext.define('EC.CRM.controller.Calcsmr.Main', {
    
    extend: 'Ext.app.Controller',

    controllers: [
        'EC.CRM.controller.Calcsmr.Project'
    ],
    
    stores: [
        'EC.CRM.store.Calcsmr.Main'
    ],
    
    models: [
        'EC.CRM.model.Calcsmr.Main'
    ],
    
    views: [
        'EC.CRM.view.Calcsmr.MainList',
        'EC.CRM.view.Calcsmr.MainEdit',
        'EC.CRM.view.Calcsmr.Copy'
    ],
    
    addURL: '/json/crm/calcsmr/add',
    
    updateURL: '/json/crm/calcsmr/update',
    
    copyURL: '/json/crm/calcsmr/copy',
    
    deleteURL: '/json/crm/calcsmr/delete',
    
    permission: acl.isUpdate('calcsmr'),
    
    run: function(container) {

        this.Container = container; 
        
        var grid = container.add(Ext.create('EC.CRM.view.Calcsmr.MainList', {permission: this.permission}));
        
        grid.on({
            itemdblclick: this.openProject,
            openproject: this.openProject,
            scope: this
        });
            
        if (this.permission) {
            
            grid.down('button[action=additem]').on({
                click: this.addItem,
                scope: this
            });
            
            grid.on({
                edititem: this.editItem,
                copyproject: this.copyProject,
                deleteitem: this.deleteItem,
                scope: this
            });
            
            this.on({
                'itemCreated': function(recordId) {
                    var store = grid.getStore(); 
                    store.on('load', function() {
                        this.openProject(grid, store.getById(recordId));
                    }, this, {single: true});
                    store.load();
                },
                'itemDeleted': function() {
                    grid.getStore().load();
                },
                'itemUpdated': function() {
                    grid.getStore().load();
                },
                scope: this
            }, this);
        }
        
    },
    
    openProject: function(grid, record) {
        
        this.getController('EC.CRM.controller.Calcsmr.Project').run({
            permission: this.permission,
            projectID: record.get('id'),
            title: '<i>Проект:</i> "' + record.get('name') + '"'
        });
    },
    
    addItem: function() {

        var module = this.getView('EC.CRM.view.Calcsmr.MainEdit').create(),
            button = module.down('button[action=save]');
        button.setText('Продолжить');
        button.on('click', function() {
            this.createItem(module);
        }, this);
    },
    
    createItem: function(module) {

        module.down('form').submit({
            url: this.addURL,
            waitMsg: 'Сохранение...',
            success: function(form, action) {
                this.fireEvent('itemCreated', action.result.id);
                module.close();
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
               }
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var module = this.getView('EC.CRM.view.Calcsmr.MainEdit').create(),
            button = module.down('button[action=save]');
        button.on('click', function() {
            this.updateItem(module);
        }, this);
        module.down('form').loadRecord(record);
    },
    
    updateItem: function(module) {

        module.down('form').submit({
            url: this.updateURL,
            waitMsg: 'Сохранение...',
            success: function(form, action) {
                this.fireEvent('itemUpdated', action.result.id);
                module.close();
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
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
                        this.fireEvent('itemDeleted');
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    },
    
    copyProject: function(grid, record) {
        
        var module = this.getView('EC.CRM.view.Calcsmr.Copy').create(),
            button = module.down('button[action=save]'),
            form = module.down('form'),
            field = module.down('form textfield[name=name]');
            
        button.on('click', function() {
            form.submit({
                url: this.copyURL,
                waitMsg: 'Сохранение...',
                success: function(form, action) {
                    this.fireEvent('itemUpdated', action.result.id);
                    module.close();
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                   }
                },
                scope: this
            });
        }, this);
        
        module.down('form').loadRecord(record);
        field.setValue('Копия ' + field.getValue());
    }
});