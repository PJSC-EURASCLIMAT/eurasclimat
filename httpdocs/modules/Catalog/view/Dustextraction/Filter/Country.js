Ext.define('EC.Catalog.view.Dustextraction.Filter.Country', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.DustextractionFilterCountry'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Страна',
    
    editable: false,
    
    fieldName: 'country',
    
    value: '',
    
    store: { 
        
        storeId: ['DustextractionFilterCountry'],
    
        fields: ['id', 'name'], 
        
        data: [
            {id: '', name: '- Не выбрано -'},
            {id: 'AD', name: 'Андорра'},
            {id: 'AE', name: 'Объединенные Арабские Эмираты'},
            {id: 'AF', name: 'Афганистан'},
            {id: 'AG', name: 'Антигуа и Барбуда'},
            {id: 'AI', name: 'Ангуилла'},
            {id: 'AL', name: 'Албания'},
            {id: 'AM', name: 'Армения'},
            {id: 'AN', name: 'Нидерландские Антильские острова'},
            {id: 'AO', name: 'Ангола'},
            {id: 'AQ', name: 'Антарктика'},
            {id: 'AR', name: 'Аргентина'},
            {id: 'AS', name: 'Американское Самоа'},
            {id: 'AT', name: 'Австрия'},
            {id: 'AU', name: 'Австралия'},
            {id: 'AW', name: 'Аруба'},
            {id: 'AX', name: 'Аландские острова'},
            {id: 'AZ', name: 'Азербайджан'},
            {id: 'BA', name: 'Босния и Герцеговина'},
            {id: 'BB', name: 'Барбадос'},
            {id: 'BD', name: 'Бангладеш'},
            {id: 'BE', name: 'Бельгия'},
            {id: 'BF', name: 'Буркина Фасо'},
            {id: 'BG', name: 'Болгария'},
            {id: 'BH', name: 'Бахрейн'},
            {id: 'BI', name: 'Бурунди'},
            {id: 'BJ', name: 'Бенин'},
            {id: 'BL', name: 'Остров Святого Бартоломея'},
            {id: 'BM', name: 'Бермудские Острова'},
            {id: 'BN', name: 'Бруней Даруссалам'},
            {id: 'BO', name: 'Боливия'},
            {id: 'BR', name: 'Бразилия'},
            {id: 'BS', name: 'Багамские острова'},
            {id: 'BT', name: 'Бутан'},
            {id: 'BV', name: 'Остров Буве'},
            {id: 'BW', name: 'Ботсвана'},
            {id: 'BY', name: 'Беларусь'},
            {id: 'BZ', name: 'Белиз'},
            {id: 'CA', name: 'Канада'},
            {id: 'CC', name: 'Кокосовые острова'},
            {id: 'CD', name: 'Демократическая Республика Конго'},
            {id: 'CF', name: 'Центрально-Африканская Республика'},
            {id: 'CG', name: 'Конго'},
            {id: 'CH', name: 'Швейцария'},
            {id: 'CI', name: 'Кот д’Ивуар'},
            {id: 'CK', name: 'Острова Кука'},
            {id: 'CL', name: 'Чили'},
            {id: 'CM', name: 'Камерун'},
            {id: 'CN', name: 'Китай'},
            {id: 'CO', name: 'Колумбия'},
            {id: 'CR', name: 'Коста-Рика'},
            {id: 'CS', name: 'Сербия и Черногория'},
            {id: 'CU', name: 'Куба'},
            {id: 'CV', name: 'Острова Зеленого Мыса'},
            {id: 'CX', name: 'Остров Рождества'},
            {id: 'CY', name: 'Кипр'},
            {id: 'CZ', name: 'Чешская республика'},
            {id: 'DE', name: 'Германия'},
            {id: 'DJ', name: 'Джибути'},
            {id: 'DK', name: 'Дания'},
            {id: 'DM', name: 'Остров Доминика'},
            {id: 'DO', name: 'Доминиканская Республика'},
            {id: 'DZ', name: 'Алжир'},
            {id: 'EC', name: 'Эквадор'},
            {id: 'EE', name: 'Эстония'},
            {id: 'EG', name: 'Египет'},
            {id: 'EH', name: 'Западная Сахара'},
            {id: 'ER', name: 'Эритрея'},
            {id: 'ES', name: 'Испания'},
            {id: 'ET', name: 'Эфиопия'},
            {id: 'FI', name: 'Финляндия'},
            {id: 'FJ', name: 'Фиджи'},
            {id: 'FK', name: 'Фолклендские острова'},
            {id: 'FM', name: 'Федеративные Штаты Микронезии'},
            {id: 'FO', name: 'Фарерские острова'},
            {id: 'FR', name: 'Франция'},
            {id: 'GA', name: 'Габон'},
            {id: 'GB', name: 'Великобритания'},
            {id: 'GD', name: 'Гренада'},
            {id: 'GE', name: 'Грузия'},
            {id: 'GF', name: 'Французская Гвиана'},
            {id: 'GG', name: 'Гернси'},
            {id: 'GH', name: 'Гана'},
            {id: 'GI', name: 'Гибралтар'},
            {id: 'GL', name: 'Гренландия'},
            {id: 'GM', name: 'Гамбия'},
            {id: 'GN', name: 'Гвинея'},
            {id: 'GP', name: 'Гваделупа'},
            {id: 'GQ', name: 'Экваториальная Гвинея'},
            {id: 'GR', name: 'Греция'},
            {id: 'GS', name: 'Южная Джорджия и Южные Сандвичевы Острова'},
            {id: 'GT', name: 'Гватемала'},
            {id: 'GU', name: 'Гуам'},
            {id: 'GW', name: 'Гвинея-Биссау'},
            {id: 'GY', name: 'Гайана'},
            {id: 'HK', name: 'Гонконг'},
            {id: 'HM', name: 'Острова Херд и Макдональд'},
            {id: 'HN', name: 'Гондурас'},
            {id: 'HR', name: 'Хорватия'},
            {id: 'HT', name: 'Гаити'},
            {id: 'HU', name: 'Венгрия'},
            {id: 'ID', name: 'Индонезия'},
            {id: 'IE', name: 'Ирландия'},
            {id: 'IL', name: 'Израиль'},
            {id: 'IM', name: 'Остров Мэн'},
            {id: 'IN', name: 'Индия'},
            {id: 'IO', name: 'Британская территория в Индийском океане'},
            {id: 'IQ', name: 'Ирак'},
            {id: 'IR', name: 'Иран'},
            {id: 'IS', name: 'Исландия'},
            {id: 'IT', name: 'Италия'},
            {id: 'JE', name: 'Джерси'},
            {id: 'JM', name: 'Ямайка'},
            {id: 'JO', name: 'Иордания'},
            {id: 'JP', name: 'Япония'},
            {id: 'KE', name: 'Кения'},
            {id: 'KG', name: 'Кыргызстан'},
            {id: 'KH', name: 'Камбоджа'},
            {id: 'KI', name: 'Кирибати'},
            {id: 'KM', name: 'Коморские Острова'},
            {id: 'KN', name: 'Сент-Киттс и Невис'},
            {id: 'KP', name: 'Корейская Народно-Демократическая Республика'},
            {id: 'KR', name: 'Республика Корея'},
            {id: 'KW', name: 'Кувейт'},
            {id: 'KY', name: 'Каймановы острова'},
            {id: 'KZ', name: 'Казахстан'},
            {id: 'LA', name: 'Лаос'},
            {id: 'LB', name: 'Ливан'},
            {id: 'LC', name: 'Сент-Люсия'},
            {id: 'LI', name: 'Лихтенштейн'},
            {id: 'LK', name: 'Шри-Ланка'},
            {id: 'LR', name: 'Либерия'},
            {id: 'LS', name: 'Лесото'},
            {id: 'LT', name: 'Литва'},
            {id: 'LU', name: 'Люксембург'},
            {id: 'LV', name: 'Латвия'},
            {id: 'LY', name: 'Ливия'},
            {id: 'MA', name: 'Марокко'},
            {id: 'MC', name: 'Монако'},
            {id: 'MD', name: 'Молдова'},
            {id: 'ME', name: 'Черногория'},
            {id: 'MF', name: 'Остров Святого Мартина'},
            {id: 'MG', name: 'Мадагаскар'},
            {id: 'MH', name: 'Маршалловы Острова'},
            {id: 'MK', name: 'Македония'},
            {id: 'ML', name: 'Мали'},
            {id: 'MM', name: 'Мьянма'},
            {id: 'MN', name: 'Монголия'},
            {id: 'MO', name: 'Макао'},
            {id: 'MP', name: 'Северные Марианские Острова'},
            {id: 'MQ', name: 'Мартиник'},
            {id: 'MR', name: 'Мавритания'},
            {id: 'MS', name: 'Монсеррат'},
            {id: 'MT', name: 'Мальта'},
            {id: 'MU', name: 'Маврикий'},
            {id: 'MV', name: 'Мальдивы'},
            {id: 'MW', name: 'Малави'},
            {id: 'MX', name: 'Мексика'},
            {id: 'MY', name: 'Малайзия'},
            {id: 'MZ', name: 'Мозамбик'},
            {id: 'NA', name: 'Намибия'},
            {id: 'NC', name: 'Новая Каледония'},
            {id: 'NE', name: 'Нигер'},
            {id: 'NF', name: 'Остров Норфолк'},
            {id: 'NG', name: 'Нигерия'},
            {id: 'NI', name: 'Никарагуа'},
            {id: 'NL', name: 'Нидерланды'},
            {id: 'NO', name: 'Норвегия'},
            {id: 'NP', name: 'Непал'},
            {id: 'NR', name: 'Науру'},
            {id: 'NU', name: 'Ниуе'},
            {id: 'NZ', name: 'Новая Зеландия'},
            {id: 'OM', name: 'Оман'},
            {id: 'PA', name: 'Панама'},
            {id: 'PE', name: 'Перу'},
            {id: 'PF', name: 'Французская Полинезия'},
            {id: 'PG', name: 'Папуа-Новая Гвинея'},
            {id: 'PH', name: 'Филиппины'},
            {id: 'PK', name: 'Пакистан'},
            {id: 'PL', name: 'Польша'},
            {id: 'PM', name: 'Сен-Пьер и Микелон'},
            {id: 'PN', name: 'Питкерн'},
            {id: 'PR', name: 'Пуэрто-Рико'},
            {id: 'PS', name: 'Палестинская автономия'},
            {id: 'PT', name: 'Португалия'},
            {id: 'PW', name: 'Палау'},
            {id: 'PY', name: 'Парагвай'},
            {id: 'QA', name: 'Катар'},
            {id: 'RE', name: 'Реюньон'},
            {id: 'RO', name: 'Румыния'},
            {id: 'RS', name: 'Сербия'},
            {id: 'RU', name: 'Россия'},
            {id: 'RW', name: 'Руанда'},
            {id: 'SA', name: 'Саудовская Аравия'},
            {id: 'SB', name: 'Соломоновы Острова'},
            {id: 'SC', name: 'Сейшельские Острова'},
            {id: 'SD', name: 'Судан'},
            {id: 'SE', name: 'Швеция'},
            {id: 'SG', name: 'Сингапур'},
            {id: 'SH', name: 'Остров Святой Елены'},
            {id: 'SI', name: 'Словения'},
            {id: 'SJ', name: 'Свальбард и Ян-Майен'},
            {id: 'SK', name: 'Словакия'},
            {id: 'SL', name: 'Сьерра-Леоне'},
            {id: 'SM', name: 'Сан-Марино'},
            {id: 'SN', name: 'Сенегал'},
            {id: 'SO', name: 'Сомали'},
            {id: 'SR', name: 'Суринам'},
            {id: 'ST', name: 'Сан-Томе и Принсипи'},
            {id: 'SV', name: 'Сальвадор'},
            {id: 'SY', name: 'Сирийская Арабская Республика'},
            {id: 'SZ', name: 'Свазиленд'},
            {id: 'TC', name: 'Острова Тёркс и Кайкос'},
            {id: 'TD', name: 'Чад'},
            {id: 'TF', name: 'Французские Южные Территории'},
            {id: 'TG', name: 'Того'},
            {id: 'TH', name: 'Таиланд'},
            {id: 'TJ', name: 'Таджикистан'},
            {id: 'TK', name: 'Токелау'},
            {id: 'TL', name: 'Восточный Тимор'},
            {id: 'TM', name: 'Туркменистан'},
            {id: 'TN', name: 'Тунис'},
            {id: 'TO', name: 'Тонга'},
            {id: 'TR', name: 'Турция'},
            {id: 'TT', name: 'Тринидад и Тобаго'},
            {id: 'TV', name: 'Тувалу'},
            {id: 'TW', name: 'Тайвань'},
            {id: 'TZ', name: 'Танзания'},
            {id: 'UA', name: 'Украина'},
            {id: 'UG', name: 'Уганда'},
            {id: 'UM', name: 'Внешние малые острова (США)'},
            {id: 'US', name: 'США'},
            {id: 'UY', name: 'Уругвай'},
            {id: 'UZ', name: 'Узбекистан'},
            {id: 'VA', name: 'Ватикан'},
            {id: 'VC', name: 'Сент-Винсент и Гренадины'},
            {id: 'VE', name: 'Венесуэла'},
            {id: 'VG', name: 'Британские Виргинские Острова'},
            {id: 'VI', name: 'Американские Виргинские Острова'},
            {id: 'VN', name: 'Вьетнам'},
            {id: 'VU', name: 'Вануату'},
            {id: 'WF', name: 'Уоллис и Футуна'},
            {id: 'WS', name: 'Самоа'},
            {id: 'YE', name: 'Йемен'},
            {id: 'YT', name: 'Майотта'},
            {id: 'ZA', name: 'Южная Африка'},
            {id: 'ZM', name: 'Замбия'},
            {id: 'ZW', name: 'Зимбабве'}
        ] 
    },
    
    getFilter: function() {
        return this.getValue(); 
    }
});