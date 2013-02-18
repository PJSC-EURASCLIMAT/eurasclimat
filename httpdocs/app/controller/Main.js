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
        
        this.control({'TopPanel button[action=allwidgets] menuitem': {
                click: this.openWidget
            }
        });
        
        this.getCenterPanel().add({
            title: 'Специалисты',
            icon: '/images/icons/about.png',
            border: false,
            tbar: Ext.create('widget.toolbar', {
                defaults: {
                    icon: '/images/icons/about.png'
                },
                items: [{
                    text: 'Каталог специалистов'
                }, {
                    text: 'Рабочие группы'
                }, {
                    text: 'Форум'
                }, {
                    text: 'Обучение'
                }, {
                    text: 'Создать свой подраздел'
                }]
            })
        }),
        
        this.getCenterPanel().add({
            title: 'Торговая площадка',
            icon: '/images/icons/about.png',
            border: false,
            tbar: Ext.create('widget.toolbar', {
                defaults: {
                    icon: '/images/icons/about.png'
                },
                items: [{
//                    text: 'Каталог специалистов'
//                }, {
//                    text: 'Рабочие группы'
//                }, {
//                    text: 'Форум'
//                }, {
//                    text: 'Обучение'
//                }, {
                    text: 'Создать свой подраздел'
                }]
            })
        }),
        
        this.getCenterPanel().add({
            xtype: 'tabpanel',
            title: 'CRM',
            icon: '/images/icons/about.png',
            border: false,
            layout: 'fit',
            defaults: {
                icon: '/images/icons/about.png',
                border: false
            },
            items: [{
                title: 'Проекты в работе'
            }, {
                title: 'Участники проектов'
            }, {
                title: 'Документы проектов'
            }, {
                title: 'Платежи'
            }, {
                title: 'Методики'
            }, {
                title: 'Справочники'
            }, {
                title: 'Создать свой подраздел'
            }]
        });
        
        this.getCenterPanel().add({
            title: 'Почта',
            icon: '/images/icons/about.png',
            border: false,
            tbar: Ext.create('widget.toolbar', {
                defaults: {
                    icon: '/images/icons/about.png'
                },
                items: [{
                    text: 'Системная почта'
                }, {
                    text: 'Корп. сотовая связь'
                }, {
                    text: 'Корп. стационарная связь'
                }, {
                    text: 'Чат'
                }, {
                    text: 'Видеочат'
                }, {
                    text: 'Создать свой подраздел'
                }]
            })
        });
        
        this.getCenterPanel().add({
            title: 'Зона отдыха',
            icon: '/images/icons/about.png',
            border: false,
            tbar: Ext.create('widget.toolbar', {
                defaults: {
                    icon: '/images/icons/about.png'
                },
                items: [{
                    text: 'ТВ'
                }, {
                    text: 'Радио'
                }, {
                    text: 'Видео база данных'
                }, {
                    text: 'Музыка база данных'
                }, {
                    text: 'Игры'
                }, {
                    text: 'Создать свой подраздел'
                }]
            })
        });

        // Make first tab active
        this.getCenterPanel().down('MainPanel').show();
    },
    
    openWidget: function(button) {

        console.log('Hi from all widgets');
        
        var tab = Ext.ComponentQuery.query('portalpanel{isVisible(true)}')[0];
        if (!tab) {
            return;
        }
        
        var config = button.initConfig || button;
        if (!config.allowMultiple && tab.down('[launchModule=' + config.launchModule + ']')) {
            return;
        }
        
        config.initConfig = config;
        
        var container = Ext.create('xlib.portal.Portlet', config);
        container.setHeight(config.portletHeight || 300);
        
        var pos = config.position ? '[id=' + config.position + ']' : '',
            column = tab.down(pos) || tab.down();
        tab.show();
        column.insert(0, container).show();
            
        if (config.launchModule) {
            this.getController(config.launchModule).init(container);
        }
        tab.doLayout();
    }
});