Ext.define('EC.Catalog.view.Electricity.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.ElectricityShow'],
    
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
            '<p>Группа оборудования: <b>',
            '{[this.r("ElectricityFilterGroup", values.group_id)]}',
            '</b></p>',
            
            '</td></tr><tr valign="top"><td>',
            '<p>Тип продукции: <b>',
            '{[this.r("ElectricityFilterProductType", values.product_type_id)]}',
            '</b></p>',
            '<p>Тип исполнения: <b>',
            '{[this.r("ElectricityFilterImplementationType", values.implementation_type_id)]}',
            '</b></p>',
            '<p>Способ управления системой: <b>',
            '{[this.r("ElectricityFilterControlType", values.control_type_id)]}',
            '</b></p>',
            '<p>Тип присоединения: <b>',
            '{[this.r("ElectricityFilterConnectionType", values.connection_type_id)]}',
            '</b></p>',
            '<p>Тип защиты: <b>',
            '{[this.r("ElectricityFilterProtectionType", values.protection_type_id)]}',
            '</b></p>',
            '<p>Источник питания: <b>',
            '{[this.r("ElectricityFilterPowerSource", values.power_source_id)]}',
            '</b></p>',
            '<p>Материал: <b>',
            '{[this.r("ElectricityFilterMaterial", values.material_id)]}',
            '</b></p>',
            '<p>Тип изоляции: <b>',
            '{[this.r("ElectricityFilterIsolationType", values.isolation_type_id)]}',
            '</b></p>',
            '<p>Страна изготовления: <b>',
            '{[this.r("ElectricityFilterCountry", values.country)]}',
            '</b></p>',
            '<p>Рекомендованные температуры эксплуатации: <b>{temp}&nbsp;°C</b></p>',
            '<p>Напряжение питания: <b>{power_supply}&nbsp;В</b></p>',
            
            '</td><td>',
            
            '<p>Мощность: <b>{power}&nbsp;кВт</b></p>',
            '<p>Рабочий ток: <b>{amperage}&nbsp;ампер</b></p>',
            '<p>Входов для подключаемых датчиков: <b>{sensor_inputs}&nbsp;ед.</b></p>',
            '<p>Уровень шума (мин): <b>{noise_level_min}&nbsp;дБ(А)</b></p>',
            '<p>Энергоэффективность: <b>{eer}&nbsp;EER</b></p>',
            '<p>Вес: <b>{weight}&nbsp;кг</b></p>',
            '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>',
            '<p>Длина кабеля: <b>{cable_length}&nbsp;мм</b></p>',
            
            '</td><td>',
            
            '<p>Макс. частота вращения: <b>{speed}&nbsp;1/мин</b></p>',
            '<p>Время переключения: <b>{switching_time}&nbsp;с</b></p>',
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