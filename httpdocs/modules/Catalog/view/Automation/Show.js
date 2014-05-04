Ext.define('EC.Catalog.view.Automation.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.AutomationShow'],

    productProps: {
        product_type_name: {            name: 'Тип продукции'},
        implementation_type_name: {     name: 'Тип исполнения' },
        control_type_name: {            name: 'Способ управления системой' },
        connection_type_name: {         name: 'Тип присоединения' },
        protection_type_name: {         name: 'Тип защиты' },
        power_source_name: {            name: 'Источник питания' },
        material_name: {                name: 'Материал' },
        isolation_class_name: {         name: 'Класс изоляции' },
        country: {                      name: 'Страна изготовления' },
        temp: {                         name: 'Гарантированный диапазон наружных температур (охлаждение)', units: '°C' },
        power_supply: {                 name: 'Напряжение питания', units: 'В' },
        power: {                        name: 'Мощность', units: 'кВт' },
        heating_power_consumption: {    name: 'Потребляемая мощность (обогрев)', units: 'кВт' },
        amperage: {                     name: 'Рабочий ток', units: 'ампер' },
        sensor_inputs: {                name: 'Входов для подключаемых датчиков', units: 'ед.' },
        pressure: {                     name: 'Диапазон перепада давления', units: 'бар' },
        noise_level_min: {              name: 'Уровень шума (мин)', units: 'дБ(А)' },
        noise_level_max: {              name: 'Уровень шума (макс)', units: 'дБ(А)' },
        eer: {                          name: 'Энергоэффективность', units: 'EER' },
        weight: {                       name: 'Вес', units: 'кг' },
        dimensions: {                   name: 'Габариты (ШхДхВ)', units: 'мм' },
        cable_length: {                 name: 'Длина кабеля', units: 'мм' }, //TODO длина кабеля точно в мм ?
        pipe_diameter: {                name: 'Диаметр трубок', units: 'мм' },
        speed: {                        name: 'Скорость', units: '1/мин' },
        air_flow: {                     name: 'Макс. расход воздуха', units: 'м³/ч' },
        warranty: {                     name: 'Гарантия', units: 'лет' },
        storage: {                      name: 'Склад', units: 'ед.' },
        reserve: {                      name: 'Резерв', units: 'ед.' },
        order: {                        name: 'Заказ', units: 'ед.' },

        // Automation
        isolation_type_name: {          name: 'Тип изоляции'},
        temp_adjustment_range: {        name: 'Диапазон регулируемой температуры', units: '°C' },
        temp_setting_range: {           name: 'Диапазон температурной настройки', units: '°C' },
        spray_angle: {                  name: 'Угол распыла', units: 'град.' },

        // Conditioners
        air_consumption_min: {          name: 'Расход воздуха (мин)', units: 'м³/ч'},
        air_consumption_max: {          name: 'Расход воздуха (макс)', units: 'м³/ч'},
        cooling_capacity: {             name: 'Холодопроизводительность', units: 'кВт'},
        heating_capacity: {             name: 'Теплопроизводительность', units: 'кВт'},
        heatingcooling_id: {            name: 'Охлаждение/нагрев', func: '{[this.getHeatingCooling(values.heatingcooling_id)]}'},
        //TODO переименовать
        power_source_id: {              name: 'Наличие инвертора', func: '{[this.getCondPowerSource(values.power_source_id)]}'}
    }
});