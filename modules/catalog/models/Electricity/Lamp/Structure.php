<?php

class Catalog_Electricity_Lamp_Structure
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
            'name'            => 'group_id',
            'fieldLabel'      => 'Группа оборудования',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Источники света'
            )
        ),
        array(
            'name'            => 'production_type_id',
            'fieldLabel'      => 'Тип продукции',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Лампа',
                2  => 'Cветодиоды'
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
                1  => 'Накаливания',
                2  => 'Зеркальная лампа накаливания',
                3  => 'Металлогалогенная',
                4  => 'Галогенные',
                5  => 'Галогенная с алюминиевым отражателем',
                6  => 'Люминесцентные',
                7  => 'Компактные люминесцентные энергосберегающие NCL',
                8  => 'Светодиодные',
                9  => 'Светодиодные ленты',
                10 => 'Галогенная линейная лампа',
                11 => 'Светодиодная диммируемая',
                12 => 'Люминесцентная лампа для внешнего ПРА',
                13 => 'Лента светодиодная',
                14 => 'Лента светодиодная с драйвером'
            )
        ),
        array(
            'name'            => 'cap_type_id',
            'fieldLabel'      => 'Тип цоколя',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'E27',
                2  => 'E14(миньон)',
                3  => 'RX7S',
                4  => 'E40',
                5  => 'GU4',
                6  => 'GU5.3',
                7  => 'G4',
                8  => 'GY6.35',
                9  => 'G53',
                10 => 'GU10',
                11 => 'G6.35',
                12 => 'G9',
                13 => 'R7s',
                14 => 'G5',
                15 => 'GX53',
                16 => 'G13',
                17 => 'G23',
                18 => 'G24d-2',
                19 => 'G24q-2',
                20 => 'G24d-3',
                21 => 'G24q-3'
            )
        ),
        array(
            'name'            => 'bulb_type_id',
            'fieldLabel'      => 'Вид колбы',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Грушевидная прозрачная',
                2  => 'Грушевидная матовая',
                3  => 'Свеча прозрачная',
                4  => 'Свеча матовая',
                5  => 'Свеча витая прозрачная',
                6  => 'Свеча витая матовая',
                7  => 'Свеча на ветру матовая',
                8  => 'Шар прозрачный',
                9  => 'Шар матовый',
                10 => 'Зеркальная рефлектор',
                11 => 'Дихроичный отражатель с защитным стеклом',
                12 => 'Колба в виде капсулы',
                13 => 'Колба матовая в виде капсулы',
                14 => 'Дихроичный отражатель без защитного стекла',
                15 => 'Алюминиевый отрожатель с защитным стеклом',
                16 => 'Линейная',
                17 => 'Трубка',
                18 => 'Цилиндр',
                19 => '2 U образные люминисцентные трубки',
                20 => '3 U образные люминисцентные трубки',
                21 => '4 U образные люминисцентные трубки',
                22 => 'Полная спираль из люминесцентной трубки',
                23 => 'Полуспираль из люмиесцентной трубки',
                24 => 'U образная трубка'
            )
        ),
        array(
            'name'            => 'voltage',
            'fieldLabel'      => 'Напряжение (В)',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '12',
                2  => '12 AC/DS',
                3  => '24',
                4  => '220',
                5  => '230',
                6  => '150-250',
                7  => '170-260',
                8  => '220-240'
            )
        ),
        array(
            'name'            => 'power',
            'fieldLabel'      => 'Мощность (Вт)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'reflector_diameter',
            'fieldLabel'      => 'Диаметр отражателя (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'beam_angle',
            'fieldLabel'      => 'Угол светового пучка (°)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'dispersion_angle',
            'fieldLabel'      => 'Угол рассеивания (°)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'light_stream',
            'fieldLabel'      => 'Световой поток (лм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'bulb_diameter',
            'fieldLabel'      => 'Диаметр колбы (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'tube_diameter',
            'fieldLabel'      => 'Диаметр трубки (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'lamp_diameter',
            'fieldLabel'      => 'Диаметр лампы (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'lamp_length',
            'fieldLabel'      => 'Длинна лампы (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'country',
            'fieldLabel'      => 'Страна производителя',
            'xtype'           => 'CountriesCombo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
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