<?php

class Catalog_Conditioning_Controls_Structure 
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
                1  => 'Индивидуальные пульты управления',
                2  => 'Центральные пульты управления'
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
                1  => 'Пульт управления',
                2  => 'Пульт управления с приемником',
                3  => 'Таймер',
                4  => 'Контроллер центральный',
                5  => 'Контроллер многофункциональный',
                6  => 'Шлюз для сети LanWorks'
            )
        ),
        array(
            'name'            => 'power_voltage',
            'fieldLabel'      => 'Электропитание (В)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'power_phases',
            'fieldLabel'      => 'Электропитание (кол-во фаз)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'power_freq',
            'fieldLabel'      => 'Электропитание (Hz)',
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