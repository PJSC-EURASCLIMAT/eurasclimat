Ext.define('EC.Admin.controller.Acl', {
    
    extend: 'Ext.app.Controller',

    stores: [
        'EC.Admin.store.Roles'
    ],
    
    models: [
        'EC.Admin.model.Roles'
    ],
    
    views: [
        'EC.Admin.view.Roles.List'
    ],
    
    init: function(container) {
        
        if ('portlet' == container.getXType()) {
            
            container.add({
                xtype: 'panel',
                layout: 'fit',
                html: 'Разверите для просмотра',
                preventHeader: true,
                border: false
            });
            
        } else {
            
            container.setLoading('Загрузка...', true);
            
            container.add({
                layout: 'border',
                preventHeader: true,
                border: false,
                defaults: {
                    border: false
                },
                items: [{
                    xtype: 'AdminRolesList',
                    width: 300,
                    region: 'west',
                    cls: 'x-border-right',
                    margins: '0 5 0 0',
                    allowEditing: false,
                    title: 'Роли'
                }, {
                    xtype: 'panel',
                    region: 'center',
                    cls: 'x-border-left',
                    title: 'Ресурсы и привилегии'
                }],
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
        }
    }
});