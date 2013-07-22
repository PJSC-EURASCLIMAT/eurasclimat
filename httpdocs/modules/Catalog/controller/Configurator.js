Ext.define('EC.Catalog.controller.Configurator', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Configurator.Equipment',
        'EC.Catalog.store.Configurator.Services'
    ],
    
    models: [
        'EC.Catalog.model.Configurator.Equipment',
        'EC.Catalog.model.Configurator.Services'
    ],
    
    views: [
//        'EC.Catalog.view.Configurator.Edit',
        'EC.Catalog.view.Configurator.EquipmentList',
        'EC.Catalog.view.Configurator.ServicesList'
    ],
    
    projectID: null,
    
    permissions: acl.isUpdate('catalog', 'projects'),
    
    addEquipmentURL: '/json/catalog/projects/add-equipment',
    
    editEquipmentURL: '/json/catalog/projects/update-equipment',
    
    deleteEquipmentURL: '/json/catalog/projects/delete-equipment',
    
    addServiceURL: '/json/catalog/projects/add-service',
    
    editServiceURL: '/json/catalog/projects/update-service',
    
    deleteServiceURL: '/json/catalog/projects/delete-service',
    
    run: function(projectID, projectName) {

        if (!projectID) {
            throw 'The project ID must be set!';
        }
        
        this.projectID = projectID;
        
        this.Container = Ext.create('EC.Catalog.view.Configurator.Layout', {
            projectID: projectID,
            projectName: projectName,
            permissions: this.permissions
        });
        
        var equipmentPanel = this.Container.down('ConfiguratorEquipmentList'),
            servicesPanel = this.Container.down('ConfiguratorServicesList');
        
        equipmentPanel.down('button[action=refresh]').on('click', this.loadEquipment, this);
        servicesPanel.down('button[action=refresh]').on('click', this.loadServices, this);
            
        if (this.permissions) {
            
            equipmentPanel.down('button[action=additem]').on('click', this.addEquipment, this);
            equipmentPanel.on('editEquipment', this.editEquipment, this);
            equipmentPanel.on('deleteEquipment', this.deleteEquipment, this);
            
            servicesPanel.down('button[action=additem]').on('click', this.addService, this);
            servicesPanel.on('editService', this.editService, this);
            servicesPanel.on('deleteService', this.deleteService, this);
        }
        
        this.loadEquipment();
        this.loadServices();
    },
    
    loadEquipment: function() {
        var panel = this.Container.down('ConfiguratorEquipmentList');
        panel.getStore().load({params: {id: this.projectID}});
    },
    
    loadServices: function() {
        var panel = this.Container.down('ConfiguratorServicesList');
        panel.getStore().load({params: {id: this.projectID}});
    },
    
    getWindow: function() {
        
        var win = Ext.create('Ext.window.Window', {
            title: 'Добавление в конфигурацию',
            width: 1050,
            height: 600,
            modal: true,
            autoShow: true,
            border: false,
            layout: 'fit',
            buttons: [{
                text: 'Добавить в конфигурацию',
                formBind: true,
                action: 'chose'
            }, {
                text: 'Закрыть',
                handler: function() {
                    win.close();
                }
            }]
        });
        
        return win;
    },
    
    addEquipment: function() {
        
        var win = this.getWindow(),
            CC = this.getController('EC.Catalog.controller.Catalog');
            
        CC.run(win);
        
        win.down('button[action=chose]').on({
            click: function() {
                var rows = win.down('gridpanel').getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.saveEquipment(CC.catalogID, rows[0].get('id'));
                win.close();
            },
            scope: this
        });
        
    },
    
    saveEquipment: function(entity, entityID) {
        
        Ext.Ajax.request({
            params: {
                entity: entity.toLowerCase(),
                entity_id: entityID,
                project_id: this.projectID,
                number: 1
            },
            url: this.addEquipmentURL,
            success: function(response, opts) {
                this.loadEquipment();
                this.loadServices();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
            },
            scope: this
        });
    },
    
    deleteEquipment: function(grid, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteEquipmentURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.loadEquipment();
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    },
    
    addService: function() {
        
        var win = this.getWindow();
        
        this.getController('EC.Catalog.controller.Services').run(win);
        
        var ServicesList = win.down('ServicesList');
        
        win.down('button[action=chose]').on({
            click: function() {
                var rows = ServicesList.getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.saveService(rows[0].get('id'));
                win.close();
            },
            scope: this
        });
    },
    
    saveService: function(serviceId) {
        
        Ext.Ajax.request({
            params: {
                service_id: serviceId,
                project_id: this.projectID,
                number: 1
            },
            url: this.addServiceURL,
            success: function(response, opts) {
                this.loadServices();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
            },
            scope: this
        });
    },
    
    deleteService: function(grid, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteServiceURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.loadServices();
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    }
});