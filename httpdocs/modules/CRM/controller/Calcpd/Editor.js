Ext.define('EC.CRM.controller.Calcpd.Editor', {
    
    extend: 'Ext.app.Controller',
    
//    stores: [
//        'EC.CRM.store.Projects.Projects',
//        'EC.CRM.store.Projects.Groups'
//    ],
//    
//    models: [
//        'EC.CRM.model.Projects.Projects',
//        'EC.CRM.model.Projects.Groups'
//    ],
//    
//    views: [
//        'EC.CRM.view.Projects.EditLayout',
//        'EC.CRM.view.Projects.BaseDescr',
//        'EC.CRM.view.Projects.Plans',
//        'EC.CRM.view.Projects.Groups.Combo'
//    ],

    addURL: '/json/crm/calcpd/add',
    
    editURL: '/json/crm/calcpd/update',
    
    run: function(container) {

    },

    updateItem: function(form, url) {
        
        form.submit({
            url: url,
            params: {},
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