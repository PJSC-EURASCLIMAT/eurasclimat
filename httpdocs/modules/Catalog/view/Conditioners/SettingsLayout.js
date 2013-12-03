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
        title: 'Типы исполнения системы',
        entity: 'conditioners_implementation_types'
    }]
});