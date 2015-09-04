Ext.define('App.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel', 'EC.PA.view.MessagesTopPanelButton'],
    
    requires: ['xlib.portal.PortalPanel'],

    run: function() {
        
        var MainLayout = this.getView('Layout').create();
        var centerPanel = Ext.getCmp('CenterPanel');
        
        this.control({
            'LeftPanel button[action=admin], TopPanel button[action=auth] menuitem, TopPanel button[action=messages]': {
                click: function(button, e, options) {
		        	if (!Ext.isEmpty(button.launchModule)) {
		        		this.getController(button.launchModule).run(centerPanel);
		        	}
                },
                scope: this
            }
        });
        
//        this.control({'TopPanel button[action=allwidgets] menuitem': {
//                click: this.openModulePortlet
//            }
//        });
        
        this.control({
            'CenterPanel portlet': {
                showhelp: this.showHelp,
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen
            }
        });
        
        this.getController('App.controller.Interface.Main');
        
        if (acl.isView('projects')) {
        	this.getController('App.controller.Interface.Projects');
        }
        
        this.getController('App.controller.Interface.Catalog');
        
        this.getController('App.controller.Interface.Manufacturers');
        
        this.getController('App.controller.Interface.Market');

        if (acl.isView('crm')) {
            this.getController('App.controller.Interface.CRM');
        }
        
        this.getController('App.controller.Interface.Mail');
        
        if (acl.isView('admin')) {
            this.getController('App.controller.Interface.Admin');
        }

        // Make first tab active
//        centerPanel.setActiveTab(0);
//        centerPanel.getActiveTab().setActiveTab(0);
//        centerPanel.getActiveTab().fireEvent('activate');
        
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
        var parent = Ext.ComponentQuery.query('portalpanel{isVisible(true)}');
        
        if (!Ext.isEmpty(parent[0])) {
        	parent = parent[0].up();
        } else if (module.initConfig) {
        	parent = module.up('tabpanel');
        } else if (module.target) {
        	parent = Ext.ComponentQuery.query(module.target)[0];
        } else {
        	return;
        }
        
        var panel = Ext.create('Ext.Panel', {
            frame: true,
            layout: 'fit',
            title: config.title,
            launchModule: config.launchModule,
            icon: config.icon,
            iconCls: config.iconCls,
            initConfig: config,
            tools: [{
                type: 'help',
                tooltip: 'Справка',
                handler: function(event, toolEl, parent, tool) {
                    this.showHelp(module);
                },
                scope: this
            }, {
                type: 'save',
                tooltip: 'Свернуть на рабочий стол',
                action: 'minimize',
                hidden: (false === config.minimizable),
                handler: function() {
                    this.openModulePortlet(panel);
                    tab.close();
                },
                scope: this
            }, {
                type: 'maximize',
                tooltip: 'Раскрыть на весь экран',
                action: 'maximize',
                hidden: (false === config.maximizable),
                handler: function() {
                    this.openModuleFullscreen(panel);
                },
                scope: this
            }, {
                type: 'close',
                tooltip: 'Закрыть',
                action: 'close',
                hidden: (false === config.closable),
                handler: function() {
                	panel.fireEvent('close');
                    tab.close();
                },
                scope: this
            }],
            close: function() {
                tab.close();
            }
        });
        
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
                type: 'help',
                tooltip: 'Справка',
                handler: function(event, toolEl, parent, tool) {
                    this.showHelp(module);
                },
                scope: this
            }, {
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
    
    showHelp: function(module) {
    	
        var noHelpText = '<p>Справка отсутствует...</p>',
            helpContainer = Ext.create('Ext.panel.Panel', {
                layout: 'fit',
                border: false,
                autoScroll: true,
                bodyPadding: 20,
                html: noHelpText,
                style: 'background-color: white;',
                loader: Ext.isEmpty(module.helpURL) ? false : {
                    url: module.helpURL,
                    loadMask: true,
                    autoLoad: true,
                    scripts: false,
                    failure: function() {
                        helpContainer.update(noHelpText);
                    }
                }
            });
        
        Ext.create('Ext.Window', {
            title: 'Справка',
            layout: 'fit',
            height: 400,
            width: 400,
            autoShow: true,
            modal: true,
            resizable: true,
            maximizable: true,
            autoScroll: true,
            items: [helpContainer]
        });
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