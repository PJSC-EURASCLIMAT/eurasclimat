Ext.define('EC.Mail.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Mail.view.Layout'
    ],
    
    init: function(container) {
        
        if (container.down('MailPanel')) {
            container.down('MailPanel').show();
            return;
        }
        container.add({
            xtype: 'MailPanel',
            listeners: {
                show: function() {
                    var MC = this.getController('App.controller.Main');
                    MC.populateStaticMenu(this.getMenu());
                },
                scope: this
            }
        });
    },
    
    getMenu: function() {
        return [{
            text: 'Корпоративная связь 1'
        }, {
            text: 'Корпоративная связь 2'
        }];
    }
});