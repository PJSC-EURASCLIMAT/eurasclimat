Ext.define('EC.Experts.view.Experts.Info', {

    extend: 'Ext.window.Window',

    title: 'Карточка Специалиста',

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
        layout: 'fit',
        autoScroll: true
    }],

    alias: ['widget.ExpertInfo'],

    layout: 'fit',

    initComponent: function() {

        this.showTpl = Ext.create('Ext.XTemplate',
            '<div style="padding: 10px;"><table width="100%" border="0">',
            '<tr valign="top">',

            '<td rowspan="2" width="320">',
//            '<tpl if="[values.images.length] &gt; 0">',
//            '<img src="/images/catalog/{[values.images[0].name]}"/>',
//            '<tpl else>',
//            '<img src="http://placehold.it/300x220"/>',
//            '</tpl>',
            '<p>Имя: <b>{name}</b></p>',
            '<p>Описание: <b>{desc}</b></p>',
            '<p>Статус: <b>{status}</b></p>',
            '<p>Тип инж. оборудования: <b>{equipment}</b></p>',
            '<p>Город: <b>{city}</b></p>',
            '<p>Страна: <b>{country}</b></p>',

            '</td></tr></table></div>'
        );

        this.callParent(arguments);
    }

});