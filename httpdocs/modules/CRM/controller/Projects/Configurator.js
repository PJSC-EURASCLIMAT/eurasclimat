Ext.define('EC.CRM.controller.Projects.Configurator', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Projects.Configurator.Equipment',
        'EC.CRM.store.Projects.Configurator.SpecialServices'
    ],
    
    models: [
        'EC.CRM.model.Projects.Configurator.Equipment',
        'EC.CRM.model.Projects.Configurator.SpecialServices'
    ],
    
    views: [
        'EC.CRM.view.Projects.Configurator.EquipmentList',
        'EC.CRM.view.Projects.Configurator.SpecialServicesList'
    ],
    
    projectID: null,
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    addEquipmentURL: '/json/crm/projects-configurator/add-equipment',
    
    deleteEquipmentURL: '/json/crm/projects-configurator/delete-equipment',
    
    addSpecialServiceURL: '/json/crm/projects-configurator/add-special-service',
    
    deleteSpecialServiceURL: '/json/crm/projects-configurator/delete-special-service',
    
    run: function(container) {

        if (!this.projectID) {
            throw 'The project ID must be set!';
        }
        
        this.Container = Ext.create('EC.CRM.view.Projects.Configurator.Layout', {
            projectID: this.projectID,
            permissions: this.permissions
        });
        
        container.add(this.Container);
        
        this.equipmentPanel = this.Container.down('ConfiguratorEquipmentList');
        this.specialServicesPanel = this.Container.down('ConfiguratorSpecialServicesList');
        
        this.equipmentPanel.down('button[action=refresh]').on('click', this.loadEquipment, this);
        this.specialServicesPanel.down('button[action=refresh]').on('click', this.loadSpecialServices, this);
            
        if (this.permissions) {
            
            this.equipmentPanel.down('button[action=additem]').on('click', this.addEquipment, this);
            this.equipmentPanel.on('edititem', this.editEquipment, this);
            this.equipmentPanel.on('deleteitem', this.deleteEquipment, this);
            
            this.specialServicesPanel.down('button[action=additem]').on('click', this.addSpecialService, this);
            this.specialServicesPanel.on('edititem', this.editSpecialService, this);
            this.specialServicesPanel.on('deleteitem', this.deleteSpecialService, this);
        }
        
        this.equipmentPanel.getStore().on('load', this.refreshTotalSumm, this);
        this.specialServicesPanel.getStore().on('load', this.refreshTotalSumm, this);
        
        this.loadEquipment();
        this.loadSpecialServices();
    },
    
    refreshTotalSumm: function() {
        var eq = this.equipmentPanel.getStore().sum('total_summ'),
            sv = this.equipmentPanel.getStore().sum('services_summ'),
            ss = this.specialServicesPanel.getStore().sum('summ'),
            ep = this.specialServicesPanel.getStore().sum('expendables_summ'),
            summ = eq + ss + sv + ep;  
            
        this.Container.down('[itemId=totalequipment]').setText('<b>' + xlib.formatCurrency(eq) + '</b> ');
        this.Container.down('[itemId=totalspecialservices]').setText('<b>' + xlib.formatCurrency(ss) + '</b> ');
        this.Container.down('[itemId=totalservices]').setText('<b>' + xlib.formatCurrency(sv) + '</b> ');
        this.Container.down('[itemId=totalexpendables]').setText('<b>' + xlib.formatCurrency(ep) + '</b> ');
        this.Container.down('[itemId=totalsumm]').setText('<b>' + xlib.formatCurrency(summ) + '</b> ');
    }, 
    
    loadEquipment: function(editId) {
        
        var panel = this.equipmentPanel,
            store = panel.getStore(); 
        if (parseInt(editId) > 0) {
            store.on('load', function() {
                this.editEquipment(panel.down('grid'), store.getById(editId));
            }, this, {single: true});
        }
        store.load({params: {id: this.projectID}});
    },
    
    loadSpecialServices: function(editId) {
        
        var panel = this.specialServicesPanel, 
            store = panel.getStore();
        if (parseInt(editId) > 0) {
            store.on('load', function() {
                this.editSpecialService(panel.down('grid'), store.getById(editId));
            }, this, {single: true});
        }
        store.load({params: {id: this.projectID}});
    },
    
    getAddingWindow: function() {
        
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
    
    // Equipment methods
    
    addEquipment: function() {
        
        var win = this.getAddingWindow(),
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
                var r = Ext.decode(response.responseText);
                this.loadEquipment(r.id);
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
                        this.loadEquipment();
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    },
    
    editEquipment: function(grid, record) {
        var editWin = this.getController('EC.CRM.controller.Projects.Configurator.EquipmentEditor');
        editWin.itemID = record.get('id');
        editWin.on('saved', this.loadEquipment, this);
        editWin.run();
    },
    
    // Special Services methods    
    
    addSpecialService: function() {
        
        var win = this.getAddingWindow();
        
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
    
    editSpecialService: function(grid, record) {
        var editWin = this.getController('EC.CRM.controller.Projects.Configurator.SpecialServicesEditor');
        editWin.itemID = record.get('id');
        editWin.on('saved', this.loadSpecialServices, this);
        editWin.run();
    }
    
});