Ext.define('App.controller.PortalAbstract', {
    
    extend: 'Ext.app.Controller',

    openModulePortlet: function(button, e, options) {

        var tab = this.mainPanel.down('portalpanel');
        
        if (tab.down('[launchModule=' + button.launchModule + ']')) {
            return;
        }
        
        var container = Ext.create('xlib.portal.Portlet', {
            title: button.title || button.text, 
            cls: 'x-portlet',
            height: button.height || 300,
            position: button.position,
            launchModule: button.launchModule
        });
        var column = tab.down(container.position ? '[id=' + container.position + ']' : '') || tab.down();
        tab.show();
        column.insert(0, container).show();
            
        if (button.launchModule) {
            this.getController(button.launchModule).init(container);
        }
        tab.doLayout();
    },
    
    openModuleTab: function(module) {

        var panel = Ext.create('Ext.Panel', {
            frame: true,
            layout: 'fit',
            title: module.title,
            launchModule: module.launchModule,
            position: module.position,
            tools: [{
                type: 'minimize',
                tooltip: 'Свернуть в окошко',
                action: 'minimize',
                handler: function() {
                    this.openModulePortlet(panel);
                    tab.close();
                },
                scope: this
            }, {
                type: 'maximize',
                tooltip: 'Раскрыть на весь экран',
                action: 'maximize',
                handler: function() {
                    this.openModuleFullscreen(panel);
                    tab.close();
                },
                scope: this
            }, {
                type: 'close',
                tooltip: 'Закрыть',
                action: 'close',
                handler: function() {
                    tab.close();
                },
                scope: this
            }]
        });
            
        var tab = this.mainPanel.add({
            closable: false,
            border: false,
            margin: 10,
            layout: 'fit',
            title: module.title,
            items: [panel]
        }).show();
            
        if (module.launchModule) {
            this.getController(module.launchModule).init(panel);
        }
        module.close();
    },
    
    openModuleFullscreen: function(module) {
        
        var win = Ext.create('Ext.window.Window', {
            maximized: true,
            width: 300,
            height: 300,
            autoShow: true,
            shadow: false,
            resizable: false,
            draggable: false,
            layout: 'fit',
            title: module.title,
            launchModule: module.launchModule,
            position: module.position,
            tools: [{
                type: 'minimize',
                tooltip: 'Свернуть в окошко',
                action: 'minimize',
                handler: function() {
                    this.openModulePortlet(win);
                    win.close();
                },
                scope: this
            }, {
                type: 'restore',
                tooltip: 'Восстановить размер',
                action: 'restore',
                handler: function() {
                    this.openModuleTab(win);
                    win.close();
                },
                scope: this
            }]
        });
            
        if (module.launchModule) {
            this.getController(module.launchModule).init(win);
        }
        module.close();
    }
});