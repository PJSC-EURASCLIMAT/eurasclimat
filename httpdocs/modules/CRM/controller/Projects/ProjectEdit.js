Ext.define('EC.CRM.controller.Projects.ProjectEdit', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Projects.Projects',
        'EC.CRM.store.Projects.Groups'
    ],
    
    models: [
        'EC.CRM.model.Projects.Projects',
        'EC.CRM.model.Projects.Groups'
    ],
    
    views: [
        'EC.CRM.view.Projects.EditLayout',
        'EC.CRM.view.Projects.BaseDescr',
        'EC.CRM.view.Projects.Plans',
        'EC.CRM.view.Projects.Groups.Combo'
    ],
    
    uses: [
        'EC.CRM.controller.Projects.ProjectsGroups',
        'EC.CRM.controller.Projects.Configurator',
        'EC.CRM.controller.Projects.Members',
        'EC.CRM.controller.Projects.Calcpd',
        'EC.CRM.controller.Calcfot.Main'
    ],
    
    projectID: null,
    
    permissions: acl.isUpdate('projects'),
    
    getBaseDescrURL: '/json/crm/projects/get-base-descr',
    
    updateBaseDescrURL: '/json/crm/projects/update-base-descr',
    
    getConfigURL: '/json/crm/projects/get-config',
    
    updateConfigURL: '/json/crm/projects/update-config',
    
    getPlansURL: '/json/crm/projects/get-plans',
    
    updatePlansURL: '/json/crm/projects/update-plans',
    
    run: function(container) {

    	this.projectID = container.initConfig.projectID || null;
    	
    	if (!this.projectID) {
    		throw 'The project ID must be set!';
    	}
        
        this.Container = Ext.create('EC.CRM.view.Projects.EditLayout');
        
        container.add(this.Container);
        
        container.on('close', function() {
            this.fireEvent('projectEditClose');
        }, this);
        
        var baseDescrForm = this.Container.down('#baseDescrPanel').add(Ext.create('EC.CRM.view.Projects.BaseDescr'));
        baseDescrForm.down('button[action=save]').on('click', function() {
            this.updateItem(baseDescrForm.getForm(), this.updateBaseDescrURL);
        }, this);
        baseDescrForm.getForm().load({
            url: this.getBaseDescrURL, 
            params: {id: this.projectID},
            waitMsg: 'Загрузка...'
        });
        
        var configForm = this.Container.down('#configPanel').add(Ext.create('EC.CRM.view.Projects.Config'));
        configForm.down('button[action=save]').on('click', function() {
            this.updateItem(configForm.getForm(), this.updateConfigURL);
        }, this);
        configForm.getForm().load({
            url: this.getConfigURL, 
            params: {id: this.projectID},
            waitMsg: 'Загрузка...'
        });
        
        var plansForm = this.Container.down('#plansPanel').add(Ext.create('EC.CRM.view.Projects.Plans'));
        plansForm.down('button[action=save]').on('click', function() {
            this.updateItem(plansForm.getForm(), this.updatePlansURL);
        }, this);
        plansForm.getForm().load({
            url: this.getPlansURL, 
            params: {id: this.projectID},
            waitMsg: 'Загрузка...'
        });
        
        Ext.create('EC.CRM.controller.Projects.Members', {
        	projectID: this.projectID,
        	permissions: this.permissions
        }).run(this.Container.down('#membersPanel'));
        
        Ext.create('EC.CRM.controller.Projects.Discussions', {
        	cur_project_id: this.projectID,
        	permissions: this.permissions
        }).run(this.Container.down('#discussionsPanel'));
        
        Ext.create('EC.CRM.controller.Projects.Docs', {
        	cur_project_id: this.projectID,
        	permissions: this.permissions
        }).run(this.Container.down('#docsPanel'));

        Ext.create('EC.CRM.controller.Projects.Configurator', {
        	projectID: this.projectID,
        	permissions: this.permissions
        }).run(this.Container.down('#equipmentPanel'));
        
        Ext.create('EC.CRM.controller.Projects.Calcpd', {
        	projectID: this.projectID,
        	permissions: this.permissions
        }).run(this.Container.down('#calcpdPanel'));
        /*
        Ext.create('EC.CRM.controller.Calcfot.Main', {
          projectID: this.projectID,
          permissions: this.permissions
        }).run(this.Container.down('#calcfotPanel'));
        */
    },

    updateItem: function(form, url) {
        
        form.submit({
            url: url,
            params: {id: this.projectID},
            waitMsg: 'Сохранение...',
            success: function(form, action) {
                this.fireEvent('itemSaved');
                Ext.Msg.alert('Сообщение', 'Данные успешно сохранены.');
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