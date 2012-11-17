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
            'TopPanel menuitem': {
                click: function(button, e, options) {
                    if (!Ext.isEmpty(button.lunchModule)) {
                        this.openModulePortlet(button, e, options);
                    }
                },
                scope: this
            },
            'CenterPanel tabpanel[id=Catalogs-tab] > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'CenterPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    },
    
    openModulePortlet: function(button, e, options) {

        var container = Ext.create('xlib.portal.Portlet', {
            title: button.title || button.text, 
            cls: 'x-portlet',
            lunchModule: button.lunchModule
        });
        var parentContainer = this.getCenterPanel().down('tabpanel[id=Catalogs-tab]'); 
        var tab = parentContainer.getComponent('portal-tab-1');
            
        parentContainer.show();
        tab.show();
        tab.down().insert(0, container).show();
            
        if (button.lunchModule) {
            this.getController(button.lunchModule).init(container);
        }
        tab.doLayout();
    },
    
    openModuleTab: function(module) {

        var parentContainer = this.getCenterPanel().down('tabpanel[id=Catalogs-tab]');
        
        var panel = Ext.create('Ext.Panel', {
            frame: true,
            layout: 'fit',
            title: module.title,
            lunchModule: module.lunchModule,
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
            
        var tab = parentContainer.add({
                closable: false,
                border: false,
                margin: 10,
                layout: 'fit',
                title: module.title,
                items: [panel]
            }).show();
            
        if (module.lunchModule) {
            this.getController(module.lunchModule).init(panel);
        } else {
            panel.add(module.cloneConfig().child() || {});
        }
        
        module.close();
    },
    
    openModuleFullscreen: function(module) {
        
        var win = Ext.create('Ext.window.Window', {
            maximized: true,
            autoShow: true,
            shadow: false,
            resizable: false,
            draggable: false,
            layout: 'fit',
            title: module.title,
            lunchModule: module.lunchModule,
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
                },
                scope: this
            }]
        });
            
        if (module.lunchModule) {
            this.getController(module.lunchModule).init(win);
        } else {
            win.add(module.cloneConfig().child() || {});
        }
        
        module.close();
    }
});