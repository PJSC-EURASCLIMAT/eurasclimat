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
        
        this.control({
            'LeftPanel button': {
                click: function(button, e, options) {
                    if (!Ext.isEmpty(button.launchModule)) {
                        this.getController(button.launchModule).init(this.getCenterPanel());
                    }
                }
            }
        });
        
        this.getController('EC.Main.controller.Main').init(this.getCenterPanel());
    }
    
});