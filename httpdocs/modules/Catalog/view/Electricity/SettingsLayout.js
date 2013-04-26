Ext.define('EC.Catalog.view.Electricity.SettingsLayout', {
    
    extend: 'EC.Catalog.view.SettingsLayoutAbstract',
    
    alias: 'widget.ElectricitySettingsLayout',

    title: 'Настройки каталога "Электрика"',
    
    settings: [{
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
});