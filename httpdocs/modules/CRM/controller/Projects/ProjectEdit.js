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
        'EC.CRM.controller.Projects.Calcpd'
    ],
    
    projectID: null,
    
    projectName: null,
    
    projectCreateDate: null,
    
    permissions: acl.isUpdate('projects'),
    
    getBaseDescrURL: '/json/crm/projects/get-base-descr',
    
    updateBaseDescrURL: '/json/crm/projects/update-base-descr',
    
    getConfigURL: '/json/crm/projects/get-config',
    
    updateConfigURL: '/json/crm/projects/update-config',
    
    getPlansURL: '/json/crm/projects/get-plans',
    
    updatePlansURL: '/json/crm/projects/update-plans',
    
    run: function(container) {

        if (!this.projectID) {
            throw 'The project ID must be set!';
        }
        
        this.Container = Ext.create('EC.CRM.view.Projects.EditLayout', {
            title: 'Проект № ' + this.projectID 
                     + ' от ' + this.projectCreateDate 
                     + ' "' + this.projectName + '"',
            listeners: {
                close: function() {
        			//this.onClose();
                    this.fireEvent('projectEditClose');
                },
                scope: this
            }
        });
        
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
        
        var membersForm = this.getController('EC.CRM.controller.Projects.Members');
        membersForm.projectID = this.projectID;
        membersForm.permissions = this.permissions;
        membersForm.run(this.Container.down('#membersPanel'));
        
        var discussionsController = this.getController('EC.CRM.controller.Projects.Discussions');
        discussionsController.cur_project_id = this.projectID;
        var discussionsPanel = this.Container.down('#discussionsPanel');
        discussionsController.run(discussionsPanel);
        
        var docsController = this.getController('EC.CRM.controller.Projects.Docs');
        docsController.cur_project_id = this.projectID;
        var docsPanel = this.Container.down('#docsPanel');
        docsController.run(docsPanel);

        var configurator = this.getController('EC.CRM.controller.Projects.Configurator');
        configurator.projectID = this.projectID;
        configurator.run(this.Container.down('#equipmentPanel'));
        
        var calcpd = this.getController('EC.CRM.controller.Projects.Calcpd');
        calcpd.projectID = this.projectID;
        calcpd.run(this.Container.down('#calcpdPanel'));
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