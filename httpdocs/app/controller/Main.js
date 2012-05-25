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

        var container = Ext.create('xlib.portal.Portlet', {
            title: button.title || button.text, 
            cls: 'x-portlet',
            lunchModule: button.lunchModule
        });
        
        var tab = this.getCenterPanel().getComponent('portal-tab-1');
        tab.down().insert(0, container);
        tab.show().doLayout();
            
        if (button.lunchModule) {
            this.getController(button.lunchModule).init(container);
        }
    },
    
    maximizeWidget: function(portlet) {

        var tab = this.getCenterPanel().getComponent('portal-tab-1');
        
        var win = Ext.create('Ext.window.Window', {
            renderTo: tab.getEl(),
            autoShow: true,
            constrain: true,
            maximized: true,
            shadow: false,
            resizable: false,
            layout: 'fit',
            title: portlet.title,
            tools: [{
                type: 'minimize',
                tooltip: 'Свернуть в окошко',
                action: 'minimize'
            }, {
                type: 'maximize',
                tooltip: 'Раскрыть на весь экран',
                action: 'maximize'
            }]
        });
            
        if (portlet.lunchModule) {
            this.getController(portlet.lunchModule).init(win);
        } else {
            win.add(portlet.cloneConfig().child() || {});
        }
        
        portlet.close();
    }
});