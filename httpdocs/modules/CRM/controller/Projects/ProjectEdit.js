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
        'EC.CRM.view.Projects.Groups.Combo'
    ],
    
    uses: [
        'EC.CRM.controller.Projects.ProjectsGroups',
        'EC.CRM.controller.Projects.Configurator'
    ],
    
    projectID: null,
    
    projectName: '',
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    editURL: '/json/crm/projects/update',
    
    getBaseDescrURL: '/json/crm/projects/get',
    
    updateBaseDescrURL: '/json/crm/projects/update',
    
    run: function(container) {

        if (!this.projectID) {
            throw 'The project ID must be set!';
        }
        
        this.Container = Ext.create('EC.CRM.view.Projects.EditLayout', {
            title: 'Проект: ' + this.projectName,
            listeners: {
                close: function() {
                    this.fireEvent('projectEditClose');
                },
                scope: this
            }
        });
        
        var configurator = this.getController('EC.CRM.controller.Projects.Configurator');
        configurator.projectID = this.projectID;
        configurator.run(this.Container.down('#configuratorPanel'));
        
        var baseDescrPanel = this.Container.down('#baseDescrPanel');
        var baseDescrForm = baseDescrPanel.add(Ext.create('EC.CRM.view.Projects.BaseDescr', {
            url: this.updateBaseDescrURL
        }));
        
        baseDescrForm.down('button[action=save]').on('click', function() {
            this.updateItem(baseDescrForm.getForm());
        }, this);
        
        baseDescrForm.getForm().load({url: this.getBaseDescrURL, params: {id: this.projectID}});
        
        var docsController = this.getController('EC.CRM.controller.Projects.Docs');
        docsController.cur_project_id = this.projectID;
        var docsPanel = this.Container.down('#docsPanel');
        docsController.run(docsPanel);
    },

    updateItem: function(form) {
        
        form.submit({
            url: this.updateBaseDescrURL,
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