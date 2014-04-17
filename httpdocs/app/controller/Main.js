Ext.define('App.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel', 'EC.PA.view.MessagesTopPanelButton'],
    
    requires: ['xlib.portal.PortalPanel'],


    // ROUTER METHODS

    downloadFileURL: '/json/pa/info/download',

//    profile: function(params) {
//        var exCnt = this.getController("EC.PA.controller.Profile");
//        exCnt.showProfile(params.id);
//        Ext.Router.redirect('');
//    },

    download: function(params) {

        var url = this.downloadFileURL + "?id=" + params.id;
        Ext.Ajax.request({
            url: url,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);

                if (r.success === true) {
                    Ext.DomHelper.append(document.body, {
                        tag: 'iframe',
                        id:'downloadIframe',
                        frameBorder: 0,
                        width: 0,
                        height: 0,
                        css: 'display:none;visibility:hidden;height:0px;',
                        src: url
                    });
                } else {
                    Ext.Msg.alert('Сообщение', 'Заправшиваемый файл не найден');
                }
                Ext.Router.redirect('');

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'В ходе получения файла произошла ошибка');
                Ext.Router.redirect('');
            },
            scope: this
        });

    },
    
    run: function() {
        
        var MainLayout = this.getView('Layout').create();
        var centerPanel = Ext.getCmp('CenterPanel');
        
        this.control({
            'LeftPanel button[action=admin], TopPanel button[action=auth] menuitem, TopPanel button[action=messages]': {
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
                showhelp: this.showHelp,
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen
            }
        });
        
        this.getController('App.controller.Interface.Main');
        this.getController('App.controller.Interface.Catalog');//.run(container);
        this.getController('App.controller.Interface.Manufacturers');
        this.getController('App.controller.Interface.Market');

        if (acl.isView('crm')) {
            this.getController('App.controller.Interface.CRM');
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
            isSetHelpURL = !Ext.isEmpty(module)
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