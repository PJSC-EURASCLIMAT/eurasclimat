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
                }
            }
        });
        
        Ext.each(MainLayout.down('TopPanel').getEl().query('a[action=run]'), function(item) {
            Ext.get(item).on('click', function(e, node, options) {
                var module = node.attributes.launchModule.value;
                if (module) {
                    this.getController(module).init(this.getCenterPanel());
                }
            }, this);
        }, this);
        
        this.getController('EC.Main.controller.Main').init(this.getCenterPanel());
        this.getController('EC.Catalog.controller.Main').init(this.getCenterPanel());
        
        this.getCenterPanel().add({
            title: 'Специалисты',
            disabled: true
        });
        this.getCenterPanel().add({
            title: 'CRM',
            disabled: true
        });
        this.getCenterPanel().add({
            title: 'Почта',
            disabled: true
        });
        this.getCenterPanel().add({
            title: 'Зона отдыха',
            disabled: true
        });

        // Make first tab active
        this.getCenterPanel().down('MainPanel').show();
    }
});