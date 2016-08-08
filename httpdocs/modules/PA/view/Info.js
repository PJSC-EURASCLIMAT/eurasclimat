Ext.define('EC.PA.view.Info', {

    extend: 'EC.Main.view.Info',

    title: 'Профиль',

    titleField: 'name',

    showTpl: Ext.create('Ext.XTemplate',

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
        'Переходил на ukkom.ru: {[this.getUkkom(values.ukkom)]}<br/><br/>',
        '</td>',
        '</tr>',

        '<tpl if="this.isExpert(values)">',
        '<tr valign="top">',
        '<td colspan="2">',
        '<p><b>Специализация</b><p>',
        '<p>Описание: {expert_info.desc}</p>',
        '<p>Тип инженерного оборудования: {expert_info.equipment}</p>',
        '<p>Статус: {expert_info.status}</p>',
        '<p>Рейтинг: {expert_info.rating}</p>',
        '<p>Стаж профильной работы: {expert_info.work_years}</p>',
        '<p>Стаж профильного обучения: {expert_info.study_years}</p>',
        '<p>Количество сертификатов: {expert_info.sert_count}</p>',
        '</td>',
        '</tr>',
        '</tpl>',
        '</table>',

        {
            getUkkom: function(ukkom) {
                return ( parseInt(ukkom) ) ? 'да' : 'нет';
            },

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

    ),

    items: [{
        xtype: 'panel',
        bodyPadding: 10,
        layout: 'fit',
        autoScroll: true
    }]

});