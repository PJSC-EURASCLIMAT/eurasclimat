Ext.define('EC.CRM.controller.Projects', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Projects.Projects',
        'EC.CRM.store.Projects.Groups'
    ],
    
    models: [
        'EC.CRM.model.Projects.Projects',
        'EC.CRM.model.Projects.Groups'
    ],
    
    views: [
        'EC.CRM.view.Projects.List',
        'EC.CRM.view.Projects.Add',
        'EC.CRM.view.Projects.Edit',
        'EC.CRM.view.Projects.Groups.Combo'
    ],
    
    uses: [
        'EC.CRM.controller.ProjectsGroups'
    ],
    
    projectID: null,
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    addURL: '/json/crm/projects/add',
    
    editURL: '/json/crm/projects/update',
    
    deleteURL: '/json/crm/projects/delete',
    
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
            
            grid.down('button[action=groupslist]').on({
                click: this.showGroups,
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
    
    showGroups: function() {
        
        var w = Ext.create('Ext.window.Window', {
            title: 'Список групп проектов',
            modal: true,
            width: 400,
            height: 400,
            autoShow: true,
            layout: 'fit',
            border: false,
            buttons: [{
                text: 'Закрыть',
                scope: this,
                handler: function() {
                    w.close();
                }
            }]
        });
        
        this.getController('EC.CRM.controller.ProjectsGroups').run(w);
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
                        if (!response.responseText || response.responseText.success != true) {
                            failureFn(arguments);
                            return;
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