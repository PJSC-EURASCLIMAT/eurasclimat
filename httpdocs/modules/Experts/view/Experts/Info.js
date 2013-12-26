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

    listeners: {
        close: function() {
            Ext.Router.redirect('');
        }
    },

    initComponent: function() {

        this.showTpl = Ext.create('Ext.XTemplate',
            '<table width="100%" style="padding:10px" border="0">',
            '<tr valign="top">',
            '<td width="100">',
            '<tpl if="have_avatar == 1">',
            '<img src="images/users/{account_id}.jpg?{[this.dc()]}" width="100" style="float: left;margin-right: 15px">',
            '<tpl else>',
            '<img src="http://placehold.it/100x100" style="float: left;margin-right: 15px"/>',
            '</tpl>',
            '</td>',
            '<td>',
            'ФИО: {name}<br/><br/>',
            'Email: {login}<br/><br/>',
            'г. {city}, {country}<br/><br/>',
            '</td>',
            '</tr>',

            '<tr valign="top">',
            '<td colspan="2">',
            '<p><b>Специализация</b><p>',
            '<p>Описание: {desc}</p>',
            '<p>Тип инженерного оборудования: {equipment}</p>',
            '<p>Статус: {status}</p>',
            '</td>',
            '</tr>',
            {
                dc: function() {
                    return new Date().getTime();
                }
            }
        );

        this.callParent(arguments);
    }

});