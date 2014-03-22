Ext.define('EC.CRM.controller.Demoprojects.Configurator.SpecialServicesEditor', {
    
    extend: 'Ext.app.Controller',
    
    permissions: acl.isUpdate('crm', 'demoprojects'),
    
    getURL: '/json/crm/demoprojects-configurator/get-special-service',
    
    setURL: '/json/crm/demoprojects-configurator/update-special-service',
    
    addExpendableURL: '/json/crm/demoprojects-configurator/add-expendable',
    
    updateExpendableURL: '/json/crm/demoprojects-configurator/update-expendable',
    
    deleteExpendableURL: '/json/crm/demoprojects-configurator/delete-expendable',
    
    views: [
        'EC.CRM.view.Demoprojects.Configurator.SpecialServiceForm',
        'EC.CRM.view.Demoprojects.Configurator.ExpendablesList',
        'EC.Catalog.view.SpecialServices.EditRelatedExpendables'
    ],

    stores: [
        'EC.CRM.store.Demoprojects.Configurator.Expendables',
        'EC.Catalog.store.SpecialServices.RelatedExpendables'
    ],
    
    models: [
        'EC.CRM.model.Demoprojects.Configurator.Expendables',
        'EC.Catalog.model.SpecialServices.RelatedExpendables'
    ],
    
    itemID: null,
    
    run: function() {

        if (!this.itemID) {
            throw 'The item ID must be set!';
        }
        
        this.ssForm = this.getView('EC.CRM.view.Demoprojects.Configurator.SpecialServiceForm').create();
        this.eGrid = this.getView('EC.CRM.view.Demoprojects.Configurator.ExpendablesList').create();
        
        this.Container = this.getWindow([{
            layout: 'border',
            items: [this.ssForm, this.eGrid]
        }], 'Редактирование специальной услуги');
        
        this.Container.down('button[action=additem]').on('click', this.onAddExpendable, this);
        this.Container.down('button[action=refresh]').on('click', this.loadExpendables, this);
        this.Container.down('button[action=save]').on('click', this.saveData, this);
        
        this.eGrid.on('edititem', this.onEditExpendable, this);
        this.eGrid.on('checkchange', this.onCheckExpendable, this);
        
        this.ssForm.getForm().load({
            params: {
                id: this.itemID
            },
            url: this.getURL
        });
        
        this.loadExpendables();
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
    
    loadExpendables: function() {
        
        this.eGrid.getStore().load({
            params: {id: this.itemID},
            callback: function(records, operation, success) {
                var sum = 0;
                Ext.each(records, function(r) {
                    var id    = r.get('id'),
                        summ = parseFloat(r.get('summ'));
                    if (!Ext.isEmpty(id)) {
                        sum += summ;
                    }
                }, this);
                this.Container.down('[itemId=totalsumm]').setText(
                    'Выбрано материалов на сумму: <b>' + xlib.formatCurrency(sum) + '</b> '
                );
            },
            scope: this
        });
    },
    
    saveData: function() {
        this.ssForm.submit({
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
    
    onAddExpendable: function() {
        var win = this.getWindow([], 'Добавление материала');
        var catalogExpendables = this.getController('EC.Catalog.controller.Expendables').run(win);
        var grid = win.down('ExpendablesList');
        
        win.down('button[action=save]').on({
            click: function() {
                var rows = grid.getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.addExpendable({
                    expendable_id: rows[0].get('id'), 
                    price: rows[0].get('price'),
                    measure: rows[0].get('measure'),
                    number: 1
                });
                win.close();
            },
            scope: this
        });
        
        grid.on({
            itemdblclick: function(g, record) {
                this.addExpendable({
                    expendable_id: record.get('id'),
                    price: record.get('price'),
                    measure: record.get('measure'),
                    number: 1
                });
                win.close();
            },
            scope: this
        });
        
    },
    
    onEditExpendable: function(grid, record) {
        var win = this.getView('EC.Catalog.view.SpecialServices.EditRelatedExpendables').create();
        win.down('button[action=save]').on('click', function() {
            win.down('form').submit({
                url: this.updateExpendableURL,
                success: function(form, action) {
                    this.loadExpendables();
                    win.close();
                },
                failure: function() {
                    Ext.Msg.alert('Ошибка', 'Сохранение не выполнено!');
                },
                scope: this
            });
        }, this);
        win.down('form').loadRecord(record);
    },
    
    onCheckExpendable: function(column, rowIndex, checked, eOpts) {
        if (!checked) {
            this.deleteExpendable(eOpts.raw.id);
        } else {
            this.addExpendable(eOpts.raw);
        }
    },
    
    deleteExpendable: function(id) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: id
                    },
                    url: this.deleteExpendableURL,
                    success: function(response, opts) {
                        this.loadExpendables();
                    },
                    failure: function(response, opts) {
                        this.eGrid.getStore().rejectChanges();
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            } else {
                this.eGrid.getStore().rejectChanges();
            }
        }, this);
    },
    
    addExpendable: function(data) {
        
        data.ss_id = this.itemID;
        Ext.Ajax.request({
            params: data,
            url: this.addExpendableURL,
            success: function(response, opts) {
                this.loadExpendables();
            },
            failure: function(response, opts) {
                this.eGrid.getStore().rejectChanges();
                Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
            },
            scope: this
        });
    }
});