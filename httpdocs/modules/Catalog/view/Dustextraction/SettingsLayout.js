Ext.define('EC.Catalog.view.Dustextraction.SettingsLayout', {
    
    extend: 'EC.Catalog.view.SettingsLayoutAbstract',
    
    alias: 'widget.DustextractionSettingsLayout',

    title: 'Настройки каталога "Пылеудаление"',
    
    settings: [{
        title: 'Группы оборудования',
        entity: 'dustextraction_groups'
    }, {
        title: 'Тип мотора',
        entity: 'dustextraction_motors'
    }, {
        title: 'Фильтрация',
        entity: 'dustextraction_filtrations'
    }]
});