Ext.define('EC.CRM.controller.Demoprojects.Projects', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Demoprojects.Projects',
        'EC.CRM.store.Demoprojects.Groups'
    ],
    
    models: [
        'EC.CRM.model.Demoprojects.Projects',
        'EC.CRM.model.Demoprojects.Groups'
    ],
    
    views: [
        'EC.CRM.view.Demoprojects.PortletList',
        'EC.CRM.view.Demoprojects.List',
        'EC.CRM.view.Demoprojects.Add',
        'EC.CRM.view.Demoprojects.Groups.Combo'
    ],
    
    uses: [
        'EC.CRM.controller.Demoprojects.ProjectsGroups',
        'EC.CRM.controller.Demoprojects.ProjectEdit'
    ],
    
    permissions: acl.isUpdate('crm', 'demoprojects'),
    
    addURL: '/json/crm/demoprojects/add',
    
    editURL: '/json/crm/demoprojects/update',
    
    deleteURL: '/json/crm/demoprojects/delete',
    
    run: function(container) {

        this.Container = container; 
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'))
            list = isPortlet ? 'EC.CRM.view.Demoprojects.PortletList' 
                             : 'EC.CRM.view.Demoprojects.List'; 
        
        var grid = container.add(Ext.create(list, {permissions: this.permissions}));
        
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
                edititem: this.editItem,
                itemdblclick: this.editItem,
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
        
        this.getController('EC.CRM.controller.Demoprojects.ProjectsGroups').run(w);
    },
    
    addItem: function() {
        
        var view = Ext.create('EC.CRM.view.Demoprojects.Add');
        
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
    
    editItem: function(grid, record) {
        
        var projectEdit = this.getController('EC.CRM.controller.Demoprojects.ProjectEdit');
        projectEdit.projectID = record.get('id');
        projectEdit.projectName = record.get('name');
        projectEdit.projectCreateDate = Ext.util.Format.date(record.get('created_date'), 'd.m.Y');
        projectEdit.on('projectEditClose', function() {
            grid.getStore().load();
        });
        projectEdit.run();
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