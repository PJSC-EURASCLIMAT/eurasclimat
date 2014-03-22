Ext.define('EC.CRM.controller.Demoprojects.Configurator.EquipmentEditor', {
    
    extend: 'Ext.app.Controller',
    
    permissions: acl.isUpdate('crm', 'demoprojects'),
    
    getURL: '/json/crm/demoprojects-configurator/get-equipment',
    
    setURL: '/json/crm/demoprojects-configurator/update-equipment',
    
    addServiceURL: '/json/crm/demoprojects-configurator/add-service',
    
    updateServiceURL: '/json/crm/demoprojects-configurator/update-service',
    
    deleteServiceURL: '/json/crm/demoprojects-configurator/delete-service',
    
    views: [
        'EC.CRM.view.Demoprojects.Configurator.EquipmentForm',
        'EC.CRM.view.Demoprojects.Configurator.ServicesList',
        'EC.Catalog.view.RelatedServices.Edit',
        'EC.Catalog.view.Services.Combo'
    ],
    
    stores: [
        'EC.CRM.store.Demoprojects.Configurator.Services',
        'EC.Catalog.store.Services'
    ],
    
    models: [
        'EC.CRM.model.Demoprojects.Configurator.Services',
        'EC.Catalog.model.Services'
    ],
    
    itemID: null,
    
    run: function() {

        if (!this.itemID) {
            throw 'The item ID must be set!';
        }
        
        this.eqForm = this.getView('EC.CRM.view.Demoprojects.Configurator.EquipmentForm').create();
        this.sGrid = this.getView('EC.CRM.view.Demoprojects.Configurator.ServicesList').create();
        
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
        var sForm = this.getView('EC.Catalog.view.RelatedServices.Edit').create();
        var win = this.getWindow([sForm], 'Добавление услуги', 400, 170);
        win.down('button[action=save]').on('click', function() {
            sForm.submit({
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
    },
    
    onEditService: function(grid, record) {
        var sForm = this.getView('EC.Catalog.view.RelatedServices.Edit').create();
        var win = this.getWindow([sForm], 'Редактирование услуги', 400, 170);
        win.down('button[action=save]').on('click', function() {
            sForm.submit({
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
        
        sForm.loadRecord(record);
        sForm.down('ServicesCombo').disable();
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