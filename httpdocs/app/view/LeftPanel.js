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
        height: 150,
        items: [{
            xtype: 'image',
            src: '/images/logo.png',
            margin: 20,
            width: 120, 
            height: 109
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
                var tab = this.getCenterPanel().add({
                    title: 'Каталог' 
                }).show();
                var controller = Ext.create('EC.Catalog.controller.Main', {
                    application: this.application
                });
                this.application.controllers.add(controller);
                controller.init(tab);
            }
        }, {
            text: 'Виджет'
        }, {
            text: 'Другой виджет'
        }, {
            text: 'И ещё виджет'
        }]
    }]
});