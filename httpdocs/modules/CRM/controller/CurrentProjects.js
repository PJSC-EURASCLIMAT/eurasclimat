Ext.define('EC.CRM.controller.CurrentProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.CurrentProjects.Layout'
    ],
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            text: '1C Предприятие',
            title: '1C Предприятие',
            icon: '/images/icons/about.png',
            launchModule: 'EC.CRM.controller.1C',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
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