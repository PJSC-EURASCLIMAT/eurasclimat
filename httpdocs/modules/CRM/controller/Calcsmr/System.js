Ext.define('EC.CRM.controller.Calcsmr.System', {
    
    extend: 'Ext.app.Controller',
    
    requires: ['xlib.grid.Excel'],
    
    stores: [
        'EC.CRM.store.Calcsmr.System'
    ],
    
    models: [
        'EC.CRM.model.Calcsmr.System'
    ],
    
    views: [
        'EC.CRM.view.Calcsmr.SystemList',
        'EC.CRM.view.Calcsmr.SystemEdit'
    ],

    permission: false,
    
    systemID: null,
    
    title: null,
    
    addURL: '/json/crm/calcsmr-system/add',
    
    editURL: '/json/crm/calcsmr-system/update',
    
    callbackFn: Ext.emptyFn(),
    
    callbackFnScope: undefined,
    
    run: function(config) {
        
        if (!acl.isView('calcsmr')) return;
        
        Ext.apply(this, config);   
        
        this.Container = this.getView('EC.CRM.view.Calcsmr.SystemList').create({
            permission: this.permission
        });
        this.Container.setTitle(this.title);
        
        this.Container.on('close', this.callbackFn, this.callbackFnScope);
        this.Container.down('button[action=refresh]').on('click', this.loadData, this);
        
        var grid = this.Container.down('grid');
        grid.on('itemdblclick', this.onEdit, this);
        
        this.Container.down('button[action=excel]').on('click', function() {
    		grid.downloadExcelXml();
    	}, this);
        
        if (this.permission) {
        
            this.on('itemSaved', this.loadData, this);
            this.on('itemCreated', this.loadData, this);
            this.Container.down('button[action=add]').on('click', this.onAdd, this);
            grid.on('edititem', this.onEdit, this);
        }
        
        this.loadData();
    },

    loadData: function() {
        this.getStore('EC.CRM.store.Calcsmr.System').load({
            params: {system_id: this.systemID},
            scope: this
        });
    },
    
    onAdd: function() {
        
        var module = this.getView('EC.CRM.view.Calcsmr.SystemEdit').create(),
            button = module.down('button[action=save]');
        
        button.on('click', function() {
            
            var form = module.down('form');
            
            form.submit({
                url: this.addURL,
                params: {
                    system_id: this.systemID
                },
                waitMsg: 'Сохранение...',
                success: function(form, action) {
                    this.fireEvent('itemCreated', action.result.id);
                    module.close();
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                   }
                },
                scope: this
            });
        }, this);
    },
    
    onEdit: function(grid, record) {
        
        var module = this.getView('EC.CRM.view.Calcsmr.SystemEdit').create(),
            button = module.down('button[action=save]'),
            form = module.down('form');
        
        module.setTitle(record.get('name'));
        
        form.loadRecord(record);
        
        button.on('click', function() {
            
            form.submit({
                url: this.editURL,
                params: {
                    system_id: this.systemID
                },
                waitMsg: 'Сохранение...',
                success: function(form, action) {
                    this.fireEvent('itemSaved');
                    module.close();
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                   }
                },
                scope: this
            });
        }, this);
    }
});