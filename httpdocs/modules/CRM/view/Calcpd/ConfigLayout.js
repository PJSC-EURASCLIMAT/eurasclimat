Ext.define('EC.CRM.view.Calcpd.ConfigLayout', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 1000,
    
    height: 600,
    
    title: 'Настройки калькулятора проектной документации',
    
    items: [{
        xtype: 'tabpanel',
        items: [{
            layout: 'fit',
            itemId: 'servPanel',
            title: 'Услуги'
        }, {
            layout: 'fit',
            itemId: 'objTypePanel',
            title: 'Типы объектов'
        }, {
            layout: 'fit',
            itemId: 'objClassPanel',
            title: 'Классы объектов'
        }, {
            layout: 'fit',
            itemId: 'configPanel',
            title: 'Конфигуратор стоимости'
        }]
    }]
});