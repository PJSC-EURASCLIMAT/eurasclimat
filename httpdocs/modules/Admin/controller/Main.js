Ext.define('EC.Admin.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Admin.view.Layout'],
    
    init: function(container) {
        
        if (container.down('AdminPanel')) {
            container.down('AdminPanel').show();
            return;
        }
        
        var MC = this.getController('App.controller.Main');
        
        var panel = container.add({xtype: 'AdminPanel'});
        panel.show();
        
        this.control({
            'AdminPanel > toolbar button': {
                click: MC.openModulePortlet,
                scope: MC
            }
        });
        
        MC.openModulePortlet({
            title: 'Роли',
            height: 600,
            iconCls: 'user-suit',
            position: 'AdminPanel-column-1',
            closable: false,
            launchModule: 'EC.Admin.controller.Roles' 
        });
        
        MC.openModulePortlet({
            title: 'Пользователи',
            height: 600,
            iconCls: 'user',
            position: 'AdminPanel-column-2',
            launchModule: 'EC.Admin.controller.Accounts' 
        });
        
        MC.openModulePortlet({
            title: 'Права доступа',
            height: 600,
            iconCls: 'connect',
            position: 'AdminPanel-column-3',
            launchModule: 'EC.Admin.controller.Acl' 
        });
    }
});