Ext.define('EC.Catalog.view.Heating.SettingsLayout', {
    
    extend: 'EC.Catalog.view.SettingsLayoutAbstract',
    
    alias: 'widget.HeatingSettingsLayout',

    title: 'Настройки каталога "Отопление"',
    
    settings: [{
        title: 'Группы оборудования',
        entity: 'heating_groups'
    }, {
        title: 'Типы продукции',
        entity: 'heating_product_types'
    }, {
        title: 'Типы исполнения',
        entity: 'heating_implementation_types'
    }, {
        title: 'Способ управления системой',
        entity: 'heating_control_types'
    }, {
        title: 'Тип присоединения',
        entity: 'heating_connection_types'
    }, {
        title: 'Тип защиты',
        entity: 'heating_protection_types'
    }, {
        title: 'Материал',
        entity: 'heating_materials'
    }, {
        title: 'Источник питания',
        entity: 'heating_power_sources'
    }]
});