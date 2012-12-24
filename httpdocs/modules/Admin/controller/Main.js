Ext.define('EC.Admin.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Admin.view.Layout'],
    
    init: function(container) {
        
        if (container.down('AdminPanel')) {
            container.down('AdminPanel').show();
            return;
        }
        this.mainPanel = container.add({xtype: 'AdminPanel'});
        this.mainPanel.show();
        
        this.control({
            'AdminPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'AdminPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
        
        this.openModulePortlet({
            title: 'Роли',
            height: 600,
            iconCls: 'user-suit',
            position: 'AdminPanel-column-1',
            launchModule: 'EC.Admin.controller.Roles' 
        });
        
        this.openModulePortlet({
            title: 'Пользователи',
            height: 600,
            iconCls: 'user',
            position: 'AdminPanel-column-2',
            launchModule: 'EC.Admin.controller.Accounts' 
        });
        
        this.openModulePortlet({
            title: 'Права доступа',
            height: 600,
            iconCls: 'connect',
            position: 'AdminPanel-column-3',
            launchModule: 'EC.Admin.controller.Acl' 
        });
    }
});