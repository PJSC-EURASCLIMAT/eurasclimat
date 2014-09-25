<?php

class Catalog_Conditioners_Structure
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
            'name'            => 'group_id',
            'fieldLabel'      => 'Группа оборудования',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Бытовые',
                2  => 'Полупромышленные',
                3  => 'Чиллеры',
                4  => 'Фанкойлы',
                5  => 'Центральные (шкафные)',
                6  => 'Тепловые насосы бытовые',
                7  => 'Тепловые насосы полупромышленные',
                8  => 'Системы с изменяемым расходом хладагента VRF',
                9  => 'Полупромышленные со встроенным теплообменником(фреон-вода)',
                10 => 'Полупромышленные с внешним теплообменником (фреон-вода)'
            )
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
                1  => 'Моноблок',
                2  => 'Сплит система',
                3  => 'Мультисистемы',
                4  => 'Мультизональные системы',
                5  => 'Воздушное охлаждение конденсатора',
                6  => 'Водяное охлождение конденсатора',
                7  => 'Гибридные',
                8  => 'Приборы нагрева и охлаждения воды',
                9  => 'Теплообменные блоки',
                10 => 'Бустерный блок'
            )
        ),
        array(
            'name'            => 'implementation_type_id',
            'fieldLabel'      => 'Тип исполнения системы',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Настенные',
                2  => 'Напольные',
                3  => 'Подпотолочные',
                4  => 'Кассетные 1 поток',
                5  => 'Кассетные 4 потока',
                6  => 'Канальные',
                7  => 'Универсальные'
            )
        ),
        array(
            'name'            => 'block_type_id',
            'fieldLabel'      => 'Тип блока',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Внутренний',
                2  => 'Наружный'
            )
        ),
        array(
            'name'            => 'heatingcooling_id',
            'fieldLabel'      => 'Охлаждение/нагрев',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Только охлаждение',
                2  => 'Охлаждение или нагрев',
                3  => 'Охлаждение и нагрев одновременно'
            )
        ),
        array(
            'name'            => 'power_source_id',
            'fieldLabel'      => 'Наличие инвертора',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => 'Есть',
                2  => 'Нет'
            )
        ),
        array(
            'name'            => 'country',
            'fieldLabel'      => 'Страна производителя',
            'xtype'           => 'CountriesCombo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 2), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'cooling_capacity',
            'fieldLabel'      => 'Холодопроизводительность (кВт)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'heating_capacity',
            'fieldLabel'      => 'Теплопроизводительность (кВт)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_min',
            'fieldLabel'      => 'Расход воздуха (мин) (м³/ч)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_max',
            'fieldLabel'      => 'Расход воздуха (макс) (м³/ч)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'noise_level_min',
            'fieldLabel'      => 'Уровень шума (мин) (дБ(А))',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'noise_level_max',
            'fieldLabel'      => 'Уровень шума (макс) (дБ(А))',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'seer',
            'fieldLabel'      => 'Сезонная энергоэффективность (SEER)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'scop',
            'fieldLabel'      => 'Сезонная энергоэффективность (SCOP)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'ports',
            'fieldLabel'      => 'Количество портов (шт.)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'maxblocks',
            'fieldLabel'      => 'Макс. количество внутренних блоков (шт.)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'sound_power_level',
            'fieldLabel'      => 'Уровень звуковой мощности (дБ(А))',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'working_amperage',
            'fieldLabel'      => 'Пусковой ток (А)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'operating_amperage',
            'fieldLabel'      => 'Рабочий ток (А)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'max_working_amperage',
            'fieldLabel'      => 'Макс. рабочий ток (А)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'factory_refrigerant_charge',
            'fieldLabel'      => 'Заводская заправка хладагента (кг)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'dimensions',
            'fieldLabel'      => 'Габариты (ШхДхВ) (мм)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'warranty',
            'fieldLabel'      => 'Гарантия (лет)',
            'xtype'           => 'numberfield',
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