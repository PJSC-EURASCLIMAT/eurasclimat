Ext.define('EC.Catalog.view.Conditioners.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.ConditionersShow'],
    
    layout: 'fit',
    
    initComponent: function() {
        
        this.showTpl = Ext.create('Ext.XTemplate', 
            '<div style="padding: 10px;"><table width="100%" border="0">',
            '<tr valign="top">',
            
            '<td rowspan="2" width="320">',
            '<tpl if="[values.images.length] &gt; 0">',
                '<img src="/images/catalog/{[values.images[0].name]}"/>',
            '<tpl else>',
                '<img src="http://placehold.it/300x220"/>',
            '</tpl>',
            
            '<p>Ссылка: <b>{url}</b></p><br/>',
            '<p>Цена: <b>{price}&nbsp;р.</b></p>',
            '<p>СМР: <b>{mount_price}&nbsp;р.</b></p>',
            '<p>Описание:</p>',
            '<p style="text-align: justify; padding-right: 20px; text-indent: 20px;">' +
            '{description}<p>',
            
            '</td><td colspan="3" height="40"><h1><p>',
            '{[this.r("FilterMark", values.mark_id)]} ',
            '{marking}</p></h1>',
            '<p>Артикул: <b>{code}</b></p>',
            '<p>Группа оборудования: <b>',
            '{[this.r("ConditionersFilterGroup", values.group_id)]}',
            '</b></p>',
            
            '</td></tr><tr valign="top"><td>',
            '<p>Тип продукции: <b>',
            '{[this.r("ConditionersFilterProductType", values.product_type_id)]}',
            '</b></p>',
            '<p>Тип исполнения: <b>',
            '{[this.r("ConditionersFilterImplementationType", values.implementation_type_id)]}',
            '</b></p>',
            '<p>Способ управления системой: <b>',
            '{[this.r("ConditionersFilterControlType", values.control_type_id)]}',
            '</b></p>',
            '<p>Тип присоединения: <b>',
            '{[this.r("ConditionersFilterConnectionType", values.connection_type_id)]}',
            '</b></p>',
            '<p>Тип защиты: <b>',
            '{[this.r("ConditionersFilterProtectionType", values.protection_type_id)]}',
            '</b></p>',
            '<p>Источник питания: <b>',
            '{[this.r("ConditionersFilterPowerSource", values.power_source_id)]}',
            '</b></p>',
            '<p>Материал: <b>',
            '{[this.r("ConditionersFilterMaterial", values.material_id)]}',
            '</b></p>',
            '<p>Страна изготовления: <b>',
            '{[this.r("ConditionersFilterCountry", values.country)]}',
            '</b></p>',
            '<p>Холодопроизводительность: <b>{cooling_capacity}&nbsp;кВт</b></p>',
            '<p>Теплопроизводительность: <b>{heating_capacity}&nbsp;кВт</b></p>',
            '<p>Гарантированный диапазон наружных температур (охлаждение): <b>{cooling_outdor_temp}&nbsp;°C</b></p>',
            '<p>Гарантированный диапазон наружных температур (обогрев): <b>{heating_outdor_temp}&nbsp;°C</b></p>',
            '<p>Напряжение питания: <b>{power_supply}&nbsp;В</b></p>',
            
            '</td><td>',
            
            '<p>Потребляемая мощность (охлаждение): <b>{cooling_power_consumption}&nbsp;кВт</b></p>',
            '<p>Потребляемая мощность (обогрев): <b>{heating_power_consumption}&nbsp;кВт</b></p>',
            '<p>Рабочий ток: <b>{amperage}&nbsp;ампер</b></p>',
            '<p>Расход воздуха (мин): <b>{air_consumption_min}&nbsp;м³/ч</b></p>',
            '<p>Расход воздуха (макс): <b>{air_consumption_max}&nbsp;м³/ч</b></p>',
            '<p>Входов для подключаемых датчиков: <b>{sensor_inputs}&nbsp;ед.</b></p>',
            '<p>Давление: <b>{pressure}&nbsp;бар</b></p>',
            '<p>Уровень шума (мин): <b>{noise_level_min}&nbsp;дБ(А)</b></p>',
            '<p>Уровень шума (макс): <b>{noise_level_max}&nbsp;дБ(А)</b></p>',
            '<p>Энергоэффективность: <b>{eer}&nbsp;EER</b></p>',
            '<p>Вес: <b>{weight}&nbsp;кг</b></p>',
            '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>',
            '<p>Длина кабеля: <b>{cable_length}&nbsp;мм</b></p>',
            
            '</td><td>',
            
            '<p>Диаметр трубок (жидкость): <b>{pipe_diameter_liquid}&nbsp;мм</b></p>',
            '<p>Диаметр трубок (газ): <b>{pipe_diameter_gas}&nbsp;мм</b></p>',
            '<p>Диаметр дренажа: <b>{drain_diameter}&nbsp;мм</b></p>',
            '<p>Максимальная длина магистрали: <b>{trunk_length}&nbsp;м</b></p>',
            '<p>Максимальный перепад высот: <b>{elevation_difference}&nbsp;м</b></p>',
            '<p>Площадь кондиционирования: <b>{square}&nbsp;м²</b></p>',
            '<p>Площадь кондиционирования: <b>{volume}&nbsp;м³/ч</b></p>',
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