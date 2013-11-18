Ext.define('EC.CRM.controller.Configurator', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Configurator.Equipment',
        'EC.CRM.store.Configurator.Services',
        'EC.CRM.store.Configurator.SpecialServices',
        'EC.CRM.store.Configurator.Expendables'
    ],
    
    models: [
        'EC.CRM.model.Configurator.Equipment',
        'EC.CRM.model.Configurator.Services',
        'EC.CRM.model.Configurator.SpecialServices',
        'EC.CRM.model.Configurator.Expendables'
    ],
    
    views: [
//        'EC.CRM.view.Configurator.Edit',
        'EC.CRM.view.Configurator.EquipmentList',
        'EC.CRM.view.Configurator.ServicesList',
        'EC.CRM.view.Configurator.SpecialServicesList',
        'EC.CRM.view.Configurator.ExpendablesList'
    ],
    
    projectID: null,
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    addEquipmentURL: '/json/crm/projects/add-equipment',
    
    deleteEquipmentURL: '/json/crm/projects/delete-equipment',
    
    addServiceURL: '/json/crm/projects/add-service',
    
    editServiceURL: '/json/crm/projects/update-service',
    
    deleteServiceURL: '/json/crm/projects/delete-service',
    
    addExpendableURL: '/json/crm/projects/add-expendable',
    
    deleteExpendableURL: '/json/crm/projects/delete-expendable',
    
    addSpecialServiceURL: '/json/crm/projects/add-special-service',
    
    deleteSpecialServiceURL: '/json/crm/projects/delete-special-service',
    
    run: function(container) {

        if (!this.projectID) {
            throw 'The project ID must be set!';
        }
        
        this.Container = Ext.create('EC.CRM.view.Configurator.Layout', {
            projectID: this.projectID,
            permissions: this.permissions
        });
        
        container.add(this.Container);
        
        this.equipmentPanel = this.Container.down('ConfiguratorEquipmentList');
        this.servicesPanel = this.Container.down('ConfiguratorServicesList');
        this.specialServicesPanel = this.Container.down('ConfiguratorSpecialServicesList');
        this.expendablesPanel = this.Container.down('ConfiguratorExpendablesList');
        
        this.equipmentPanel.down('button[action=refresh]').on('click', this.loadEquipment, this);
        this.servicesPanel.down('button[action=refresh]').on('click', this.loadServices, this);
        this.specialServicesPanel.down('button[action=refresh]').on('click', this.loadSpecialServices, this);
        this.expendablesPanel.down('button[action=refresh]').on('click', this.loadExpendables, this);
            
        if (this.permissions) {
            
            this.equipmentPanel.down('button[action=additem]').on('click', this.addEquipment, this);
            this.equipmentPanel.on('edititem', this.editEquipment, this);
            this.equipmentPanel.on('deleteitem', this.deleteEquipment, this);
            
            this.servicesPanel.down('button[action=additem]').on('click', this.addService, this);
            this.servicesPanel.on('edititem', this.editService, this);
            this.servicesPanel.on('deleteitem', this.deleteService, this);
            
            this.specialServicesPanel.down('button[action=additem]').on('click', this.addSpecialService, this);
            this.specialServicesPanel.on('edititem', this.editSpecialService, this);
            this.specialServicesPanel.on('deleteitem', this.deleteSpecialService, this);
            
            this.expendablesPanel.down('button[action=additem]').on('click', this.addExpendable, this);
            this.expendablesPanel.on('edititem', this.editExpendable, this);
            this.expendablesPanel.on('deleteitem', this.deleteExpendable, this);
        }
        
        this.equipmentPanel.getStore().on('load', this.refreshTotalSumm, this);
        this.servicesPanel.getStore().on('load', this.refreshTotalSumm, this);
        this.specialServicesPanel.getStore().on('load', this.refreshTotalSumm, this);
        this.expendablesPanel.getStore().on('load', this.refreshTotalSumm, this);
        
        this.loadEquipment();
        this.loadServices();
        this.loadSpecialServices();
        this.loadExpendables();
    },
    
    refreshTotalSumm: function() {
        var summ = 0  
            + this.equipmentPanel.getStore().sum('summ')
            + this.servicesPanel.getStore().sum('summ')
            + this.specialServicesPanel.getStore().sum('summ') 
            + this.expendablesPanel.getStore().sum('summ');
            
        this.Container.down('[itemId=totalsumm]').setText('<b>' + summ + ' р.</b>');
    }, 
    
    loadEquipment: function() {
        this.equipmentPanel.getStore().load({params: {id: this.projectID}});
    },
    
    loadServices: function() {
        this.servicesPanel.getStore().load({params: {id: this.projectID}});
    },
    
    loadSpecialServices: function() {
        this.specialServicesPanel.getStore().load({params: {id: this.projectID}});
    },
    
    loadExpendables: function() {
        this.expendablesPanel.getStore().load({params: {id: this.projectID}});
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
        
        var grid = win.down('ServicesList');
        
        win.down('button[action=chose]').on({
            click: function() {
                var rows = grid.getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.saveService(rows[0].get('id'));
                win.close();
            },
            scope: this
        });
    },
    
    saveService: function(id) {
        
        Ext.Ajax.request({
            params: {
                service_id: id,
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
    },
    
    addSpecialService: function() {
        
        var win = this.getWindow();
        
        this.getController('EC.Catalog.controller.SpecialServices').run(win);
        
        var grid = win.down('SpecialServicesList');
        
        win.down('button[action=chose]').on({
            click: function() {
                var rows = grid.getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.saveSpecialService(rows[0].get('id'));
                win.close();
            },
            scope: this
        });
    },
    
    saveSpecialService: function(id) {
        
        Ext.Ajax.request({
            params: {
                service_id: id,
                project_id: this.projectID,
                number: 1
            },
            url: this.addSpecialServiceURL,
            success: function(response, opts) {
                this.loadSpecialServices();
                this.loadExpendables();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
            },
            scope: this
        });
    },
    
    deleteSpecialService: function(grid, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteSpecialServiceURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.loadSpecialServices();
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    },
    
    addExpendable: function() {
        
        var win = this.getWindow();
        
        this.getController('EC.Catalog.controller.Expendables').run(win);
        
        var grid = win.down('ExpendablesList');
        
        win.down('button[action=chose]').on({
            click: function() {
                var rows = grid.getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.saveExpendable(rows[0].get('id'));
                win.close();
            },
            scope: this
        });
    },
    
    saveExpendable: function(id) {
        
        Ext.Ajax.request({
            params: {
                expendable_id: id,
                project_id: this.projectID,
                number: 1
            },
            url: this.addExpendableURL,
            success: function(response, opts) {
                this.loadExpendables();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
            },
            scope: this
        });
    },
    
    deleteExpendable: function(grid, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteExpendableURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.loadExpendables();
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