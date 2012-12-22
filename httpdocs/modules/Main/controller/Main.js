Ext.define('EC.Main.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    init: function(container) {
        
        if (container.down('MainPanel')) {
            container.down('MainPanel').show();
            return;
        }
        this.mainPanel = container.add({xtype: 'MainPanel'});
        this.mainPanel.show();
        
        this.control({
            'MainPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'MainPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
        
        this.openModulePortlet({
            title: 'О системе',
            height: 600,
            launchModule: 'EC.Main.controller.About' 
        });
        
        this.openModulePortlet({
            title: 'Новости',
            height: 600,
            position: 'MainPanel-column-2',
            launchModule: 'EC.Main.controller.News' 
        });
        
        this.openModulePortlet({
            title: 'Курсы валют',
            height: 600,
            position: 'MainPanel-column-2',
            launchModule: 'EC.Main.controller.Currency' 
        });
    }
});