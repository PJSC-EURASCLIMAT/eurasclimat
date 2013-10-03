Ext.define('EC.Main.controller.Development', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Development.Layout'],
    
    widgetsReady: false,
    
    loadWidgets: function(modulesToOpen, MC) {
        
        if (!this.widgetsReady) {
        
            this.widgetsReady = true;
            
            Ext.each(modulesToOpen, function(item) {
                MC.openModulePortlet(item);
            });
      }
    },
    
    run: function(container) {
        
       var viewDevelopment = this.getContainer(container);
       
       var modulesToOpen = [
            {
                 title: 'Разработка системы',
                 icon: '/images/icons/projects.png',
                 portletHeight: 410,
                 position: 'MainPanel-development-column-1',
//                 launchModule: 'EC.Main.controller.Projectdev'
                 launchModule: 'EC.Project.controller.Main'
//             },
//             {
//                 title: 'Разработка системы - ввод',
//                 icon: '/images/icons/projects.png',
//                 portletHeight: 410,
//                 position: 'MainPanel-development-column-2',
//                 launchModule: 'EC.Main.controller.ProjectdevEditor'
             }
         ];
       
       var MC = this.getController('App.controller.Main');
       viewDevelopment.on('show', function(){this.loadWidgets(modulesToOpen, MC)}, this);
       
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            title: 'Разработка системы',
            text: 'Разработка системы',
            icon: '/images/icons/projects.png',
            portletHeight: 410,
            position: 'MainPanel-development-column-1',
            launchModule: 'EC.Main.controller.Projectdev',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            title: 'Разработка системы - ввод',
            text: 'Разработка системы - ввод',
            icon: '/images/icons/projects.png',
            portletHeight: 410,
            position: 'MainPanel-development-column-2',
            launchModule: 'EC.Main.controller.ProjectdevEditor',
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
