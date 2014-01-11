Ext.define('EC.PA.Profile.view.Info', {

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
        bodyPadding: 10,
        layout: 'fit',
        autoScroll: true
    }],

    alias: ['widget.ProfileInfo'],

    layout: 'fit',

    listeners: {
        close: function() {
            Ext.Router.redirect('');
        }
    },

    initComponent: function() {

        this.showTpl = Ext.create('Ext.XTemplate',

            '<table width="100%" border="0">',
                '<tr valign="top">',
                    '<td width="100">',
                        '<tpl if="have_avatar == 1">',
                            '<img src="images/users/{id}.jpg?{[this.dc()]}" width="100" style="float: left;margin-right: 15px">',
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

                '<tpl if="this.isExpert(values)">',
                    '<tr valign="top">',
                        '<td colspan="2">',
                            '<p><b>Специализация</b><p>',
                            '<p>Описание: {expert_desc}</p>',
                            '<p>Тип инженерного оборудования: {expert_equipment}</p>',
                            '<p>Статус: {expert_status}</p>',
                        '</td>',
                    '</tr>',
                '</tpl>',
            '</table>',

            {
                dc: function() {
                    return new Date().getTime();
                },
                isExpert: function(values) {
                    if(!Ext.isEmpty(values.expert_id)){
                        return true
                    }
                    return false;
                }
            }

        );

        this.callParent(arguments);
    }

});