Ext.define('App.controller.Interface.Mail', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Mail'],
    
    viewLayout: 'MailPanel',
    
    modules: [{
        title: 'Почта',
        icon: '/images/icons/messages.png',
        launchModule: 'EC.Main.controller.Mail'
    }],
    
    init: function() {
        
        var container = this.getContainer();
        
        var MC = this.getController('App.controller.Main');

        container.on('show', function() {
            MC.openModuleTab(this.modules[0]);
        }, this, {single: true});
        
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