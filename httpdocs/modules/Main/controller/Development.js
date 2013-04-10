Ext.define('EC.Main.controller.Development', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Development.Layout'],
    widgetsReady: false,
    
    loadWidgets: function (modulesToOpen, MC) {
      if (!this.widgetsReady) {
        this.widgetsReady = true;
        Ext.each(modulesToOpen, function(item) {
            MC.openModulePortlet(item);
        });
      }
    },
    
    run: function(container) {
       var viewDevelopment = this.getContainer(container);
       var modulesToOpen = [{
            title: 'Сведения о проекте по разработке системы',
            icon: '/images/icons/projects.png',
            portletHeight: 410,
            position: 'MainPanel-development-column-1',
            launchModule: 'EC.Main.controller.Projectdev'
        }];
       var MC = this.getController('App.controller.Main');
       viewDevelopment.on('show', function(){this.loadWidgets(modulesToOpen, MC)}, this);
    },
    
    getMenu: function() {
        return [{
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
