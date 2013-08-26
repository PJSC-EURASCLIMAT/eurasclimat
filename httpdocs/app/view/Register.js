Ext.define('App.view.Register', {
    
    extend: 'Ext.window.Window',
    
    uses: [
        'xlib.CountryCombo',
        'xlib.LanguageCombo'
    ],
    
    title: 'Регистрация пользователя системы',
    
    border: false,
    
    autoShow: true,
    
    autoScroll: true,
    
    modal: true,
    
    width: 600,

    height: 600,
    
    constrain: true,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                msgTarget: 'side'
            },
            items: [{
                xtype: 'fieldset',
                title: 'Общие данные',
                defaultType: 'textfield',
                layout: {
                    type: 'table',
                    columns: 2,
                    tdAttrs: {
                        width: '50%',
                        style: 'padding: 10px 0; font-size: x-small; text-align: justify;',
                        valign: 'top'
                    }
                },
                items: [{
                    name: 'login',
                    fieldLabel: 'Логин <sup style="color: red;">*</sup>',
                    allowBlank: false,
                    minLength: 3,
                    maxLength: 15
                }, {
                    xtype: 'label',
                    style: 'font-weight: 900; line-height: 21px;',
                    html: '@eurasclimat.ru'
                }, {
                    name: 'name',
                    allowBlank: false,
                    fieldLabel: 'ФИО <sup style="color: red;">*</sup>'
                }, {
                    xtype: 'label',
                    html: 'Просим вас указать настоящие имя и фамилию. ' +
                          'Это поможет восстановить доступ к сервисам ' +
                          'OAO "Евразклимат", если вы забудете свой пароль.'
                }, {
                    name: 'email',
                    allowBlank: false,
                    vtype: 'email',
                    fieldLabel: 'Email <sup style="color: red;">*</sup>'
                }, {
                    xtype: 'label',
                    html: 'Этот адрес можно использовать для обращения в службу поддержки. ' +
                          'Также на него будет выслан <a href="#">запрос о подтверждении</a>.'
                }, {
                    name: 'phone',
                    allowBlank: false,
                    vtype: 'phone',
                    fieldLabel: 'Моб. тел. <sup style="color: red;">*</sup>'
                }, {
                    xtype: 'label',
                    html: 'В формате +79161231122. Если вы забудете пароль,' +
                          'мы сможем отправить вам SMS с кодом для его восстановления. ' +
                          'На следующей странице будет показана <a href="#">инструкция</a> ' +
                          'для подтверждения номера телефона.'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Пароль доступа',
                defaultType: 'textfield',
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [{
                    inputType: 'password',
                    allowBlank: false,
                    fieldLabel: 'Придумайте пароль <sup style="color: red;">*</sup>',
                    labelWidth: 150,
                    minLength: 3,
                    maxLength: 15,
                    itemId: 'passwordFieldRegister',
                    name: 'password',
                    listeners: {
                        validitychange: function(field){
                            this.up('form').down('#passwordFieldRegisterConfirm').validate();
                        },
                        blur: function(field){
                            this.up('form').down('#passwordFieldRegisterConfirm').validate();
                        }
                    }
                }, {
                    xtype: 'label',
                    style: 'padding-left: 10px; font-size: x-small;',
                    html: '<a href="#">Как выбрать пароль</a>'
                }, {
                    inputType: 'password',
                    allowBlank: false,
                    fieldLabel: 'Повторите пароль <sup style="color: red;">*</sup>',
                    labelWidth: 150,
                    minLength: 3,
                    maxLength: 15,
                    vtype: 'password',
                    itemId: 'passwordFieldRegisterConfirm',
                    initialPassField: 'passwordFieldRegister'
                }, {
                    xtype: 'label'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Локальные настройки',
                defaultType: 'textfield',
                layout: {
                    type: 'table',
                    columns: 2,
                    tdAttrs: {
                        width: '50%',
                        style: 'padding: 10px 0; font-size: x-small; text-align: justify;',
                        valign: 'top'
                    }
                },
                items: [{
                    xtype: 'LanguageCombo',
                    name: 'lang',
                    hiddenName: 'lang',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 300
                    },
                    value: 'ru'
                }, {
                    xtype: 'label',
                    html: 'Текущий язык был определён автоматически на основе ' +
                          'данных IP адреса. <a href="#">Как это работает?</a>'
                }, {
                    name: 'city',
                    fieldLabel: 'Город',
                    value: 'Москва'
                }, {
                    xtype: 'label',
                    rowspan: 2,
                    html: 'Текущее местоположение было определено автоматически ' +
                          'на основе данных IP адреса. <a href="#">Как это работает?</a>'
                }, {
                    xtype: 'CountryCombo',
                    name: 'country',
                    hiddenName: 'country',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 300
                    },
                    value: 'RU'
                }, {
                    fieldLabel: 'Часовой пояс',
                    xtype: 'combo',
                    name: 'tz',
                    hiddenName: 'tz',
                    valueField: 'id',
                    editable: false,
                    displayField: 'name',
                    matchFieldWidth: false,
                    listConfig: {
                        width: '100%'
                    },
                    store: {
                        fields: ['id', 'name'],
                        data: [
                            {id: '-12', name: 'GMT-12:00 Меридиан смены дат (запад)'},
                            {id: '-11', name: 'GMT-11:00 Американское Самоа, Самоа, Мидуэй о-в, Ниуэ о-в'},
                            {id: '-10', name: 'GMT-10:00 США (Гавайские о-ва, Алеутские о-ва), Таити, Туамоту о-в, Французская Полинезия'},
                            {id: '-9', name: 'GMT-09:00 США (Аляска)'},
                            {id: '-8', name: 'GMT-08:00 США тихоокеанское время (Лос-Анжелес, Сан-Франциско, Сиетл), Канада (Юкон, Ванкувер), Мексика (Тихуана)'},
                            {id: '-7', name: 'GMT-07:00 США (Аризона, горное время), Канада (Калгари), Мексика (Чиуауа)'},
                            {id: '-6', name: 'GMT-06:00 США центральное время (Даллас, Чикаго, Хьюстон), Канада (Виннипег), Мексика (Гвадалахара, Мехико, Монтеррей), Белиз, Гватемала, Гондурас, Коста-Рика, Никарагуа, Пасхи о-в, Сальвадор'},
                            {id: '-5', name: 'GMT-05:00 США восточное время (Индиана восток, Вашингтон, Детройт, Нью-Йорк, Филадельфия), Канада (Монреаль, Оттава), Багамские о-ва, Гаити, Галапагосские о-ва, Каймановы о-ва, Колумбия, Куба, Панама, Перу, Эквадор, Ямайка'},
                            {id: '-4', name: 'GMT-04:00 Канада атлантическое время, Антильские о-ва, Антигуа, Аргентина (запад), Аруба, Барбадос, Бермудские о-ва, Боливия, Бразилия (запад), Венесуэла, Виргинские о-ва, Гваделупа, Гренада, Гренландия (Туле), Доминика, Доминиканская респ:, Курасао, Мартиника, Парагвай, Пуэрто-Рико, Тринидад и Тобаго, Фолклендские о-ва, Чили'},
                            {id: '-3', name: 'GMT-03:00 Аргентина (Буэнос-Айрес), Бразилия (Рио-де-Жанейро, Сан-Паулу), Гайана, Гренландия, Суринам, Уругвай, Французская Гвиана'},
                            {id: '-2', name: 'GMT-02:00 Среднеатлантическое время, Антарктика'},
                            {id: '-1', name: 'GMT-01:00 Азорские о-ва, Бразилия (Атлантические о-ва), Гренландия (восток), Кабо-Верди'},
                            {id: '+0', name: 'GMT+00:00 Время по Гринвичу: Великобритания, Буркина-Фасо, Гамбия, Гана, Гвинея, Ирландская респ., Исландия, Канарские о-ва, Кот-д`Ивуар, Либерия, Мавритания, Мадейра, Мали, Марокко, Нормандские 0-ва, Сан-Томе и Принсипи, Св: Елены о-в, Северная Ирландия, Сенегал, Сьерра-Леоне, Того, Фарерские о-ва'},
                            {id: '+1', name: 'GMT+01:00 Австрия, Албания, Алжир, Ангола, Андорра, Балеарские о-ва, Бельгия, Бенин, Босния и Герцеговина, Ватикан, Венгрия, Габон, Германия, Гибралтар, Дания, Заир (Киншаса), Испания, Италия, Камерун, Конго, Люксембург, Майорка о-в, Македония, Мальта, Монако, Намибия, Нигер, Нигерия, Нидерланды, Норвегия, Польша, Португалия, Сан-Марино, Словакия, Словения, Тунис, Франция, Хорватия, Центрально-Африканская респ:, Чад, Чешская респ:, Швейцария, Швеция, Экваториальная Гвинея, Югославия'},
                            {id: '+2', name: 'GMT+02:00 Беларусь, Болгария, Ботсвана, Бурунди, Греция, Египет, Заир (Киву), Замбия, Зимбабве, Израиль, Иордания, Кипр, Латвия, Лесото, Ливан, Ливия, Литва, Малави, Мозамбик, Молдова, Россия (Калининград), Руанда, Румыния, Свазиленд, Сирия, Судан, Турция, Украина, Финляндия, Эстония, Южная Африка'},
                            {id: '+3', name: 'GMT+03:00 Бахрейн, Джибути, Ирак, Йемен, Катар, Кения, Кувейт, Мадагаскар, Россия (Архангельск, Белгород, Брянск, Владикавказ, Владимир, Вологда, Волгоград, Грозный, Иваново, Йошкар-Ола, Казань, Калуга, Киров, Кострома, Краснодар, Курск, Липецк, Майкоп, Махачкала, Москва, Мурманск, Орел, Нальчик, Новгород, Нижний Новгород, Ростов-на-Дону, Петрозаводск, Пенза, Псков, Санкт-Петербург, Саратов, Самара, Ставрополь, Тамбов, Тула, Черкесск, Чебоксары, Элиста, Ярославль), Саудовская Аравия, Сомали, Танзания, Уганда, Эритрея, Эфиопия'},
                            {id: '+4', name: 'GMT+04:00 Азербайджан, Армения, Грузия, Маврикий, Объединенные Арабские Эмираты, Оман, Реюньон, Россия (Астрахань, Воронеж, Ижевск, Ульяновск), Сейшельские о-ва'},
                            {id: '+5', name: 'GMT+05:00 Кыргызстан, Мальдивские о-ва, Пакистан, Россия (Екатеринбург, Курган, Оренбург, Пермь, Салехард, Тюмень, Уфа, Ханты-Мансийск, Челябинск), Туркменистан, Узбекистан'},
                            {id: '+6', name: 'GMT+06:00 Бангладеш, Бутан, Казахстан (Астана, Алма-Ата), Россия (Омск), Таджикистан'},
                            {id: '+7', name: 'GMT+07:00 Вьетнам, Индонезия (Джакарта), Камбоджа, Лаос, Россия (Абакан, Барнаул, Горно-Алтайск, Дудинка, Красноярск, Кемерово, Новосибирск, Томск, Кызыл), Таиланд'},
                            {id: '+8', name: 'GMT+08:00 Австралия (запад), Бруней, Гонконг, Индонезия (центр), Китай, Малайзия, Монголия, Россия (Иркутск, Улан-Уде), Сингапур, Тайвань, Филиппины'},
                            {id: '+9', name: 'GMT+09:00 Индонезия (восток), КНДР, Корея респ:, Палау, Россия (Благовещенск, Якутск, Чита), Япония'},
                            {id: '+10', name: 'GMT+10:00 Австралия (Брисбен, Канберра, Мельбурн, Сидней), Гуам, Марианские о-ва, Папуа Новая Гвинея, Россия (Биробиджан, Владивосток, Хабаровск)'},
                            {id: '+11', name: 'GMT+11:00 Вануату, Каролинские о-ва, Новая Каледония, Новые Гебриды, Россия (Магадан, Южно-Сахалинск), Соломоновы о-ва'},
                            {id: '+12', name: 'GMT+12:00 Кирибати, Маршалловы о-ва, Науру, Новая Зеландия, Россия (Анадырь, Петропавловск-Камчатский), Тувалу, Фиджи'},
                            {id: '+13', name: 'GMT+13:00 Тонга'}
                        ]
                    },
                    value: '+4'
                }, {
                    xtype: 'label',
                    html: 'Текущий часовой пояс был определён автоматически на основе ' +
                          'данных IP адреса. <a href="#">Как это работает?</a>'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Дополнительная информация',
                defaultType: 'textfield',
                layout: {
                    type: 'table',
                    columns: 2,
                    tdAttrs: {
                        width: '50%',
                        style: 'padding: 10px 0; font-size: x-small; text-align: justify;',
                        valign: 'top'
                    }
                },
                items: [{
                    xtype: 'filefield',
                    name: 'photo',
                    fieldLabel: 'Фотография',
                    buttonText: 'Выбрать фото'
                }, {
                    xtype: 'label',
                    text: 'Загруженная фотография для вашей карточки пользователя ' +
                          'позволит другим пользователям легче вас идентифицировать.'
                }, {
                    fieldLabel: 'Документы',
                    name: 'doc1'
                }, {
                    xtype: 'label',
                    text: 'Добавить Удалить'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Дополнительная регистрация',
                defaultType: 'checkbox',
                items: [{
                    xtype: 'label',
                    html: '<b>Также хочу зарегистрироваться на портале, как:</b><br/><br/>'
                }, {
                    xtype: 'label',
                    text: ' '
                }, {
                    name: 'role_4',
                    boxLabel: 'Сотрудник администрации'
                }, {
                    name: 'role_5',
                    boxLabel: 'Специалист компании'
                }, {
                    name: 'role_6',
                    boxLabel: 'Представитель производителя'
                }, {
                    name: 'role_7',
                    boxLabel: 'Представитель филиала'
                }, {
                    name: 'role_8',
                    boxLabel: 'Представитель партнёра'
                }, {
                    name: 'role_9',
                    boxLabel: 'Эксперт'
                }, {
                    name: 'role_10',
                    boxLabel: 'Журналист'
                }, {
                    name: 'role_11',
                    boxLabel: 'Заказчик'
                }]
            }, {
                xtype: 'label',
                style: 'font-size: x-small;',
                html: 'Поля отмеченные символом <sup style="color: red;">*</sup> ' +
                      'обязательны для заполнения.'
            }, {
                xtype: 'container',
                layout: {
                    type: 'table',
                    columns: 2,
                    tdAttrs: {
                        valign: 'top',
                        style: 'padding: 10px; font-size: x-small; text-align: justify;'
                    }
                },
                items: [{
                    xtype: 'checkbox',
                    isValid: function() {
                        return this.getValue();
                    }
                }, {
                    xtype: 'label',    
                    html: 'Нажимая кнопку "Зарегистрироваться", я принимаю условия ' +
                          '<a href="#">Пользовательского соглашения</a> и даю своё ' +
                          'согласие ОАО "Евразклимат" на обработку моих персональных ' +
                          'данных, в соответствии с Федеральным законом от 27.07.2006 года ' +
                          '№152-Ф3 "О персональных данных", на условиях и для целей, ' +
                          'определённых <a href="#">Политикой конфиденциальности</a>.'
                }]
            }],
            buttons: [{
                text: 'Отменить',
                scope: this,
                handler: this.close
            }, {
                text: 'Зарегистрироваться',
                formBind: true,
                action: 'submit'
            }]
        }];

        this.keys = {
            fn: function(key, e) {
                this.fireEvent('enterPressed');
            },
            key: Ext.EventObject.ENTER,
            scope: this
        }
        
        this.callParent(arguments);
    }
});