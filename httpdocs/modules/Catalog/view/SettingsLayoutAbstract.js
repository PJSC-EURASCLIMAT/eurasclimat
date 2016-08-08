Ext.define('EC.Catalog.view.SettingsLayoutAbstract', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    width: 800,
    
    height: 500,
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    settings: [],
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'tabpanel',
            defaults: {
                xtype: 'SettingsList',
                layout: 'fit'
            },
            items: this.settings || []
        }];

        this.callParent(arguments);
    }
});