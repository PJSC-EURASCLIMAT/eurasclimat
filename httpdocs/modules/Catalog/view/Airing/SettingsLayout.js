Ext.define('EC.Catalog.view.Airing.SettingsLayout', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.AiringSettingsLayout',

    title: 'Настройки каталога "Вентиляция"',
    
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
                entity: 'airing_groups'
            }, {
                title: 'Типы продукции',
                entity: 'airing_product_types'
            }, {
                title: 'Типы исполнения',
                entity: 'airing_implementation_types'
            }, {
                title: 'Способ управления системой',
                entity: 'airing_control_types'
            }, {
                title: 'Тип присоединения',
                entity: 'airing_connection_types'
            }, {
                title: 'Тип защиты',
                entity: 'airing_protection_types'
            }, {
                title: 'Материал',
                entity: 'airing_materials'
            }, {
                title: 'Источник питания',
                entity: 'airing_power_sources'
            }, {
                title: 'Класс изоляции',
                entity: 'automation_isolation_clases'
            }]
        }];

        this.callParent(arguments);
    }
});