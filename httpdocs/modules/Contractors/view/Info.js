Ext.define('EC.Contractors.view.Info', {

    extend: 'EC.Main.view.Info',

    title: 'Карточка поставщика',

    titleField: 'name',

    alias: ['widget.Contractors-info'],

    showTpl: Ext.create('Ext.XTemplate',
        '<div style="padding:10px;">',
        '<b>Наименование: </b> {name}<br/><br/>',
        '</div>'
    )
});