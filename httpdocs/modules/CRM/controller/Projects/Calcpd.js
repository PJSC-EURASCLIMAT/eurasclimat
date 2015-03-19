Ext.define('EC.CRM.controller.Projects.Calcpd', {
    
    extend: 'Ext.app.Controller',
    
    controllers: [
        'EC.CRM.controller.Calcpd.Config'
	],
    
    stores: [
        'EC.CRM.store.Projects.Calcpd',
        'EC.CRM.store.Calcpd.Info'
    ],
    
    models: [
        'EC.CRM.model.Projects.Calcpd',
        'EC.CRM.model.Calcpd.Info'
    ],
    
    views: [
        'EC.CRM.view.Projects.Calcpd',
        'EC.CRM.view.Calcpd.Info'
    ],

    requires: [
        'Ext.grid.feature.Grouping',
        'xlib.grid.Excel'
    ],
    
    projectID: null,
    
    objTypeID: null,
    
    title: null,
    
    addURL: '/json/crm/projects-calcpd/add',
    
    run: function(container) {
        
    	this.Container = container.add(Ext.create('EC.CRM.view.Projects.Calcpd'));
    	
        this.Container.down('button[action=info]').on('click', this.showInfo, this);
        this.Container.down('button[action=config]').on('click', this.showConfig, this);
        this.Container.down('button[action=refresh]').on('click', this.loadData, this);
        this.Container.down('button[action=addline]').on('click', this.onAdd, this);
        
        this.on('itemSaved', this.loadData, this);
        
        this.Container.down('button[action=excel]').on('click', function() {
        	this.Container.down('grid').downloadExcelXml();
    	}, this);
        
        this.Container.down('grid').on({
            'edit': function(editor, e) {
                e.record.commit();
                this.loadData();
            },
            scope: this
        });
        
        this.loadData();
    },

    loadData: function() {
        this.getStore('EC.CRM.store.Projects.Calcpd').load({id: this.projectID});
    },
    
    showConfig: function() {
        this.getController('EC.CRM.controller.Calcpd.Config').run();
    },
    
    showInfo: function() {
    	this.getView('EC.CRM.view.Calcpd.Info').create();
        this.getStore('EC.CRM.store.Calcpd.Info').load();
    },
    
    onAdd: function() {
        
        var form = this.Container.down('form');
        
        form.submit({
            url: this.addURL,
            params: {
                project_id: this.projectID,
                obj_type_id: this.objTypeID
            },
            waitMsg: 'Сохранение...',
            success: function(form, action) {
                this.fireEvent('itemSaved');
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
    }
});