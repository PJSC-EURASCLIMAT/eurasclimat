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
        this.mainPanel = container.add({xtype: 'MailPanel'});
        this.mainPanel.show();
       
        this.control({
            'MailPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});