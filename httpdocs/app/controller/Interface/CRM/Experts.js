Ext.define('App.controller.Interface.CRM.Experts', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Experts'],

    run: function(container) {
        
        var container = this.getContainer(container),
            MC = this.getController('App.controller.Main'),
            menu = this.getMenu();

        container.on('activate', function() {
            Ext.each(menu, function(item) {
                MC.openModulePortlet(item);
            }, this);
        }, this, {single: true});
    },

    getMenu: function() {

        var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'Админстирование курсов',
            title: 'Администрирование курсов',
            icon: '/images/icons/about.png',
            portletHeight: 400,
            position: 'Experts-column-1',
            launchModule: 'EC.Courses.controller.Courses',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        },{
            text: 'Администрирование специалистов',
            title: 'Администрирование специалистов',
            icon: '/images/icons/about.png',
            portletHeight: 400,
            position: 'Experts-column-1',
            launchModule: 'EC.Experts.controller.Experts',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        },{
            text: 'Квалификации',
            title: 'Квалификации',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'Experts-column-2',
            launchModule: 'EC.Qualifications.controller.Qualifications',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        },{
            text: 'Профессии',
            title: 'Профессии',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'Experts-column-2',
            launchModule: 'EC.Professions.controller.Professions',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        },{
            text: 'Типы инженерных систем',
            title: 'Типы инженерных систем',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'Experts-column-3',
            launchModule: 'EC.EngSystemTypes.controller.EngSystemTypes',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});
