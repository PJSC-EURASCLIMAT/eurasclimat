Ext.define('EC.Catalog.view.Dustextraction.SettingsLayout', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.DustextractionSettingsLayout',

    title: 'Настройки каталога "Пылеудаление"',
    
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
                entity: 'dustextraction_groups'
            }, {
                title: 'Тип мотора',
                entity: 'dustextraction_motors'
            }, {
                title: 'Фильтрация',
                entity: 'dustextraction_filtrations'
            }]
        }];

        this.callParent(arguments);
    }
});