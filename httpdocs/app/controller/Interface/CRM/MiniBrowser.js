Ext.define('App.controller.Interface.CRM.MiniBrowser', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.MiniBrowser'],
    
    run: function(container) {
        
        var container = this.getContainer(container),
            MC = this.getController('App.controller.Main'),
            menu = this.getMenu();
            
       container.on('activate', function() {
            MC.openModuleTab(menu[0]);
       }, this, {single: true});
       
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            title: 'Минибраузер',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 410,
            position: 'MainPanel-column-1',
            launchModule: 'xlib.MiniBrowser',
            handler: function(b) {
                MC.openModuleTab(b.initialConfig);
            }
        }];
    }
});