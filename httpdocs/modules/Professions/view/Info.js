Ext.define('EC.Professions.view.Info', {

    extend: 'EC.Main.view.Info',

    title: 'Профессия',

    titleField: 'name',

    alias: ['widget.qualification-info'],

    showTpl: Ext.create('Ext.XTemplate',

        '<table width="100%" style="padding:10px" border="0">',
        '<tr><td width="150">Код:</td><td>{id}</td></tr>',
        '<tr><td>КЧ:</td><td>{kch}</td></tr>',
        '<tr><td>Наименование:</td><td>{name}</td></tr>',
        '<tr><td>Тип инж. систем:</td><td>{eng_sys_type_name}</td></tr>',
        '<tr><td>Уровень квалификации:</td><td>{qualification_name}</td></tr>',
        '<tr><td>Базовая ставка:</td><td>{base_salary} р.</td></tr>',
        '<tr><td>Стоимость НЧ:</td><td>{[this.normHourCost(values.base_salary)]} р.</td></tr>',
        '<tr><td>Коэффициэнт:</td><td>{factor}</td></tr>',
        '<tr><td>Код выпуска ЕТКС:</td><td>{etks}</td></tr>',
        '<tr><td>Код по ОКЗ:</td><td>{okz}</td></tr>',
        '</table>'

        ,{
            normHourCost: function(base_salary) {
                return Math.ceil(parseInt(base_salary) / 22 / 8);
            }
        }
    )

});