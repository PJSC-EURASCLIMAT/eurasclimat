Ext.define('EC.CRM.controller.Demoprojects.ProjectEdit', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Demoprojects.Projects',
        'EC.CRM.store.Demoprojects.Groups'
    ],
    
    models: [
        'EC.CRM.model.Demoprojects.Projects',
        'EC.CRM.model.Demoprojects.Groups'
    ],
    
    views: [
        'EC.CRM.view.Demoprojects.EditLayout',
        'EC.CRM.view.Demoprojects.BaseDescr',
        'EC.CRM.view.Demoprojects.Plans',
        'EC.CRM.view.Demoprojects.Groups.Combo'
    ],
    
    uses: [
        'EC.CRM.controller.Demoprojects.ProjectsGroups',
        'EC.CRM.controller.Demoprojects.Configurator',
        'EC.CRM.controller.Demoprojects.Members'
    ],
    
    projectID: null,
    
    projectName: null,
    
    projectCreateDate: null,
    
    permissions: acl.isUpdate('crm', 'demoprojects'),
    
    getBaseDescrURL: '/json/crm/demoprojects/get-base-descr',
    
    updateBaseDescrURL: '/json/crm/demoprojects/update-base-descr',
    
    getConfigURL: '/json/crm/demoprojects/get-config',
    
    updateConfigURL: '/json/crm/demoprojects/update-config',
    
    getPlansURL: '/json/crm/demoprojects/get-plans',
    
    updatePlansURL: '/json/crm/demoprojects/update-plans',
    
    run: function(container) {

        if (!this.projectID) {
            throw 'The project ID must be set!';
        }
        
        this.Container = Ext.create('EC.CRM.view.Demoprojects.EditLayout', {
            title: 'Проект № ' + this.projectID 
                         + ' от ' + this.projectCreateDate 
                         + ' "' + this.projectName + '"',
            listeners: {
                close: function() {
                    this.fireEvent('projectEditClose');
                },
                scope: this
            }
        });
        
        var baseDescrForm = this.Container.down('#baseDescrPanel').add(Ext.create('EC.CRM.view.Demoprojects.BaseDescr'));
        baseDescrForm.down('button[action=save]').on('click', function() {
            this.updateItem(baseDescrForm.getForm(), this.updateBaseDescrURL);
        }, this);
        baseDescrForm.getForm().load({
            url: this.getBaseDescrURL, 
            params: {id: this.projectID},
            waitMsg: 'Загрузка...'
        });
        
        var configForm = this.Container.down('#configPanel').add(Ext.create('EC.CRM.view.Demoprojects.Config'));
        configForm.down('button[action=save]').on('click', function() {
            this.updateItem(configForm.getForm(), this.updateConfigURL);
        }, this);
        configForm.getForm().load({
            url: this.getConfigURL, 
            params: {id: this.projectID},
            waitMsg: 'Загрузка...'
        });
        
        var plansForm = this.Container.down('#plansPanel').add(Ext.create('EC.CRM.view.Demoprojects.Plans'));
        plansForm.down('button[action=save]').on('click', function() {
            this.updateItem(plansForm.getForm(), this.updatePlansURL);
        }, this);
        plansForm.getForm().load({
            url: this.getPlansURL, 
            params: {id: this.projectID},
            waitMsg: 'Загрузка...'
        });
        
        var membersForm = this.getController('EC.CRM.controller.Demoprojects.Members');
        membersForm.projectID = this.projectID;
        membersForm.permissions = this.permissions;
        membersForm.run(this.Container.down('#membersPanel'));
        
        var configurator = this.getController('EC.CRM.controller.Demoprojects.Configurator');
        configurator.projectID = this.projectID;
        configurator.run(this.Container.down('#equipmentPanel').add({
            title: 'Кондиционирование',
            layout: 'fit',
            itemId: 'configuratorPanel'
        }));
        
        var discussionsController = this.getController('EC.CRM.controller.Demoprojects.Discussions');
        discussionsController.cur_project_id = this.projectID;
        var discussionsPanel = this.Container.down('#discussionsPanel');
        discussionsController.run(discussionsPanel);
        
        var docsController = this.getController('EC.CRM.controller.Demoprojects.Docs');
        docsController.cur_project_id = this.projectID;
        var docsPanel = this.Container.down('#docsPanel');
        docsController.run(docsPanel);
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