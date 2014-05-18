Ext.define('EC.Main.view.News.Card', {

    extend: 'Ext.window.Window',

    title: 'Новость',

    layout: 'fit',

    border: false,

    autoShow: true,

    resizable: true,

    maximizable: true,

    modal: true,

    width: 500,

    height: 300,

    showTpl: null,

    items: [{
        xtype: 'panel',
        bodyPadding: 10,
        layout: 'fit',
        autoScroll: true
    }],

    initComponent: function() {
        this.showTpl = Ext.create('Ext.XTemplate',
            '<tpl for=".">' +
                '<p style="color: grey; padding-bottom: 10px;">{date}</p>' +
                'Автор: <a href="#">{author}</a> ' +
                'Категория: <a href="#">{category}</a>' +
                '<br/><br/>{long_text}' +
            '</tpl>'
        );

        this.callParent(arguments);
    }
});