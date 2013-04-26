Ext.define('EC.Catalog.view.Conditioners.SettingsLayout', {
    
    extend: 'EC.Catalog.view.SettingsLayoutAbstract',
    
    alias: 'widget.ConditionersSettingsLayout',

    title: 'Настройки каталога "Кондиционирование"',
    
    settings: [{
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
});