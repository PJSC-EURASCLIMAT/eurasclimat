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
            }),
            parentContainer = this.getCenterPanel().down('tabpanel'), 
            tab = parentContainer.getComponent('portal-tab-1');
            
        parentContainer.show();
        tab.show();
        tab.down().insert(0, container).show();
            
        if (button.lunchModule) {
            this.getController(button.lunchModule).init(container);
        }
        tab.doLayout();
    },
    
    openModuleTab: function(module) {

        var parentContainer = this.getCenterPanel().down('tabpanel'), 
            tab = parentContainer.add({
                closable: false,
                border: false,
                layout: 'fit',
                title: module.title
            }).show();
        
        var win = Ext.create('Ext.window.Window', {
            renderTo: tab.getEl(),
            maximized: true,
            autoShow: true,
            shadow: false,
            resizable: false,
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
                type: 'maximize',
                tooltip: 'Раскрыть на весь экран',
                action: 'maximize',
                handler: function() {
                    this.openModuleFullscreen(win);
                },
                scope: this
            }],
            listeners: {
                close: function() {
                    tab.close(); 
                }
            }
        });
            
        if (module.lunchModule) {
            this.getController(module.lunchModule).init(win);
        } else {
            win.add(module.cloneConfig().child() || {});
        }
        
        module.close();
    },
    
    openModuleFullscreen: function(module) {
        
        var win = Ext.create('Ext.window.Window', {
            maximized: true,
            autoShow: true,
            shadow: false,
            resizable: false,
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