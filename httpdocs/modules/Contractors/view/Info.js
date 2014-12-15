Ext.define('EC.Contractors.view.Info', {

    extend: 'EC.Main.view.Info',

    title: 'Карточка поставщика',

    titleField: 'name',
    
    alias: ['widget.Contractors-info'],
    
    width: 800,
    
    height: 700,

    showTpl: Ext.create('Ext.XTemplate',
        '<div style="padding:10px;">',
        '<h1>{name}</h1><br/>',
        '<table>',
        	'<tr><td>Полное наименование:</td><td><b>{full_name}</td></tr>',
        	'<tr><td>Юридический адрес:</td><td><b>{legal_address}</td></tr>',
        	'<tr><td>Почтовый адрес:</td><td><b>{postal_address}</td></tr>',
        	'<tr><td>Форма организации:</td><td><b>{form_organization}</td></tr>',
        	'<tr><td>ОГРН:</td><td><b>{ogrn}</td></tr>',
        	'<tr><td>ОКВЭД:</td><td><b>{okved}</td></tr>',
        	'<tr><td>ОКАТО:</td><td><b>{okato}</td></tr>',
        	'<tr><td>ОКПО:</td><td><b>{okpo}</td></tr>',
        	'<tr><td>ИНН/КПП:</td><td><b>{inn_kpp}</td></tr>',
        	'<tr><td>Р/счет:</td><td><b>{bank_account}</td></tr>',
        	'<tr><td>Банк:</td><td><b>{bank}</td></tr>',
        	'<tr><td>БИК:</td><td><b>{bik}</td></tr>',
        	'<tr><td>Кор.счет:</td><td><b>{corr_account}</td></tr>',
        	'<tr><td>Ген.директор:</td><td><b>{general_director}</td></tr>',
        	'<tr><td>Главный бухгалтер:</td><td><b>{chief_accountant}</td></tr>',
        	'<tr><td>Телефон (секретарь):</td><td><b>{phone}</td></tr>',
        	'<tr><td>Сайт:</td><td><b><a target="_blank" href="{site}">{site}</a></td></tr>',
        	'<tr><td>Тип инженерных систем:</td><td><b>{eng_sys_type_id}</td></tr>',
        	'<tr><td>Товар:</td><td><b>{goods}</td></tr>',
        	'<tr><td>Адрес:</td><td><b>{address}</td></tr>',
        	'<tr><td>Условия доставки:</td><td><b>{shipment}</td></tr>',
        	'<tr><td>Скидка %:</td><td><b>{discount}</td></tr>',
        	'<tr><td>Примечание:</td><td><b>{note}<b></td></tr>',
    	'</table>',
        '</div>'
    )
});