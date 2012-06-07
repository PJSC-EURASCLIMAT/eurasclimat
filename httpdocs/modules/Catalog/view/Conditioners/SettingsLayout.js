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
                entity: 'groups'
            }, {
                title: 'Марки',
                entity: 'marks'
            }, {
                title: 'Типы продукции',
                entity: 'product_types'
            }, {
                title: 'Типы исполнения',
                entity: 'implementation_types'
            }]
        }];

        this.callParent(arguments);
    }
});