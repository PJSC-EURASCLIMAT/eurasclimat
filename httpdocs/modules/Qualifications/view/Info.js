Ext.define('EC.Qualifications.view.Info', {

    extend: 'EC.Main.view.Info',

    title: 'Квалификация',

    titleField: 'name',

    alias: ['widget.qualification-info'],

    showTpl: Ext.create('Ext.XTemplate',
        '<div style="padding:10px;">',
        '<b>Наименование: </b> {name}<br/><br/>',
        '<b>Тип: </b> {type_name}<br/><br/>',
        '</div>'
    )
});