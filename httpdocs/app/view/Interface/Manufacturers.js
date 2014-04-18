Ext.define('App.view.Interface.Manufacturers', {

    extend: 'App.view.PortalLayoutAbstarct',

    alias: 'widget.ManufacturersPanel',
    
    title: 'Производители оборудования',
    
    icon: '/images/icons/trade_platform.png',
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Manufacturers-Partners-column-1'
        }, {
            id: 'Manufacturers-Partners-column-2'
        }, {
            id: 'Manufacturers-Partners-column-3'
        }]
    }]
});