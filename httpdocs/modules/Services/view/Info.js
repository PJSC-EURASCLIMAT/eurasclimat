Ext.define('EC.Services.view.Info', {

    extend: 'EC.Main.view.Info',

    title: 'Услуга',

    titleField: 'text',

    alias: ['widget.service-info'],

    showTpl: Ext.create('Ext.XTemplate',

        '<table width="100%" style="padding:10px" border="0">',
        '<tr><td width="130">Наименование:</td><td>{text}</td></tr>',
        '<tr><td>Тип инж. систем:</td><td>{eng_sys_type_name}</td></tr>',
        '<tr><td>НЧ:</td><td>{norm_hours}</td></tr>',
        '<tr><td>Разряд:</td><td>{min_rank}</td></tr>',
        '</table>'
    )

});