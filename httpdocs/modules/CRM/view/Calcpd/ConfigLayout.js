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
        border: false,
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
            title: 'Типы помещений'
        }, {
            layout: 'border',
            itemId: 'pricePanel',
            border: false,
            bodyBorder: false,
            title: 'Конфигуратор стоимости',
            items: [{
                xtype: 'CalcpdObjTree',
                margins: '0 5 0 0',
                region: 'west',
                itemId: 'objTreePanel',
                width: 600
            }, {
                xtype: 'CalcpdConfigPriceForm',
                region: 'center',
                itemId: 'priceFormPanel'
            }]
        }]
    }]
});