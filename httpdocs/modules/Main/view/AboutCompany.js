Ext.define('EC.Main.view.AboutCompany', {

    extend: 'Ext.panel.Panel',

    autoScroll: true,
    
    layout: 'fit',
    
    html: '<div style="text-align: justify; padding: 10px;">' +
        '<h5 style="text-align: center;">ОАО «ЕВРАЗКЛИМАТ» - компания, ' +
        'специализирующаяся на оказании высококачественных услуг в сфере ' +
        'строительства внутренних и внешних инженерных систем, сетей и технологий!</h5>' +
        
        '<p style="text-indent: 2em;">' +
        'Основным профилем компании является комплексная реализация проектов.</p>' +
        
        '<p style="text-indent: 2em;">' +
        'Основным показателем качества реализации проектов является использование ' +
        'труда высококвалифицированных специалистов и высококачественного ' +
        'оборудования известных производителей.</p>' +
        
        '<p style="text-indent: 2em;">' +
        'Основным принципом компании, является полное, точное выполнение взятых на ' +
        'себя обязательств в рамках проектов любой сложности.</p>' +
        
        '<p><b>Виды услуг компании:</b></p>' +
        
        '<p style="text-indent: 2em;">' +
        'ОАО «ЕВРАЗКЛИМАТ» предоставляет услуги по реализации проектов в сфере ' +
        'строительства внутренних и внешних инженерных систем, сетей и технологий, ' +
        'как в комплексе, так и отдельными этапами, такими как:</p>' +
        
        '<ul>' +
        '<li>Проектирование</li>' +
        '<li>Логистика</li>' +
        '<li>Снабжение</li>' +
        '<li>Комплектацию объектов инженерной продукцией и/или материалами</li>' +
        '<li>Производство нестандартного оборудования и изделий</li>' +
        '<li>Разработка и производство электро-щитового оборудования</li>' +
        '<li>Строительно-монтажные работы</li>' +
        '<li>Технический надзор</li>' +
        '<li>Разработка, утверждение и контроль исполнения графиков производства работ</li>' +
        '<li>Организация выполнения шеф-монтажных и пуско-наладочных работ</li>' +
        '<li>Гарантийное и постгарантийное (сервисное) обслуживание</li>' +
        '</ul>' +
        
        '<p><b>Основные области оказания услуг:</b></p>' +
        
        '<p style="text-indent: 2em;">' +
        'ОАО «ЕВРАЗКЛИМАТ» предоставляет услуги в области строительства разделов ' +
        'внутренних и внешних инженерных систем, сетей и технологий, в том числе:</p>' +
        
        '<ul>' +
        '<li>Механические системы</li>' +
        '<li>Электротехнические системы</li>' +
        '<li>Слаботочные системы</li>' +
        '<li>Системы безопасности</li>' +
        '<li>Автоматизация, диспетчеризация и управление системами</li>' +
        '<li>Системы чистых помещений</li>' +
        '<li>Пищевые технологии</li>' +
        '</ul>' +
        
        '<p><b>Используемая компанией продукция:</b></p>' +
        
        '<p style="text-indent: 2em;">' +
        'ОАО «ЕВРАЗКЛИМАТ» использует при реализации проектов продукцию, ' +
        'производимую исключительно известными и положительно зарекомендовавшими ' +
        'себя многолетней историей и опытом производителями, такими как:</p>' +
        
        '<ul>' +
        '<li>Mitsubishi</li>' +
        '<li>Daikin</li>' +
        '<li>Kentatsu</li>' +
        '<li>Panasonic</li>' +
        '<li>General</li>' +
        '<li>Lessar</li>' +
        '<li>Ballu</li>' +
        '<li>Carrier</li>' +
        '<li>Danfoss</li>' +
        '<li>GEA Klimatechnika</li>' +
        '<li>Арктика</li>' +
        '<li>NED</li>' +
        '<li>SistemAir</li>' +
        '<li>Ostberg</li>' +
        '<li>Remak</li>' +
        '<li>Meibes</li>' +
        '<li>KOFULSO LTD</li>' +
        '<li>Imp Klima</li>' +
        '<li>IRSAP</li>' +
        '<li>PC</li>' +
        '<li>REHAU</li>' +
        '<li>TECE</li>' +
        '<li>KAN-therm</li>' +
        '<li>Cupori Oy</li>' +
        '<li>KME</li>' +
        '<li>WIELAND SANCO</li>' +
        '<li>IBP</li>' +
        '<li>KOFULSO LTD</li>' +
        '<li>Alurad</li>' +
        '<li>Global</li>' +
        '<li>Sira</li>' +
        '<li>JAGA</li>' +
        '<li>VARMANN</li>' +
        '<li>MINIB</li>' +
        '<li>Imp Klima</li>' +
        '<li>Mohlenhoff</li>' +
        '<li>Zehnder</li>' +
        '<li>Korado</li>' +
        '<li>Dia Norm Delta</li>' +
        '<li>Конрад</li>' +
        '<li>Arbonia</li>' +
        '<li>Dia Norm</li>' +
        '<li>Demir Dokum</li>' +
        '<li>Carlo Poletti</li>' +
        '<li>Chappee</li>' +
        '<li>GuRaTec</li>' +
        '<li>ABB</li>' +
        '<li>Schneider Electric</li>' +
        '<li>Wolf</li>' +
        '<li>Noritz</li>' +
        '<li>SAUNIER DUVAL</li>' +
        '<li>GIERSCH</li>' +
        '<li>Kermi</li>' +
        '<li>Zehnder</li>' +
        '<li>KAMPMANN</li>' +
        '<li>CLOBAL</li>' +
        '<li>Walraven</li>' +
        '<li>Viega</li>' +
        '<li>Magra</li>' +
        '<li>REFLEX</li>' +
        '</ul>' +
        
        '<p style="text-indent: 2em;">' +
        'Вся продукция и материалы, в том числе строительные, применяемые ' +
        'компанией на объектах, проходят входной контроль качества ' +
        'на соответствие ГОСТ, ТУ, требованиям проекта, а также паспортам ' +
        'и сертификатам, подтверждающим качество их изготовления.</p>' +
        
        '<p><b>Типы объектов</b></p>' +
        
        '<p style="text-indent: 2em;">' +
        'ОАО «ЕВРАЗКЛИМАТ» имеет большой положительный опыт оказания услуг ' +
        'на объектах различного типа, таких как:</p>' +
        
        '<ul>' +
        '<li>Общеобразовательные учреждения;</li>' +
        '<li>Спортивные комплексы и учреждения;</li>' +
        '<li>Медицинские и лечебно-оздоровительные центры;</li>' +
        '<li>Торгово-развлекательные и гостиничные комплексы;</li>' +
        '<li>Пищевые производства;</li>' +
        '<li>Объекты специального назначения (государственные учреждения, бомбоубежища, ' +
        'серверные помещения, банки, хранилища, специальные переговорные помещения);</li>' +
        '<li>Технологические помещения операторов фиксированной и мобильной связи ' +
        '(коммутаторы,  серверные  и вспомогательные помещения, базовые станции).</li>' +
        '</ul>' +
        
        '<p><b>Партнеры и Заказчики</b></p>' +
        
        '<p style="text-indent: 2em;">' +
        'Партнерами и Заказчиками ОАО «ЕВРАЗКЛИМАТ» являются многие предприятия ' +
        'и организации, в том числе:</p>' +
        
        '<ul>' +
        '<li>Московская городская телефонная сеть;</li>' +
        '<li>ОАО "Москапстрой";</li>' +
        '<li>ЗАО "УКС-Москапстрой";</li>' +
        '<li>Департамент городского заказа капитального строительства города Москвы;</li>' +
        '<li>ХК Главмосстрой;</li>' +
        '<li>Издательство «ЭКСМО»;</li>' +
        '<li>Департамент дорожно-мостового и инженерного строительства города Москвы;</li>' +
        '<li>ОАО "Клиника эстетической медицины";</li>' +
        '<li>ООО "ТД ОВИК ";</li>' +
        '<li>ОАО РАО "ЕЭС России";</li>' +
        '<li>Московское представительство Мицубиси Электрик Юроп Б.В.;</li>' +
        '<li>Московское представительство GЕA Klimatechnik GmbH Co & KG;</li>' +
        '<li>Представительство Systemair в России и СНГ;</li>' +
        '<li>Представительство LESSAR;</li>' +
        '<li>"АО ВНИИЭТО";</li>' +
        '<li>ОАО «АРКТЕЛ»;</li>' +
        '<li>Государственный историко-архитектурный, художественный и ландшафтный ' +
        'музей-заповедник «Царицыно»;</li>' +
        '<li>Управление по проектированию общественных зданий и сооружений ' +
        '"Моспроект-2" имени М.В. Посохина.</li>' +
        '</ul>' +
        
        '<p><b>Объекты:</b></p>' +
        
        '<p style="text-indent: 2em;">' +
        'Структурами ОАО «ЕВРАЗКЛИМАТ» реализованы комплексные услуги в области ' +
        'строительства внутренних и внешних инженерных систем, сетей и технологий ' +
        'на большом количестве объектов, в числе которых:</p>' +
        
        '<ul>' +
        '<li>Московская городская телефонная сеть, АТС - №: 261, 240, 361, 142, ' +
        '145, 490, 491, 250, 416, 417, 435, 439, 934, 170, 178, 179, 433, 276, ' +
        '676, 450, 252, 255, 116, 117, 118, 616;</li>' +
        '<li>Издательский Дом «ЭКСМО» (Москва, ул. Клары Цеткин д.18 корп.3);</li>' +
        '<li>Универмаг «СОФИЯ» (Москва, ул. Б. Полянка д.28);</li>' +
        '<li>Торговая компания «Vesta-ALFA» (Москва, ул. Усачева д.10);</li>' +
        '<li>Институт ВНИИЭТО – 98 (Москва, ул. Нижегородская, д.29);</li>' +
        '<li>Гостиница Парк Отель АСТ–ГОФ (Москва, ул. Б. Филёвская, д.25);</li>' +
        '<li>Центр дизайна ArtPlay (Москва, ул. Т.Фрунзе, д.11, стр.34);</li>' +
        '<li>Московский Государственный Гольф Клуб им. Довженко;</li>' +
        '<li>Союзхимэкспорт (Москва);</li>' +
        '<li>Лечебно-диагностический корпус медицинского центра МГУ им. М.В. Ломоносова;</li>' +
        '<li>Общеобразовательная школа на 825 учащихся (Москва, ул. Вишневая);</li>' +
        '<li>Автобаза Генштаба (Москва, Бережковская наб.);</li>' +
        '<li>Производственные корпуса завода «Мултон» (МО, г. Щелково);</li>' +
        '<li>Производственные корпуса завода «Втормет» (МО, п. Некрасовка);</li>' +
        '<li>Научно-производственный центр НБЦ «Фармбиомед» (Москва);</li>' +
        '<li>Троллейбусный парк (Москва, район Новокосино);</li>' +
        '<li>179-й спасательный центр МЧС России (МО, г. Ногинск-2);</li>' +
        '<li>Клиника эстетической медицины (Москва);</li>' +
        '<li>Оранжерейный комплекс ГУК ГМЗ Царицыно (Москва);</li>' +
        '<li>Туберкулезный санаторий №58, клуб-столовая (МО, Рузский район, п. Кожино);</li>' +
        '<li>Участок магистрали 4-ого транспортного кольца, 2-й пусковой комплекс (Москва);</li>' +
        '<li>Завод по производству шин для легковых автомобилей Yokohama. (Липецк);</li>' +
        '<li>Здание УВД Восточного административного округа города Москвы;</li>' +
        '<li>Завод по производству токопровода ООО «РТК – Токопровод» (Павловский Посад).</li>' +
        '</ul>' +

        '<p style="text-indent: 2em;">' +
        'Точное выполнение ОАО «ЕВРАЗКЛИМАТ» взятых на себя обязательств, ' +
        'предоставление высококачественных услуг, использование труда ' +
        'квалифицированных специалистов, качественного оборудования и материалов, ' +
        'ответственный подход к реализации каждого этапа проекта, позволяет нашей ' +
        'компании реализовывать инженерные проекты любой сложности, а Партнерам ' +
        'и Заказчикам компании извлекать максимальную выгоду из совместной ' +
        'деятельности с ОАО «ЕВРАЗКЛИМАТ».</p>'
        
        + '</div>'
});