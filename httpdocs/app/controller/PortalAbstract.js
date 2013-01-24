Ext.define('App.controller.PortalAbstract', {
    
    extend: 'Ext.app.Controller',

    openModulePortlet: function(module) {

        var config = module.initConfig || module;
        
        var tab = this.mainPanel.down('portalpanel');
        
        if (!config.allowMultiple 
        && tab.down('[launchModule=' + config.launchModule + ']')) {
            return;
        }
        
        var container = Ext.create('xlib.portal.Portlet', {
            title: config.title,
            launchModule: config.launchModule,
            position: config.position,
            portletHeight: config.portletHeight,
            allowMultiple: config.allowMultiple,
            icon: config.icon,
            iconCls: config.iconCls,
            initConfig: config
        });
        container.setHeight(config.portletHeight || 300);
        
        var pos = config.position ? '[id=' + config.position + ']' : '',
            column = tab.down(pos) || tab.down();
        tab.show();
        column.insert(0, container).show();
            
        if (config.launchModule) {
            this.getController(config.launchModule).init(container);
        }
        tab.doLayout();
    },
    
    openModuleTab: function(module) {

        var config = module.initConfig || module;
        
        var panel = Ext.create('Ext.Panel', {
            frame: true,
            layout: 'fit',
            title: config.title,
            launchModule: config.launchModule,
            icon: config.icon,
            iconCls: config.iconCls,
            initConfig: config,
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
            }],
            close: function() {
                tab.close();
            }
        });
            
        var tab = this.mainPanel.add({
            closable: false,
            border: false,
            margin: 10,
            layout: 'fit',
            title: config.title,
            icon: config.icon,
            iconCls: config.iconCls,
            portletHeight: config.portletHeight,
            items: [panel]
        }).show();
            
        if (config.launchModule) {
            this.getController(config.launchModule).init(panel);
        }
        if (module.close) module.close();
    },
    
    openModuleFullscreen: function(module) {
        
        var config = module.initConfig || module;
        
        var win = Ext.create('Ext.window.Window', {
            maximized: true,
            autoShow: true,
            shadow: false,
            resizable: false,
            draggable: false,
            layout: 'fit',
            title: config.title,
            launchModule: config.launchModule,
            icon: config.icon,
            iconCls: config.iconCls,
            initConfig: config,
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
            
        if (config.launchModule) {
            this.getController(config.launchModule).init(win);
        }
        if (module.close) module.close();
    }
});