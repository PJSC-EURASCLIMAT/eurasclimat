Ext.define('EC.Catalog.view.Conditioners.SettingsLayout', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.ConditionersSettingsLayout',

    title: 'Настройки каталога "Кондиционирование"',
    
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
                entity: 'conditioners_groups'
            }, {
                title: 'Типы продукции',
                entity: 'conditioners_product_types'
            }, {
                title: 'Типы исполнения',
                entity: 'conditioners_implementation_types'
            }, {
                title: 'Способ управления системой',
                entity: 'conditioners_control_types'
            }, {
                title: 'Тип присоединения',
                entity: 'conditioners_connection_types'
            }, {
                title: 'Тип защиты',
                entity: 'conditioners_protection_types'
            }, {
                title: 'Материал',
                entity: 'conditioners_materials'
            }, {
                title: 'Источник питания',
                entity: 'conditioners_power_sources'
            }]
        }];

        this.callParent(arguments);
    }
});