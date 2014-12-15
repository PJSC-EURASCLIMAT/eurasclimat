Ext.define('EC.Contractors.view.Info', {

    extend: 'EC.Main.view.Info',

    title: 'Карточка поставщика',

    titleField: 'name',
    
    alias: ['widget.Contractors-info'],
    
    width: 500,
    
    height: 700,

    showTpl: Ext.create('Ext.XTemplate',
        '<div style="padding:10px;">',
        '<h1>{name}</h1><br/>',
        '<table>',
        	'<tr><td>Полное наименование:</td><td>{full_name}</td></tr>',
        	'<tr><td>Юридический адрес:</td><td>{legal_address}</td></tr>',
        	'<tr><td>Почтовый адрес:</td><td>{postal_address}</td></tr>',
        	'<tr><td>Форма организации:</td><td>{form_organization}</td></tr>',
        	'<tr><td>ОГРН:</td><td>{ogrn}</td></tr>',
        	'<tr><td>ОКВЭД:</td><td>{okved}</td></tr>',
        	'<tr><td>ОКАТО:</td><td>{okato}</td></tr>',
        	'<tr><td>ОКПО:</td><td>{okpo}</td></tr>',
        	'<tr><td>ИНН/КПП:</td><td>{inn_kpp}</td></tr>',
        	'<tr><td>Р/счет:</td><td>{bank_account}</td></tr>',
        	'<tr><td>Банк:</td><td>{bank}</td></tr>',
        	'<tr><td>БИК:</td><td>{bik}</td></tr>',
        	'<tr><td>Кор.счет:</td><td>{corr_account}</td></tr>',
        	'<tr><td>Ген.директор:</td><td>{general_director}</td></tr>',
        	'<tr><td>Главный бухгалтер:</td><td>{chief_accountant}</td></tr>',
        	'<tr><td>Телефон (секретарь):</td><td>{phone}</td></tr>',
        	'<tr><td>Сайт:</td><td>{site}</td></tr>',
        	'<tr><td>Тип инженерных систем:</td><td>{eng_sys_type_id}</td></tr>',
        	'<tr><td>Товар:</td><td>{goods}</td></tr>',
        	'<tr><td>Адрес:</td><td>{address}</td></tr>',
        	'<tr><td>Условия доставки:</td><td>{shipment}</td></tr>',
        	'<tr><td>Скидка %:</td><td>{discount}</td></tr>',
        	'<tr><td>Примечание:</td><td>{note}</td></tr>',
    	'</table>',
        '</div>'
    )
});