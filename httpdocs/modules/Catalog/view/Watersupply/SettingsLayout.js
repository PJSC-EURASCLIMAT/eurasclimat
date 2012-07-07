Ext.define('EC.Catalog.view.Watersupply.SettingsLayout', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.WatersupplySettingsLayout',

    title: 'Настройки каталога "Водоснабжение"',
    
    layout: 'fit',
    
    width: 800,
    
    height: 500,
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    initComponent: function() {
        
        this.items = [{
            xtype: 'tabpanel',
            defaults: {
                xtype: 'SettingsList',
                layout: 'fit'
            },
            items: [{
                title: 'Группы оборудования',
                entity: 'watersupply_groups'
//            }, {
//                title: 'Марки',
//                entity: 'watersupply_marks'
            }]
        }];

        this.callParent(arguments);
    }
});