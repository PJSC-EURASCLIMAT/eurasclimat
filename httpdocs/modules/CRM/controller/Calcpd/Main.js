Ext.define('EC.CRM.controller.Calcpd.Main', {
    
    extend: 'Ext.app.Controller',

    controllers: [
        'EC.CRM.controller.Calcpd.Editor'
    ],
    
    stores: [
        'EC.CRM.store.Calcpd.Main'
    ],
    
    models: [
        'EC.CRM.model.Calcpd.Main'
    ],
    
    views: [
        'EC.CRM.view.Calcpd.MainList',
        'EC.CRM.view.Calcpd.MainListPortlet',
        'EC.CRM.view.Calcpd.Add'
    ],
    
    addURL: '/json/crm/calcpd/add',
    
    deleteURL: '/json/crm/calcpd/delete',
    
    run: function(container) {

        this.Container = container; 
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet')); 
        
        var grid = container.add(isPortlet 
            ? Ext.create('EC.CRM.view.Calcpd.MainListPortlet')
            : Ext.create('EC.CRM.view.Calcpd.MainList')
        );
        
        grid.down('button[action=refresh]').on({
            click: function() {
                grid.getStore().load();
            },
            scope: this
        });
        
        if (acl.isUpdate('calcpd', 'admin') && !isPortlet) {
            
            grid.down('button[action=config]').on({
                click: this.showConfig,
                scope: this
            });
        }
        
        if (acl.isUpdate('calcpd') && !isPortlet) {
            
            grid.down('button[action=additem]').on({
                click: this.addItem,
                scope: this
            });
            
            grid.on({
                edititem: this.editItem,
                itemdblclick: this.editItem,
                deleteitem: this.deleteItem,
                scope: this
            });
            
            this.on({
                'itemCreated': function(recordId) {
                    var store = grid.getStore(); 
                    store.on('load', function() {
                        this.editItem(grid, store.getById(recordId));
                    }, this, {single: true});
                    store.load();
                },
                'itemDeleted': function() {
                    grid.getStore().load();
                },
                scope: this
            }, this);
        }
        
    },
    
    showConfig: function() {
        this.getController('EC.CRM.controller.Calcpd.Config').run();
    },
    
    addItem: function() {

        var module = this.getView('EC.CRM.view.Calcpd.Add').create();
        module.down('button[action=save]').on('click', function() {
            this.createProject(module);
        }, this);
    },
    
    createProject: function(win) {
        
        var form = win.down('form');
        
        form.submit({
            url: this.addURL,
            waitMsg: 'Сохранение...',
            success: function(form, action) {
                this.fireEvent('itemCreated', action.result.id);
                win.close();
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
        
        this.getController('EC.CRM.controller.Calcpd.Editor').run({
            projectID: record.get('id'),
            objTypeID: record.get('obj_type_id'),
            title: '<i>Проект:</i> "' + record.get('name') + '". '
                 + '<i>Тип объекта:</i> "' + record.get('obj_type_name') + '"'
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
    }
    
});