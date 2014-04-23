Ext.define('EC.Catalog.view.Dustextraction.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',

    alias: ['widget.DustextractionShow'],

    props: [
        'filtration_name',
        'motor_name',

        'country',
        'power_consumption',
        'vacuum_power',
        'air_flow',
        'vacuum_pressure',
        'noise_level',
        'amperage',
        'dimensions',
        'cleaning_square',
        'filter_square',
        'max_remote_pneumo_valve',
        'max_riser_height',
        'max_cabling_length',
        'riser_diameter',
        'cabling_diameter',
        'dust_tank',
        'motor_resource',
        'max_users',
        'extra_case_valve',
        'soft_start',
        'clean_pipe',
        'vacuum_power_adj',
        'case_lcd',
        'regulating_valve',
        'downy_valve',
        'auto_clean',
        'warranty',
        'storage',
        'reserve',
        'order'
    ],

    initComponent: function() {

        Ext.apply(this.productProps, {
            filtration_name: {              name: 'Фильтрация' },
            motor_name: {                   name: 'Тип мотора' },

            power_consumption: {            name: 'Потребляемая мощность', units: 'кВт' },
            vacuum_power: {                 name: 'Мощность всасывания', units: 'АэроВатт' },
            air_flow: {                     name: 'Поток воздуха', units: 'м³/ч' },
            vacuum_pressure: {              name: 'Уровень вакуума', units: 'кПа' },
            noise_level: {                  name: 'Уровень шума', units: 'дБ' },
            amperage: {                     name: 'Предохранитель', units: 'ампер' },


            // TODO полей нет в таблице catalog_dustextraction
            cleaning_square: {              name: 'Максимальная площадь уборки', units: 'м²' },
            filter_square: {                name: 'Площадь фильтра', units: 'м²' },


            max_remote_pneumo_valve: {      name: 'Максимально удаленный пневмоклапан', units: 'м' },
            max_riser_height: {             name: 'Максимальная высота стояка', units: 'м' },
            max_cabling_length: {           name: 'Максимальная длина горизонтальной разводки', units: 'м' },
            riser_diameter: {               name: 'Диаметр стояка', units: 'мм' },
            cabling_diameter: {             name: 'Диаметр горизонтальной разводки', units: 'мм' },
            dust_tank: {                    name: 'Резервуар для пыли', units: 'л' },
            motor_resource: {               name: 'Ресурс гарантированной работы мотора', units: 'ч' },
            max_users: {                    name: 'Наибольшее количество одновременных пользователей', units: 'ед.' },

            // Не стал добавлять есть/нет, т.к. получается так "Soft-start: есть есть/нет"
            extra_case_valve: {             name: 'Дополнительный клапан на корпусе'},
            soft_start: {                   name: 'Soft-start'},
            clean_pipe: {                   name: 'Clean-pipe'},
            vacuum_power_adj: {             name: 'Регулировка мощности всасывания'},
            case_lcd: {                     name: 'LCD дисплей на корпусе'},
            regulating_valve: {             name: 'Регулировочный клапан'},
            downy_valve: {                  name: 'Продувной клапан'},
            auto_clean: {                   name: 'Автоматическая чистка фильтра'}
        });

        this.callParent();

    }
});