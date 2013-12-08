Ext.define('App.controller.Interface.Experts.Experts', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Experts.Experts'],

    modules: [{
        title: 'Специалисты',
        icon: '/images/icons/about.png',
        allowMultiple: false,
        launchModule: 'EC.Experts.controller.Experts'
    }],

    run: function(container) {

        this.getContainer(container);

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
