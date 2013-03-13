Ext.define('EC.CRM.controller.CurrentProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.CurrentProjects.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Товары в наличии'
        }, {
        text: 'Инструментарий'
        }, {
        text: 'Справочники'
        }, {
        text: 'Платежи'
        }, {    
            text: 'Депозитирование ставок'
        }];
    }
});