Ext.define('App.view.LeftPanel', {

    extend: 'Ext.Panel',
    
    alias: 'widget.LeftPanel',

    region: 'west',
    
    layout: 'border', 
    
    width: 150,
    
    baseCls: 'xlib-bkg',
    
    border: false,
    
    items: [{
        region: 'north',
        baseCls: 'xlib-bkg',
        height: 110, 
        items: [{
            xtype: 'image',
            src: '/images/logo.png',
            margin: 15
        }]
    }, {
        region: 'center',
        baseCls: 'xlib-bkg',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 5,
        defaultType: 'button',
        defaults: {
            margins: 5,
            textAlign: 'left'
        },
        items: [{
            text: 'Каталог',
            lunch: function() {
                this.getCenterPanel().setLoading('Загрузка...', true);
                var controller = Ext.create('EC.Catalog.controller.Main', {
                    application: this.application
                });
                this.application.controllers.add(controller);
                controller.init();
            }
        }, {
            text: 'Виджет'
        }]
    }]
});