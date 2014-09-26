<?php

class Catalog_Electricity_Battery_Structure
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
            'name'            => 'product_type_id',
            'fieldLabel'      => 'Тип продукции',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Источники питания первичные (одноразовое использование)',
                2  => 'Источники питания вторичные (многоразового использования)',
                3  => 'Обеспечение бесперебойного эл.питания',
                4  => 'Зарядка внешних источников питания'
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
                1  => 'Батарейки',
                2  => 'Аккумуляторы',
                3  => 'Аккумуляторные батареи',
                4  => 'Блоки аварийного питания',
                5  => 'Зарядные устройства'
            )
        ),
        array(
            'name'            => 'type_id',
            'fieldLabel'      => 'Тип',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Щелочной',
                2  => 'Солевой',
                3  => 'Литиевый',
                4  => 'Литиево-ионный (Li-Ion)',
                5  => 'Литиево-полимерный (Li-polymer)',
                6  => 'Оксид-серебряный', 'Никелево-металлогидридный (Ni-MH)',
                7  => 'Никель-кадмиевый (Ni-Cd)',
                8  => 'Железо-никелевый',
                9  => 'Свинцово-кислотный (SLA)',
                10 => 'Серебряно-цинковый',
                11 => 'Цинк-воздушный',
                12 => 'Марганцево-цинковый'
            )
        ),
        array(
            'name'            => 'size_type_id',
            'fieldLabel'      => 'Типоразмер',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Дисковый',
                2  => 'Призматический',
                3  => 'Цилиндрический',
                4  => 'LR1',
                5  => '3336/3R12',
                6  => '6LF22/6LR61',
                7  => 'A286/LR03/AAA',
                8  => '316/R6/AA',
                9  => '343/R14/C',
                10 => '373/R20/D',
                11 => '18650',
                12 => 'V23GA',
                13 => 'V27A',
                14 => 'CR2',
                15 => 'CR123A',
                16 => '10A',
                17 => '11A',
                18 => '23AE',
                19 => 'CR1220',
                20 => 'CR14250',
                21 => 'CR1616',
                22 => 'CR1620',
                23 => 'CR2025',
                24 => 'CR2032',
                25 => 'CR2325',
                26 => 'CR2430',
                27 => 'CR2477'
            )
        ),
        array(
            'name'            => 'voltage',
            'fieldLabel'      => 'Напряжение (В)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'capacity',
            'fieldLabel'      => 'Ёмкость (mAh)',
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