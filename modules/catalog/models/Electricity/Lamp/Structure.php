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
            'name'            => 'production_type_id',
            'fieldLabel'      => 'Тип продукции',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true)
        ),
        array(
            'name'            => 'implementation_type_id',
            'fieldLabel'      => 'Тип исполнения',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true)
        ),
        array(
            'name'            => 'conductor_material_id',
            'fieldLabel'      => 'Материал жил',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true)
        ),
        array(
            'name'            => 'conductor_type_id',
            'fieldLabel'      => 'Тип жилы',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true)
        ),
        array(
            'name'            => 'conductor_profile_id',
            'fieldLabel'      => 'Профиль жилы',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true)
        ),
        array(
            'name'            => 'pairs_number',
            'fieldLabel'      => 'Количество пар',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'conductors_number',
            'fieldLabel'      => 'Количество жил',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'isolation_material_id',
            'fieldLabel'      => 'Материал изоляции жил',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'cable_material_id',
            'fieldLabel'      => 'Материал оболочки кабеля',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
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
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
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
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'working_frequency_id',
            'fieldLabel'      => 'Рабочая частота',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
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
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'exploitation_id',
            'fieldLabel'      => 'Эксплуатация',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'laying_temp',
            'fieldLabel'      => 'Минимальная температура прокладки без подогрева (°)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'temp_range',
            'fieldLabel'      => 'Диапозон температур эксплуатации от-/до+ (°)',
            'xtype'           => 'textfield',
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