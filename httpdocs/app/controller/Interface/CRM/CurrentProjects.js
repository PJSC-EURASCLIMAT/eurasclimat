Ext.define('App.controller.Interface.CRM.CurrentProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.CurrentProjects'],
    
    run: function(container) {
        
        this.getContainer(container);
        
        var MC = this.getController('App.controller.Main');
        container.on('show', function() {
            MC.openModulePortlet({
                text: '1C Предприятие',
                title: '1C Предприятие',
                icon: '/images/icons/about.png',
                launchModule: 'EC.CRM.controller.1C',
                handler: function(b) {
                    MC.openModulePortlet(b.initialConfig);
                }
            });
        }, this);
    },
    
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
        }];
    }
});