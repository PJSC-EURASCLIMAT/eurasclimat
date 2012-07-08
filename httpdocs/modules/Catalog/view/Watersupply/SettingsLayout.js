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
            }, {
                title: 'Типы продукции',
                entity: 'watersupply_product_types'
            }, {
                title: 'Типы исполнения',
                entity: 'watersupply_implementation_types'
            }, {
                title: 'Способ управления системой',
                entity: 'watersupply_control_types'
            }, {
                title: 'Тип присоединения',
                entity: 'watersupply_connection_types'
            }, {
                title: 'Тип защиты',
                entity: 'watersupply_protection_types'
            }, {
                title: 'Материал',
                entity: 'watersupply_materials'
            }, {
                title: 'Источник питания',
                entity: 'watersupply_power_sources'
            }]
        }];

        this.callParent(arguments);
    }
});