Ext.define('EC.CRM.controller.Calcsmr.Project', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Calcsmr.Project'
    ],
    
    models: [
        'EC.CRM.model.Calcsmr.Project'
    ],
    
    views: [
        'EC.CRM.view.Calcsmr.ProjectList',
        'EC.CRM.view.Calcsmr.ProjectEdit'
    ],
    
    projectID: null,
    
    title: null,
    
    addURL: '/json/crm/calcsmr-project/add',
    
    editURL: '/json/crm/calcsmr-project/update',
    
    run: function(config) {
        
        if (!acl.isView('calcsmr')) return;
        
        Ext.apply(this, config);   
        
        this.Container = this.getView('EC.CRM.view.Calcsmr.ProjectList').create({
            permission: acl.isUpdate('calcsmr')
        });
        this.Container.setTitle(this.title);
        
        var grid = this.Container.down('grid');
        grid.on('opensystem', this.openSystem, this);
        grid.on('itemdblclick', this.openSystem, this);
        this.Container.down('button[action=refresh]').on('click', this.loadData, this);
        
        if (acl.isUpdate('calcsmr')) {
            
            this.on('itemSaved', this.loadData, this);
            this.on('itemCreated', function(recordId) {
                var grid = this.Container.down('grid'), 
                    store = this.getStore('EC.CRM.store.Calcsmr.Project'); 
                store.on('load', function() {
                    this.openSystem(grid, store.getById(recordId));
                }, this, {single: true});
                this.loadData();
            }, this);
            this.Container.down('button[action=add]').on('click', this.onAdd, this);
            grid.on('edititem', this.onEdit, this);
        }
        
        this.loadData();
    },

    loadData: function() {
        this.getStore('EC.CRM.store.Calcsmr.Project').load({
            params: {
                project_id: this.projectID
            },
            scope: this
        });
    },
    
    onAdd: function() {
        
        var module = this.getView('EC.CRM.view.Calcsmr.ProjectEdit').create(),
            button = module.down('button[action=save]');
        
        button.on('click', function() {
            
            var form = module.down('form');
            
            form.submit({
                url: this.addURL,
                params: {
                    project_id: this.projectID
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
        
        var module = this.getView('EC.CRM.view.Calcsmr.ProjectEdit').create(),
            button = module.down('button[action=save]'),
            form = module.down('form');
        
        module.setTitle(record.get('system_name'));
        
        form.loadRecord(record);
        
        button.on('click', function() {
            
            form.submit({
                url: this.editURL,
                params: {
                    project_id: this.projectID
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
    },
    
    openSystem: function(grid, record) {
        if (!record.get('id')) return;
        var module = this.getController('EC.CRM.controller.Calcsmr.System').run({
            systemID: record.get('id'),
            title: '<i>Система:</i> "' + record.get('system_name') + '"',
            callbackFn: this.loadData,
            callbackFnScope: this
        });
    }
});