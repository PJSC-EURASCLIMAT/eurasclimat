Ext.define('EC.Catalog.controller.Configurator', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Projects.Equipment',
        'EC.Catalog.store.Projects.Services'
    ],
    
    models: [
        'EC.Catalog.model.Projects.Equipment',
        'EC.Catalog.model.Projects.Services'
    ],
    
    views: [
//        'EC.Catalog.view.Projects.EquipmentAdd',
//        'EC.Catalog.view.Projects.EquipmentEdit',
        'EC.Catalog.view.Projects.EquipmentList',
//        'EC.Catalog.view.Projects.ServicesAdd',
//        'EC.Catalog.view.Projects.ServicesEdit'
        'EC.Catalog.view.Projects.ServicesList'
    ],
    
    projectID: null,
    
    permissions: acl.isUpdate('catalog', 'projects'),
    
    addEquipmentURL: '/json/catalog/projects/add-equipment',
    
    editEquipmentURL: '/json/catalog/projects/update-equipment',
    
    deleteEquipmentURL: '/json/catalog/projects/delete-equipment',
    
    addServiceURL: '/json/catalog/projects/add-services',
    
    editServiceURL: '/json/catalog/projects/update-services',
    
    deleteServiceURL: '/json/catalog/projects/delete-services',
    
    run: function(projectID, projectName) {

        if (!projectID) {
            throw 'The project ID must be set!';
        }
        
        this.projectID = projectID;
        
        this.Container = Ext.create('EC.Catalog.view.Projects.ConfiguratorLayout', {
            projectID: projectID,
            projectName: projectName,
            permissions: this.permissions
        });
        
        var equipmentPanel = this.Container.down('ProjectsEquipmentList'),
            servicesPanel = this.Container.down('ProjectsServicesList');
        
        equipmentPanel.down('button[action=refresh]').on('click', this.loadEquipment, this);
        servicesPanel.down('button[action=refresh]').on('click', this.loadServices, this);
            
        if (this.permissions) {
            
        }
        
        equipmentPanel.getStore().load({params: {id: this.projectID}});
        servicesPanel.getStore().load({params: {id: this.projectID}});
    },
    
    loadEquipment: function() {
        var panel = this.Container.down('ProjectsEquipmentList');
        panel.getStore().load({params: {id: this.projectID}});
    },
    
    loadServices: function() {
        var panel = this.Container.down('ProjectsServicesList');
        panel.getStore().load({params: {id: this.projectID}});
    },
    
    addItem: function() {
        
        var view = Ext.create('EC.Catalog.view.Projects.Add');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.addURL);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.create('EC.Catalog.view.Projects.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.editURL);
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