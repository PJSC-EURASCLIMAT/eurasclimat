Ext.define('EC.Catalog.view.Airing.SettingsLayout', {
    
    extend: 'EC.Catalog.view.SettingsLayoutAbstract',
    
    alias: 'widget.AiringSettingsLayout',

    title: 'Настройки каталога "Вентиляция"',
    
    settings: [{
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
});