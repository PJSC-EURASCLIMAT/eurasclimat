Ext.define('EC.Main.view.Info', {

    extend: 'Ext.window.Window',

    title: '',

    layout: 'fit',

    border: false,

    autoShow: true,

    resizable: true,

    maximizable: true,

    modal: true,

    width: 500,

    height: 300,

    titleField: null,

    showTpl: Ext.create('Ext.XTemplate',
        '<div style="padding:10px;">',
        '</div>'
    ),

    items: [{
        xtype: 'panel',
        layout: 'fit',
        autoScroll: true
    }]

});