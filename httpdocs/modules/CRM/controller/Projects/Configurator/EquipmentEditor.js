Ext.define('EC.CRM.controller.Projects.Configurator.EquipmentEditor', {
    
    extend: 'Ext.app.Controller',
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    getURL: '/json/crm/projects-configurator/get-equipment',
    
    setURL: '/json/crm/projects-configurator/update-equipment',
    
    addServiceURL: '/json/crm/projects-configurator/add-service',
    
    updateServiceURL: '/json/crm/projects-configurator/update-service',
    
    deleteServiceURL: '/json/crm/projects-configurator/delete-service',
    
    views: [
        'EC.CRM.view.Projects.Configurator.EquipmentForm',
        'EC.CRM.view.Projects.Configurator.ServicesList',
        'EC.CRM.view.Projects.Configurator.ServicesForm',
        'EC.Catalog.view.Services.Combo'
    ],
    
    stores: [
        'EC.CRM.store.Projects.Configurator.Services',
        'EC.Catalog.store.Services'
    ],
    
    models: [
        'EC.CRM.model.Projects.Configurator.Services',
        'EC.Catalog.model.Services'
    ],
    
    itemID: null,
    
    run: function() {

        if (!this.itemID) {
            throw 'The item ID must be set!';
        }
        
        this.eqForm = this.getView('EC.CRM.view.Projects.Configurator.EquipmentForm').create();
        this.sGrid = this.getView('EC.CRM.view.Projects.Configurator.ServicesList').create();
        
        this.Container = this.getWindow([{
            layout: 'border',
            items: [this.eqForm, this.sGrid]
        }], 'Редактирование оборудования');
        
        this.Container.down('button[action=additem]').on('click', this.onAddService, this);
        this.Container.down('button[action=refresh]').on('click', this.loadServices, this);
        this.Container.down('button[action=save]').on('click', this.saveData, this);
        
        this.sGrid.on('edititem', this.onEditService, this);
        this.sGrid.on('checkchange', this.onCheckService, this);
        
        this.eqForm.getForm().load({
            params: {
                id: this.itemID
            },
            url: this.getURL
        });
        
        this.loadServices();
    },
    
    getWindow: function(items, title, width, height) {
        
        var win = Ext.create('Ext.window.Window', {
            title: title || '',
            width: width || 800,
            height: height || 400,
            modal: true,
            autoShow: true,
            border: false,
            layout: 'fit',
            items: items || [],
            buttons: [{
                xtype: 'tbtext',
                itemId: 'totalsumm'
            }, '->', {
                text: 'Сохранить',
                formBind: true,
                action: 'save'
            }, {
                text: 'Закрыть',
                handler: function() {
                    win.close();
                }
            }]
        });
        
        return win;
    },
    
    loadServices: function() {
        
        this.sGrid.getStore().load({
            params: {id: this.itemID},
            callback: function(records, operation, success) {
                var sum = 0;
                Ext.each(records, function(r) {
                    var id    = r.get('id'),
                        price = parseFloat(r.get('price'));
                    if (!Ext.isEmpty(id)) {
                        sum += price;
                    }
                }, this);
                this.Container.down('[itemId=totalsumm]').setText(
                    'Выбрано услуг на сумму: <b>' + xlib.formatCurrency(sum) + '</b> '
                );
            },
            scope: this
        });
    },
    
    saveData: function() {
        this.eqForm.submit({
            url: this.setURL,
            success: function(form, action) {
                this.fireEvent('saved');
                this.Container.close();
            },
            failure: function() {
                Ext.Msg.alert('Ошибка', 'Сохранение не выполнено!');
            },
            scope: this
        });
    },
    
    onAddService: function() {
        var win = Ext.create('EC.CRM.view.Projects.Configurator.ServicesForm', {title: 'Добавление услуги'});
        win.down('button[action=save]').on('click', function() {
        	win.down('form').getForm().submit({
                params: {eq_id: this.itemID},
                url: this.addServiceURL,
                success: function(form, action) {
                    this.loadServices();
                    win.close();
                },
                failure: function() {
                    Ext.Msg.alert('Ошибка', 'Сохранение не выполнено!');
                },
                scope: this
            });
        }, this);
        win.show();
    },
    
    onEditService: function(grid, record) {
    	var win = Ext.create('EC.CRM.view.Projects.Configurator.ServicesForm', {title: 'Редактирование услуги'});
        win.down('button[action=save]').on('click', function() {
        	win.down('form').getForm().submit({
                url: this.updateServiceURL,
                success: function(form, action) {
                    this.loadServices();
                    win.close();
                },
                failure: function() {
                    Ext.Msg.alert('Ошибка', 'Сохранение не выполнено!');
                },
                scope: this
            });
        }, this);
        
        win.show();
        
        win.down('form').loadRecord(record);
    },
    
    onCheckService: function(column, rowIndex, checked, eOpts) {
        if (!checked) {
            this.deleteService(eOpts.raw.id);
        } else {
            this.addService(eOpts.raw);
        }
    },
    
    deleteService: function(id) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: id
                    },
                    url: this.deleteServiceURL,
                    success: function(response, opts) {
                        this.loadServices();
                    },
                    failure: function(response, opts) {
                        this.sGrid.getStore().rejectChanges();
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            } else {
                this.sGrid.getStore().rejectChanges();
            }
        }, this);
    },
    
    addService: function(data) {
        
        data.eq_id = this.itemID;
        Ext.Ajax.request({
                params: data,
                url: this.addServiceURL,
                success: function(response, opts) {
                    this.loadServices();
                },
                failure: function(response, opts) {
                    this.sGrid.getStore().rejectChanges();
                    Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
                },
                scope: this
            });
    }
});