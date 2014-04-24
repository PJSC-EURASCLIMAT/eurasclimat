Ext.define('EC.Catalog.view.ShowAbstract', {
    
    extend: 'Ext.window.Window',
    
    title: 'Карточка товара',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    resizable: true,
    
    maximizable: true,
    
    modal: true,

    width: 800,
    
    height: 500,
    
    contentsTpl: '',

    bodyCls: 'catalog-product-card',

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
        pressure: {                     name: 'Максимальное рабочее давление', units: 'бар' },
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

    },


    //TODO нужно разрулить страну изготовления

    initComponent: function() {

        this.tpl = new Ext.XTemplate(

            '<table width="100%" border="0">' +

                '<tr valign="top">' +

                    '<td rowspan="2" width="320">' +
                        '<tpl if="[values.images.length] &gt; 0">' +
                            '<img src="/images/catalog/{[values.images[0].name]}"/>' +
                        '<tpl else>' +
                            '<img src="http://placehold.it/300x220"/>' +
                        '</tpl>' +

                        '<tpl if="[values.url.length] &gt; 0"><p>Ссылка: <b>{url}</b></p></tpl>' +
                        '<tpl if="[values.price.length] &gt; 0"><p>Цена: <b>{price}&nbsp;{[ this.getCurrency( values.currency_id ) ]}</b></p></tpl>' +
                        '<tpl if="[values.mount_price.length] &gt; 0"><p>СМР: <b>{mount_price}&nbsp;р.</b></p></tpl>' +
                        '<tpl if="[values.description.length] &gt; 0"><p>Описание:</p><p class="description">{description}<p></tpl>',

                    '</td>' +

                    '<td colspan="3" height="40">' +
                        //TODO будет name
                        '<h1><p>{mark_name} {name}</p></h1>' +
                        '<tpl if="[values.code.length] &gt; 0"><p>Артикул: <b>{code}</b></p></tpl>' +
                        '<tpl if="[values.group_name.length] &gt; 0"><p>Группа оборудования: <b>{group_name}</b></p></tpl>',
                    '</td>' +

                '</tr>' +

                '<tr valign="top">' +
                    '<td class="settings">' + this.createPropsTpl() + '</td>' +
                '</tr>' +

            '</table>',{
                getCurrency: function( currency_id ) {
                    if ( Ext.isEmpty( currency_id ) ) return '';
                    var map = {
                        0: 'Руб',
                        1: 'USD',
                        2: 'EUR'
                    };
                    return map[currency_id];
                }
            });

        this.callParent();

    },

    createPropsTpl: function() {
        var content = '', key, units, prop, value;
        for ( var i = 0; i < this.props.length; i++ ) {
            key = this.props[i];
            prop = this.productProps[key];
            units = ( !Ext.isEmpty(prop.units) ) ? '&nbsp;' + prop.units : '';
            value = prop.func || '{' + key + '}';

            content += '<tpl if="[values.' + key + '.length] &gt; 0"><p>' + prop.name + ': <b>{' + key + '}' + units + '</b></p></tpl>';
//            content += '<p><small>' + key + '</small><br/>' + prop.name + ': <b>' + value + units + '</b></p>';
        }
        return content;

    }

});