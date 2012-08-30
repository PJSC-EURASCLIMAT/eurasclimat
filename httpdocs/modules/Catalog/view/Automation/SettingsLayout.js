Ext.define('EC.Catalog.view.Automation.SettingsLayout', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.AutomationSettingsLayout',

    title: 'Настройки каталога "Автоматика"',
    
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
                entity: 'automation_groups'
            }, {
                title: 'Типы продукции',
                entity: 'automation_product_types'
            }, {
                title: 'Типы исполнения',
                entity: 'automation_implementation_types'
            }, {
                title: 'Способ управления системой',
                entity: 'automation_control_types'
            }, {
                title: 'Тип присоединения',
                entity: 'automation_connection_types'
            }, {
                title: 'Тип защиты',
                entity: 'automation_protection_types'
            }, {
                title: 'Материал',
                entity: 'automation_materials'
            }, {
                title: 'Источник питания',
                entity: 'automation_power_sources'
            }, {
                title: 'Тип изоляции',
                entity: 'automation_isolation_types'
            }]
        }];

        this.callParent(arguments);
    }
});