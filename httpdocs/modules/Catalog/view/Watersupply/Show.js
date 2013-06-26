Ext.define('EC.Catalog.view.Watersupply.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.WatersupplyShow'],
    
    layout: 'fit',
    
    initComponent: function() {
        
        this.showTpl = Ext.create('Ext.XTemplate', 
            '<div style="padding: 10px;"><table width="100%" border="0">',
            '<tr valign="top">',
            
            '<td rowspan="2" width="320"><img src="http://placehold.it/300x220"/>',
            
            '<p>Ссылка: <b>{url}</b></p><br/>',
            '<p>Цена: <b>{price}&nbsp;р.</b></p>',
            '<p>СМР: <b>{mount_price}&nbsp;р.</b></p>',
            
            '</td><td colspan="3" height="40"><h1><p>',
            '{[this.r("FilterMark", values.mark_id)]} ',
            '{marking}</p></h1>',
            '<p>Артикул: <b>{code}</b></p>',
            '<p>Группа оборудования: <b>',
            '{[this.r("WatersupplyFilterGroup", values.group_id)]}',
            '</b></p>',
            
            '</td></tr><tr valign="top"><td>',
            '<p>Тип продукции: <b>',
            '{[this.r("WatersupplyFilterProductType", values.product_type_id)]}',
            '</b></p>',
            '<p>Тип исполнения: <b>',
            '{[this.r("WatersupplyFilterImplementationType", values.implementation_type_id)]}',
            '</b></p>',
            '<p>Способ управления системой: <b>',
            '{[this.r("WatersupplyFilterControlType", values.control_type_id)]}',
            '</b></p>',
            '<p>Тип присоединения: <b>',
            '{[this.r("WatersupplyFilterConnectionType", values.connection_type_id)]}',
            '</b></p>',
            '<p>Тип защиты: <b>',
            '{[this.r("WatersupplyFilterProtectionType", values.protection_type_id)]}',
            '</b></p>',
            '<p>Источник питания: <b>',
            '{[this.r("WatersupplyFilterPowerSource", values.power_source_id)]}',
            '</b></p>',
            '<p>Материал: <b>',
            '{[this.r("WatersupplyFilterMaterial", values.material_id)]}',
            '</b></p>',
            '<p>Страна изготовления: <b>',
            '{[this.r("WatersupplyFilterCountry", values.country)]}',
            '</b></p>',
            '<p>Гарантированный диапазон наружных температур (обогрев): <b>{temp}&nbsp;°C</b></p>',
            '<p>Напряжение питания: <b>{power_supply}&nbsp;В</b></p>',
            
            '</td><td>',
            
            '<p>Потребляемая мощность (обогрев): <b>{heating_power_consumption}&nbsp;кВт</b></p>',
            '<p>Рабочий ток: <b>{amperage}&nbsp;ампер</b></p>',
            '<p>Входов для подключаемых датчиков: <b>{sensor_inputs}&nbsp;ед.</b></p>',
            '<p>Давление: <b>{pressure}&nbsp;бар</b></p>',
            '<p>Уровень шума (мин): <b>{noise_level_min}&nbsp;дБ(А)</b></p>',
            '<p>Производительность фильтров: <b>{filters_performance}&nbsp;м³/ч</b></p>',
            '<p>Производительность: <b>{performance}&nbsp;м³/ч</b></p>',
            '<p>Крупность выделения загрязнений: <b>{pollution_size}&nbsp;мкм</b></p>',
            '<p>Энергоэффективность: <b>{eer}&nbsp;EER</b></p>',
            '<p>Вес: <b>{weight}&nbsp;кг</b></p>',
            '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>',
            '<p>Длина кабеля: <b>{cable_length}&nbsp;мм</b></p>',
            
            '</td><td>',
            
            '<p>Диаметр трубы: <b>{pipe_diameter}&nbsp;мм</b></p>',
            '<p>Высота подачи: <b>{delivery_height}&nbsp;м</b></p>',
            '<p>Глубина погружения: <b>{immersion_depth}&nbsp;м</b></p>',
            '<p>Гарантия: <b>{warranty}&nbsp;лет</b></p>',
            '<p>Склад: <b>{storage}&nbsp;ед.</b></p>',
            '<p>Резерв: <b>{reserve}&nbsp;ед.</b></p>',
            '<p>Заказ: <b>{order}&nbsp;ед.</b></p>',
            
            '</td></tr></table></div>',
            {r: Ext.bind(this.comboRenderer, this)}
        );
        
        this.callParent(arguments);
    }
});