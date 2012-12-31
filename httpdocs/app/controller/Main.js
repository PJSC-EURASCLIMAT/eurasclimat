Ext.define('App.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel'],
    
    refs: [{
        ref: 'CenterPanel',
        selector: 'CenterPanel'
    }], 
    
    init: function() {
        
        var vpMask = new Ext.LoadMask(Ext.getBody(), {msg:'Загрузка...'});
        vpMask.show();
        
        this.control({
            'LeftPanel button, TopPanel button[action=auth]': {
                click: function(button, e, options) {
                    if (!Ext.isEmpty(button.launchModule)) {
                        this.getController(button.launchModule).init(this.getCenterPanel());
                    }
                }
            }
        });
        
        var MainLayout = this.getView('Layout').create({
            listeners: {
                render: function() {
                    vpMask.destroy();
                    vpMask = new Ext.LoadMask(Ext.getBody(), {msg:'Инициализация...'});
                    vpMask.show();
                },
                afterLayout: function() {
                    vpMask.destroy();
                }
            }
        });
        
        this.getController('EC.Main.controller.Main').init(this.getCenterPanel());
        this.getController('EC.Catalog.controller.Main').init(this.getCenterPanel());

        // Make first tab active
        this.getCenterPanel().down('MainPanel').show();
    }
    
});