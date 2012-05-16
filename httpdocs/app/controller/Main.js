Ext.define('App.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel'],
    
    refs: [{
        ref: 'CenterPanel',
        selector: 'CenterPanel'
    }], 
    
    init: function() {
        
        var vpMask = new Ext.LoadMask(Ext.getBody(), {msg:'Загрузка...'}).show();
        
        this.getView('Layout').create({
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
                click: this.openModule,
                scope: this
            },
            'CenterPanel portlet': {
                maximize: this.maximizeWidget,
                scope: this
            }
        })
    },
    
    openModule: function(button, e, options) {

        var container;
        
        if (button.maxMode) {
            
            container = this.getCenterPanel().add({
                title: button.text
            }).show();

        } else {
            
            container = Ext.create('xlib.portal.Portlet', {
                title: button.text, 
                lunchModule: button.lunchModule
            });
            
            var tab = this.getCenterPanel().getComponent('portal-tab-1');
            tab.down().insert(0, container);
            tab.show().doLayout();
            
        }
        
        if (button.lunchModule) {
            this.getController(button.lunchModule).init(container);
        }
    },
    
    maximizeWidget: function(portlet) {

        if (portlet.lunchModule) {
            var tab = this.getCenterPanel().add({
                title: portlet.title
            }).show();
            this.getController(portlet.lunchModule).init(tab);
            portlet.close();
        }
    }
});