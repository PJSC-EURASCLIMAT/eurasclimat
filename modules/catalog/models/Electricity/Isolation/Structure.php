<?php

class Catalog_Electricity_Isolation_Structure
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
                1  => 'Электроизоляционные материалы',
                2  => 'Изоляционные материалы другого назначения'
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
                1  => 'Изолента ПВХ',
                2  => 'Изолента Х/Б',
                3  => 'Изолента самослипающаяся',
                4  => 'Трубка ПВХ (кембрик)',
                5  => 'Трубка термоусаживающаяся',
                6  => 'Лента алюминивая армированная',
                7  => 'Лента антикоррозионная',
                8  => 'Пена огнезащитная'
            )
        ),
        array(
            'name'            => 'colour',
            'fieldLabel'      => 'Цвет',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'width',
            'fieldLabel'      => 'Длинна (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'length',
            'fieldLabel'      => 'Ширина (мм)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'pipe_diameter_id',
            'fieldLabel'      => 'Диаметр термоусадочных трубок до/после усадки (мм)',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '6/3',
                2  => '8/4',
                3  => '10/5',
                4  => '12/6',
                5  => '12,7/4,3',
                6  => '14/7',
                7  => '16/8',
                8  => '20/10',
                9  => '25/12,5',
                10 => '30/15',
                11 => '40/20',
                12 => '50/25',
                13 => '60/30'
            )
        ),
        array(
            'name'            => 'cambric_diameter',
            'fieldLabel'      => 'Диаметр кембриков (мм)',
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
                3  => 'Самозатухающий',
                4  => 'Низкое газо и дымо выделение'
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
                2  => 'Вне помещений',
                3  => 'Универсальный'
            )
        ),
        array(
            'name'            => 'temp_ranges_id',
            'fieldLabel'      => 'Рабочие диапазоны температур -/+ (°C)',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '-50/+80',
                2  => '-50/+90',
                3  => '-40/+100',
                4  => '-55/+105'
            )
        ),
        array(
            'name'            => 'breakdown_voltage',
            'fieldLabel'      => 'Напряжение пробоя (кВт)',
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