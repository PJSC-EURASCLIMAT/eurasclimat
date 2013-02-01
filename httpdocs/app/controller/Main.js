Ext.define('App.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel'],
    
    refs: [{
        ref: 'CenterPanel',
        selector: 'CenterPanel'
    }], 
    
    init: function() {
        
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
                afterLayout: function() {
                    new Ext.LoadMask(Ext.getBody(), {msg:'Инициализация...'}).destroy();
                    console.log('mask hide', (new Date()).getTime());
                }
            }
        });
        
        this.getController('EC.Main.controller.Main').init(this.getCenterPanel());
        this.getController('EC.Catalog.controller.Main').init(this.getCenterPanel());
        
        this.getCenterPanel().add({
            title: 'Производители',
            disabled: true
        });
        this.getCenterPanel().add({
            title: 'Заказчики',
            disabled: true
        });
        this.getCenterPanel().add({
            title: 'Специалисты',
            disabled: true
        });

        // Make first tab active
        this.getCenterPanel().down('MainPanel').show();
    }
});