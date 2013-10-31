Ext.define('EC.CRM.controller.Projects', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Projects'
    ],
    
    models: [
        'EC.CRM.model.Projects'
    ],
    
    views: [
        'EC.CRM.view.Projects.List',
        'EC.CRM.view.Projects.Add',
        'EC.CRM.view.Projects.Edit'
    ],
    
    projectID: null,
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    addURL: '/json/orders/projects/add',
    
    editURL: '/json/orders/projects/update',
    
    deleteURL: '/json/orders/projects/delete',
    
    run: function(container) {

        this.Container = container; 
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet')); 
        
        var grid = container.add(Ext.create('EC.CRM.view.Projects.List', {
            permissions: this.permissions
        }));
        
        grid.down('button[action=refresh]').on({
            click: function() {
                grid.getStore().load();
            },
            scope: this
        });
        
        if (this.permissions) {
            
            grid.down('button[action=additem]').on({
                click: this.addItem,
                scope: this
            });
            
            grid.on({
                configure: this.configureItem,
                edititem: this.editItem,
                deleteitem: this.deleteItem,
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
    
    addItem: function() {
        
        var view = Ext.create('EC.CRM.view.Projects.Add');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.addURL);
            },
            scope: this
        });
    },
    
    configureItem: function(grid, record) {

        var app = this.getController('EC.CRM.controller.Configurator');
        app.run(record.get('id'), record.get('name'));
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.create('EC.CRM.view.Projects.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.editURL);
            },
            scope: this
        });
        view.down('button[action=configure]').on({
            click: function() {
                this.configureItem(grid, record);
            },
            scope: this
        });
        
        var form = view.down('form');
        form.loadRecord(record);
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
    
    updateItem: function(view, URL) {
        
        var form = view.down('form');
        
        form.submit({
            url: URL,
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
    }
    
});