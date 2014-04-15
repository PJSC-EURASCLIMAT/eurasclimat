Ext.define('EC.Catalog.controller.Router', {
    
    extend: 'Ext.app.Controller',

    airingTpl: Ext.create('Ext.XTemplate',

        '<div style="padding: 10px;"><table width="100%" border="0">' +
            '<tr valign="top">' +

            '<td rowspan="2" width="320">' +
            '<tpl if="[values.images.length] &gt; 0">' +
            '<img src="/images/catalog/{[values.images[0].name]}"/>' +
            '<tpl else>' +
            '<img src="http://placehold.it/300x220"/>' +
            '</tpl>' +

            '<p>Ссылка: <b>{url}</b></p><br/>' +
            '<p>Цена: <b>{price}&nbsp;р.</b></p>' +
            '<p>СМР: <b>{mount_price}&nbsp;р.</b></p>' +

            '</td><td colspan="3" height="40"><h1><p>' +
            '{mark_name} ' +
            '{marking}</p></h1>' +
            '<p>Артикул: <b>{code}</b></p>' +
            '<p>Группа оборудования: <b>' +
            '{group_name}' +
            '</b></p>' +

            '</td></tr><tr valign="top"><td>' +
            '<p>Тип продукции: <b>' +
            '{product_type_name}' +
            '</b></p>' +
            '<p>Тип исполнения: <b>' +
            '{implementation_type_name}' +
            '</b></p>' +
            '<p>Способ управления системой: <b>' +
            '{control_type_name}' +
            '</b></p>' +
            '<p>Тип присоединения: <b>' +
            '{connection_type_name}' +
            '</b></p>' +
            '<p>Тип защиты: <b>' +
            '{protection_type_name}' +
            '</b></p>' +
            '<p>Источник питания: <b>' +
            '{power_source_name}' +
            '</b></p>' +
            '<p>Материал: <b>' +
            '{material_name}' +
            '</b></p>' +
            '<p>Класс изоляции: <b>' +
            '{isolation_class_name}' +
            '</b></p>' +
            '<p>Страна изготовления: <b>' +
            //TODO нужно откуда-то взять это значение
            '{country}' +
            '</b></p>' +
            '<p>Гарантированный диапазон наружных температур (охлаждение): <b>{temp}&nbsp;°C</b></p>' +
            '<p>Напряжение питания: <b>{power_supply}&nbsp;В</b></p>' +

            '</td><td>' +

            '<p>Потребляемая мощность (обогрев): <b>{heating_power_consumption}&nbsp;кВт</b></p>' +
            '<p>Рабочий ток: <b>{amperage}&nbsp;ампер</b></p>' +
            '<p>Входов для подключаемых датчиков: <b>{sensor_inputs}&nbsp;ед.</b></p>' +
            '<p>Максимальное рабочее давление: <b>{pressure}&nbsp;бар</b></p>' +
            '<p>Уровень звукового давления: <b>{noise_level_min}&nbsp;дБ(А)</b></p>' +
            '<p>Энергоэффективность: <b>{eer}&nbsp;EER</b></p>' +
            '<p>Вес: <b>{weight}&nbsp;кг</b></p>' +
            '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>' +
            '<p>Длина кабеля: <b>{cable_length}&nbsp;мм</b></p>' +

            '</td><td>' +

            '<p>Диаметр трубок: <b>{pipe_diameter}&nbsp;мм</b></p>' +
            '<p>Скорость: <b>{speed}&nbsp;1/мин</b></p>' +
            '<p>Макс. расход воздуха: <b>{air_flow}&nbsp;м³/ч</b></p>' +
            '<p>Гарантия: <b>{warranty}&nbsp;лет</b></p>' +
            '<p>Склад: <b>{storage}&nbsp;ед.</b></p>' +
            '<p>Резерв: <b>{reserve}&nbsp;ед.</b></p>' +
            '<p>Заказ: <b>{order}&nbsp;ед.</b></p>' +

            '</td></tr></table></div>'
    ),

    showInfo: function(params, id) {
        var me = this,
            tpl = me[params.category + 'Tpl'];

        var fn = function(response) {
            var data = Ext.decode(response.responseText).data;
            if ( Ext.isEmpty( data ) ) return;

            var win = Ext.create('Ext.window.Window',{
                title: 'Карточка товара',
                layout: 'fit',
                border: false,
                autoShow: true,
                resizable: true,
                maximizable: true,
                modal: true,
                width: 700,
                height: 400,
                items: [{
                    xtype: 'container',
                    itemId: 'content',
                    bodyPadding: 10,
                    autoScroll: true
                }]
            });

            win.down('#content').update( tpl.apply( data ) );
        };

        Ext.Ajax.request({
            params: params,
            url: '/json/catalog/info/get',
            success: fn,
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить карточку специалиста.');
            },
            scope: this
        });




    }

});