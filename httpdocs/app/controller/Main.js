Ext.define('App.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel'],
    
    requires: ['xlib.portal.PortalPanel'],
    
    run: function() {
        
        var MainLayout = this.getView('Layout').create();
        var centerPanel = Ext.getCmp('CenterPanel');
        
        this.control({
            'LeftPanel button[action=admin], TopPanel button[action=auth] menuitem': {
                click: function(button, e, options) {
                    if (!Ext.isEmpty(button.launchModule)) {
                        this.getController(button.launchModule).run(centerPanel);
                    }
                }
            }
        });
        /*
        Ext.each(MainLayout.down('TopPanel').getEl().query('a[action=run]'), function(item) {
            Ext.get(item).on('click', function(e, node, options) {
                var module = node.attributes.launchModule.value;
                if (module) {
                    this.getController(module).run(centerPanel);
                }
            }, this);
        }, this);
        */
        this.control({'TopPanel button[action=allwidgets] menuitem': {
                click: this.openModulePortlet
            }
        });
        
        this.control({
            'CenterPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen
            }
        });
        
        this.getController('EC.Main.controller.Main');
        this.getController('EC.Catalog.controller.Main');
        this.getController('EC.Market.controller.Main');
        /*
        this.getController('EC.Specialists.controller.Main');
        this.getController('EC.Mail.controller.Main');
        this.getController('EC.Recreation.controller.Main');
        */
        
        if (acl.isView('admin')) {
            this.getController('EC.CRM.controller.Main');
//            this.getController('EC.Main.controller.1C');
        }

        if (acl.isView('pa')) {
            this.getController('EC.Manufacturers.controller.Main');
        }
        
        // Make first tab active
        centerPanel.setActiveTab(0);
        centerPanel.getActiveTab().setActiveTab(0);
        centerPanel.getActiveTab().fireEvent('activate');
        
    },
    
    openModulePortlet: function(module) {

        var config = module.initConfig || module.initialConfig || module,
            portalPanel;
            
        config.initConfig = config;
        
        portalPanel = Ext.ComponentQuery.query('portalpanel{isVisible(true)}')[0]
                   || module.up('tabpanel').down('portalpanel');
        
        if (portalPanel && !config.allowMultiple 
        && portalPanel.down('[launchModule=' + config.launchModule + ']')) {
            return;
        }

        var container = Ext.create('xlib.portal.Portlet', config);
        container.setHeight(config.portletHeight || 300);
        
        var pos = config.position ? '[id=' + config.position + ']' : '',
            column = portalPanel.down(pos) || portalPanel.down();
        portalPanel.show();
        column.insert(0, container).show();

        if (config.launchModule) {
            this.getController(config.launchModule).run(container);
        }
        portalPanel.doLayout();
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
                type: 'save',
                tooltip: 'Свернуть на рабочий стол',
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
        
        var parent = Ext.ComponentQuery.query('portalpanel{isVisible(true)}')[0].up()
                  || module.up('tabpanel');
                  
        var tab = parent.add({
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
            this.getController(config.launchModule).run(panel);
        }
        if (module.close) module.close();
    },
    
    openModuleFullscreen: function(module) {
        
        var config = module.initConfig || module;
        
        var win = Ext.create('Ext.window.Window', {
            maximized: true,
            closable: false,
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
                type: 'save',
                tooltip: 'Свернуть на рабочий стол',
                action: 'minimize',
                handler: function() {
                    this.openModulePortlet(win);
                    win.close();
                },
                scope: this
            }, {
                type: 'restore',
                tooltip: 'Свернуть во вкладку',
                action: 'restore',
                handler: function() {
                    this.openModuleTab(win);
                    win.close();
                },
                scope: this
            }, {
                type: 'close',
                tooltip: 'Закрыть',
                handler: function() {
                    win.close();
                }
            }]
        });
            
        if (config.launchModule) {
            this.getController(config.launchModule).run(win);
        }
        if (module.close) module.close();
    },
    
    populateChapterMenu: function(items) {
        Ext.defer(function() {
            var menu = Ext.getCmp('EC-chapter-menu');
            if (menu) {
                menu.removeAll(true);
                menu.add(items);
            }
        }, 1);
    },
    
    populateSubchapterMenu: function(items) {
        Ext.defer(function() {
            var menu = Ext.getCmp('EC-subchapter-menu');
            if (menu) {
                menu.removeAll(true);
                menu.add(items);
            }
        }, 1);
    }
});