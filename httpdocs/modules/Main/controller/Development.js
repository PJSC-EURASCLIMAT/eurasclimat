Ext.define('EC.Main.controller.Development', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Development.Layout'],
    
    run: function(container) {
        
        var viewDevelopment = this.getContainer(container);
       
        var modulesToOpen = [{
            title: 'Разработка системы',
            icon: '/images/icons/projects.png',
            portletHeight: 410,
            position: 'MainPanel-development-column-1',
            launchModule: 'EC.Project.controller.Main'
        }];
       
       var MC = this.getController('App.controller.Main');
       viewDevelopment.on('show', function() {
            Ext.each(modulesToOpen, function(item) {
                MC.openModulePortlet(item);
            });
       }, this, {single: true});
       
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            title: 'Разработка системы',
            text: 'Разработка системы',
            icon: '/images/icons/projects.png',
            portletHeight: 410,
            position: 'MainPanel-development-column-1',
            launchModule: 'EC.Project.controller.Main',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Статистика ПР'
        }, {
            text: 'Рейтинги ПР'
        }, {
            text: 'Участие в ПР'
        }, {    
            text: 'Архив ПР'
        }];
    }
});
