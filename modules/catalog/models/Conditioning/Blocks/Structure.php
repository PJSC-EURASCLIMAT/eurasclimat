<?php

class Catalog_Conditioning_Blocks_Structure
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
                7  => 'Канальные низконапорные',
                8  => 'Канальные средненапорные',
                9  => 'Канальные высоконапорные',
                10 => 'Универсальные'
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
                2  => 'Наружный',
                3  => 'Комплект (внутренний + наружный)'
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
            'name'            => 'cooling_capacity',
            'fieldLabel'      => 'Холодопроизводительность /мин-ном-макс/ (кВт)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'heating_capacity',
            'fieldLabel'      => 'Теплопроизводительность /мин-ном-макс/ (кВт)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_min',
            'fieldLabel'      => 'Расход воздуха минимальный (м³/ч)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_max',
            'fieldLabel'      => 'Расход воздуха максимальный (м³/ч)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_nominal',
            'fieldLabel'      => 'Расход воздуха номинальный (м³/мин)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_cooling_max_min_quiet',
            'fieldLabel'      => 'Расход воздуха охлаждение (макс/мин/тихий) (м³/мин)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_heating_max_min_quiet',
            'fieldLabel'      => 'Расход воздуха нагрев (макс/мин/тихий) (м³/мин)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_cooling_nominal',
            'fieldLabel'      => 'Расход воздуха охлаждение номинальный (м³/мин)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'air_consumption_heating_nominal',
            'fieldLabel'      => 'Расход воздуха нагрев номинальный (м³/мин)',
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
            'name'            => 'sound_pressure_level_normal',
            'fieldLabel'      => 'Уровень звукового давления нормальный (дБ(А))',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'sound_pressure_level_cooling_normal',
            'fieldLabel'      => 'Уровень звукового давления охлаждение нормальный (дБ(А))',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'sound_pressure_level_heating_normal',
            'fieldLabel'      => 'Уровень звукового давления нагрев нормальный (дБ(А))',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'sound_pressure_level_cooling_max_min_quiet',
            'fieldLabel'      => 'Уровень звукового давления охлаждение (макс/мин/тихий) (дБ(А))',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'sound_pressure_level_heating_max_min_quiet',
            'fieldLabel'      => 'Уровень звукового давления нагрев (макс/мин/тихий) (дБ(А))',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'sound_pressure_level_heat_emitting_mode',
            'fieldLabel'      => 'Уровень звукового давления в режиме теплового излучения (дБ(А))',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'seer',
            'fieldLabel'      => 'Сезонная энергоэффективность охлаждение (SEER)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'scop',
            'fieldLabel'      => 'Сезонная энергоэффективность нагрев (SCOP)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'eer',
            'fieldLabel'      => 'Энергоэффективность охлаждение (EER)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'cop',
            'fieldLabel'      => 'Энергоэффективность нагрев (COP)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'seer_load',
            'fieldLabel'      => 'Сезонная энергоэффективность при нагрузке охлаждение/нагрев (кВт)',
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
            'name'            => 'factory_refrigerant_charge',
            'fieldLabel'      => 'Заводская заправка хладагента (кг)',
            'xtype'           => 'numberfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'operate_temp_range_cooling_id',
            'fieldLabel'      => 'Диапазон рабочих температур (охлаждение) мин/макс (°)',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '+19/+46',
                2  => '+21/+43',
                3  => '+10/+46',
                4  => '-5/+46',
                5  => '-10/+46',
                6  => '-15/+46',
                7  => '-15/+50',
                8  => '-5/+43'
            )
        ),
        array(
            'name'            => 'operate_temp_range_heating_id',
            'fieldLabel'      => 'Диапазон рабочих температур (обогрев) мин/макс (°)',
            'xtype'           => 'combo',
            'editable'        => true,
            'validator'       => array('Id', 'allowEmpty' => true),
            'values'          => array(
                0  => '-',
                1  => '-9/+18',
                2  => '-10/+15',
                3  => '-10/+20',
                4  => '-10/+21',
                5  => '-10/+24',
                6  => '-15/+15',
                7  => '-15/+15.5',
                8  => '-15/+18',
                9  => '-15/+20',
                10 => '-15/+24',
                11 => '-20/+15',
                12 => '-20/+15.5',
                13 => '-20/+18',
                14 => '-25/+15',
                15 => '-25/+24',
                16 => '-25/+35'
            )
        ),
        array(
            'name'            => 'power_consumption_cooling',
            'fieldLabel'      => 'Потребляемая мощность охлаждение /мин-ном-макс/ (кВт)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'power_consumption_heating',
            'fieldLabel'      => 'Потребляемая мощность нагрев /мин-ном-макс/ (кВт)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'power_coefficient',
            'fieldLabel'      => 'Коеффициент мощности',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'diameter_pipe_liquid',
            'fieldLabel'      => 'Диаметр труб жидкость (мм/дюйм)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'diameter_pipe_gas',
            'fieldLabel'      => 'Диаметр труб газ (мм/дюйм)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'diameter_drainage',
            'fieldLabel'      => 'Диаметр дренажа (мм)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'trunk_length_max',
            'fieldLabel'      => 'Максимальная длина магистрали (м)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'trunk_length_total',
            'fieldLabel'      => 'Общая длина магистрали (м)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'trunk_length_inner_block',
            'fieldLabel'      => 'Максимальная длина магистрали до внутреннего блока (м)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'trunk_length_blocks',
            'fieldLabel'      => 'Максимальная длина магистрали до каждого блока (м)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'height_difference_max',
            'fieldLabel'      => 'Максимальный перепад по высоте (м)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'height_difference_inout_blocks',
            'fieldLabel'      => 'Максимальный перепад по высоте между внутренним и наружным блоками (м)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'height_difference_inner_blocks',
            'fieldLabel'      => 'Максимальный перепад по высоте между внутренними блоками (м)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'annual_energy_consumption',
            'fieldLabel'      => 'Годовое энергопотребление (охлаждение/нагрев) (кВт/час)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'area_square',
            'fieldLabel'      => 'Для помещения площадью (м²)',
            'xtype'           => 'textfield',
            'editable'        => true,
            'validator'       => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ),
        array(
            'name'            => 'weight',
            'fieldLabel'      => 'Вес (кг)',
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