Ext.define('EC.CRM.controller.Calcpd.Editor', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Calcpd.Editor'
    ],
    
    models: [
        'EC.CRM.model.Calcpd.Editor'
    ],
    
    views: [
        'EC.CRM.view.Calcpd.EditorLayout'
    ],

    requires: [
        'Ext.grid.feature.Grouping'
    ],
    
    projectID: null,
    
    objTypeID: null,
    
    title: null,
    
    addURL: '/json/crm/calcpd/add-line',
    
    run: function(config) {
        
        if (!acl.isUpdate('calcpd')) return;
        
        Ext.apply(this, config);        
        this.Container = Ext.create('EC.CRM.view.Calcpd.EditorLayout');
        this.Container.setTitle(this.title);
        
        this.Container.down('button[action=addline]').on('click', this.onAdd, this);
        
        this.on('itemSaved', this.loadData, this);
        this.loadData();
        
        this.Container.down('grid').on({
            'edit': function(editor, e) {
                e.record.commit();
            }
        });
    },

    loadData: function() {
        this.getStore('EC.CRM.store.Calcpd.Editor').load({id: this.projectID});
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
                //Ext.Msg.alert('Сообщение', 'Данные успешно сохранены.');
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