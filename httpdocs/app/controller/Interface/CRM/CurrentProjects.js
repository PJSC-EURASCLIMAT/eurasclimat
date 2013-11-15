Ext.define('App.controller.Interface.CRM.CurrentProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.CurrentProjects'],
    
    modules: [{
        title: '1C Предприятие',
        icon: '/images/icons/about.png',
        allowMultiple: false,
        launchModule: 'EC.CRM.controller.1C'
    }], 
    
    run: function(container) {
        
        this.getContainer(container);
        
        var MC = this.getController('App.controller.Main');

        if (location.host != 'eurasclimat') {
            container.on('show', function() {
                MC.openModulePortlet(this.modules[0]);
            }, this, {single: true});
        }
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        Ext.each(this.modules, function(item) {
            item.text = item.title;
            item.handler = function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        });
        
        return this.modules;
    }
});