Ext.define('EC.Catalog.view.Electricity.SettingsLayout', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.ElectricitySettingsLayout',

    title: 'Настройки каталога "Электрика"',
    
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
                entity: 'electricity_groups'
            }, {
                title: 'Типы продукции',
                entity: 'electricity_product_types'
            }, {
                title: 'Типы исполнения',
                entity: 'electricity_implementation_types'
            }, {
                title: 'Способ управления системой',
                entity: 'electricity_control_types'
            }, {
                title: 'Тип присоединения',
                entity: 'electricity_connection_types'
            }, {
                title: 'Тип защиты',
                entity: 'electricity_protection_types'
            }, {
                title: 'Материал',
                entity: 'electricity_materials'
            }, {
                title: 'Источник питания',
                entity: 'electricity_power_sources'
            }, {
                title: 'Тип изоляции',
                entity: 'electricity_isolation_types'
            }]
        }];

        this.callParent(arguments);
    }
});