<?php

class Catalog_Electricity_Wires_Structure
{
    public $data = array(
        array(
            'name'            => 'id',
            'fieldLabel'      => 'Внутренний номер',
            'xtype'           => 'hidden',
            'editable'        => false,
            'validator'       => array('Id', 'presence' => 'required'),
        ),
        array(
            'name'            => 'mark_id',
            'fieldLabel'      => 'Марка',
            'xtype'           => 'FilterMark',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true)
        ),
        array(
            'name'            => 'name',
            'fieldLabel'      => 'Наименование',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'code',
            'fieldLabel'      => 'Артикул',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'marking',
            'fieldLabel'      => 'Маркировка',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'production_type_id',
            'fieldLabel'      => 'Тип продукции',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Кабели для систем сигнализации',
                2  => 'Кабели и провода монтажные',
                3  => 'Кабели и провода спецназначения',
                4  => 'Кабели контрольные, управления, сигнализаций и блокировки',
                5  => 'Кабели связи,информационных систем,акустические',
                6  => 'Кабели силовые',
                7  => 'Провода для ЛЭП',
                8  => 'Провода и шнуры другого назначения назначения'
            )
        ),
        array(
            'name'            => 'implementation_type_id',
            'fieldLabel'      => 'Тип исполнения',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Кабели для систем пожарной сигнализации',
                2  => 'Кабели для систем сигнализации и видео наблюдения',
                3  => 'Кабели монтажные',
                4  => 'Провода монтажные',
                5  => 'Кабели и провода термостойкие',
                6  => 'Кабели коаксиальные для передачи и распределения э/э',
                7  => 'Кабели контрольные',
                8  => 'Кабели акустические',
                9  => 'Кабели для структурированных систем связи',
                10 => 'Кабели и провода трансляционные, телефонные',
                11 => 'Кабели радиочастотные',
                12 => 'Кабели силовые с БПИ',
                13 => 'Кабели силовые с пластмассовой изоляцией',
                14 => 'Кабели силовые с резиновой изоляцией',
                15 => 'Провода изолированные',
                16 => 'Провода не изолированные',
                17 => 'Провода и шнуры осветительные',
                18 => 'Провода и шнуры соеденительные',
                19 => 'Провода нагревательные',
                20 => 'Провода установочные'
            )
        ),
        array(
            'name'            => 'conductor_section_id',
            'fieldLabel'      => 'Сечение жил',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '0,03',
                2  => '0,05',
                3  => '0,07',
                4  => '0,10',
                5  => '0,12',
                6  => '0,14',
                7  => '0,2',
                8  => '0,35',
                9  => '0,5',
                10 => '0,75',
                11 => '1,0',
                12 => '1,2',
                13 => '1,5',
                14 => '2,0',
                15 => '2,5',
                16 => '3,0',
                17 => '4,0',
                18 => '5,0',
                19 => '6,0',
                20 => '8,0',
                21 => '10,0',
                22 => '16,0',
                23 => '25,0',
                24 => '30,0',
                25 => '35,0',
                26 => '50,0',
                27 => '70,0',
                28 => '95,0',
                29 => '120,0',
                30 => '150,0',
                31 => '185,0',
                32 => '240,0',
                33 => '3х25,0+1х16,0',
                34 => '3х35,0+1х16,0',
                35 => '3х50,0+1х25,0',
                36 => '3х70,0+1х35,0',
                37 => '3х95,0+1х50,0',
                38 => '3х120,0+1х70,0',
                39 => '3х150,0+1х70,0',
                40 => '3х185,0+1х95,0',
                41 => '3х240,0+1х120,0'
            )
        ),
        array(
            'name'            => 'conductor_material_id',
            'fieldLabel'      => 'Материал жил',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Медь',
                2  => 'Медь с покрытием',
                3  => 'Алюминий',
                4  => 'Сталь',
                5  => 'Сталь с покрытием'
            )
        ),
        array(
            'name'            => 'conductor_type_id',
            'fieldLabel'      => 'Тип жилы',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Одноднопроволочная',
                2  => 'Многопроволочная'
            )
        ),
        array(
            'name'            => 'conductor_profile_id',
            'fieldLabel'      => 'Профиль жилы',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Круглая',
                2  => 'Секторная или сегментная'
            )
        ),
        array(
            'name'            => 'pairs_number',
            'fieldLabel'      => 'Количество пар',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'conductors_number',
            'fieldLabel'      => 'Количество жил',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'isolation_material_id',
            'fieldLabel'      => 'Материал изоляции жил',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Резина',
                2  => 'Маслостойкая резина',
                3  => 'Полиэтилен',
                4  => 'Пропитанная бумага',
                5  => 'Кремнийорганическая резина',
                6  => 'ПВХ',
                7  => 'Фторопласт',
                8  => 'Стекловолокно',
                9  => 'Лакированные х/б нити',
                10 => 'Электроизоляционный шёлк',
                11 => 'Эмаль',
                12 => 'Стальные ленты'
            )
        ),
        array(
            'name'            => 'cable_material_id',
            'fieldLabel'      => 'Материал оболочки кабеля',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Резина',
                2  => 'Маслостойкая резина',
                3  => 'Полиэтилен',
                4  => 'Пропитанная бумага',
                5  => 'Кремнийорганическая резина',
                6  => 'ПВХ',
                7  => 'Фторопласт',
                8  => 'Стекловолокно',
                9  => 'Лакированные х/б нити',
                10 => 'Электроизоляционный шёлк',
                11 => 'Эмаль',
                12 => 'Стальные ленты'
            )
        ),
        array(
            'name'            => 'wire_colour',
            'fieldLabel'      => 'Цвет провода',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'screening_id',
            'fieldLabel'      => 'Экранирование',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Медь',
                2  => 'Алюминий'
            )
        ),
        array(
            'name'            => 'outer_diameter',
            'fieldLabel'      => 'Наружный диаметр (мм)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'working_voltage_id',
            'fieldLabel'      => 'Рабочее напряжение (В)',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '12',
                2  => '24',
                3  => '50',
                4  => '120',
                5  => '250',
                6  => '380',
                7  => '400',
                8  => '660',
                9  => '1000',
                10 => '3000',
                11 => '10000',
                12 => '300/500'
            )
        ),
        array(
            'name'            => 'working_frequency_id',
            'fieldLabel'      => 'Рабочая частота',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Постоянное напряжение',
                2  => '50',
                3  => '100',
                4  => '120',
                5  => '400',
                6  => '>1КГц',
                7  => '>100КГц',
                8  => '>1МГц',
                9  => '>10МГц',
                10 => '>100МГц',
                11 => '>1000МГц',
                12 => '>2ГГц',
                13 => '>5ГГц'
            )
        ),
        array(
            'name'            => 'isolation_resistance',
            'fieldLabel'      => 'Cопротивление изоляции постоянному току +70°С, не менее МОм/км',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'bend_radius',
            'fieldLabel'      => 'Минимальный радиус изгиба в наружных диаметрах (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'combustibility_id',
            'fieldLabel'      => 'Горючесть',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Пониженная',
                2  => 'Не поддерживающий горение',
                3  => 'Не распространяющих горение',
                4  => 'Самозатухающий',
                5  => 'Низкое газо и дымо выделение',
                6  => 'Не распространяет горение при одиночной прокладке'
            )
        ),
        array(
            'name'            => 'exploitation_id',
            'fieldLabel'      => 'Эксплуатация',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'В помещениях',
                2  => 'Вне помещений при условии защиты от прямого воздействия солнечного излучения и атмосферных осадков',
                3  => 'Вне помещений',
                4  => 'Бронированый'
            )
        ),
        array(
            'name'            => 'laying_temp',
            'fieldLabel'      => 'Минимальная температура прокладки без подогрева (°)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'temp_range_id',
            'fieldLabel'      => 'Диапозон температур эксплуатации от-/до+ (°)',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '-40/+70',
                2  => '-30/+70',
                3  => '-30/+40',
                4  => '-50/+50'
            )
        ),
        array(
            'name'            => 'shipment_multiplicity',
            'fieldLabel'      => 'Кратность отгрузки (м)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'country',
            'fieldLabel'      => 'Страна производителя',
            'xtype'           => 'CountriesCombo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 2), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'measure',
            'fieldLabel'      => 'Ед.Изм.',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'dealer_price',
            'fieldLabel'      => 'Диллерская цена',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'price',
            'fieldLabel'      => 'Цена',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'currency_id',
            'fieldLabel'      => 'Валюта',
            'xtype'           => 'CatalogCurrencyCombo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true)
        )
    );
}