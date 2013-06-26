Ext.define('EC.Catalog.view.Dustextraction.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.DustextractionShow'],
    
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
            '{[this.r("DustextractionFilterGroup", values.group_id)]}',
            '</b></p>',
            
            '</td></tr><tr valign="top"><td>',
            '<p>Фильтрация: <b>',
            '{[this.r("DustextractionFilterFiltration", values.filtration_id)]}',
            '</b></p>',
            '<p>Тип мотора: <b>',
            '{[this.r("DustextractionFilterMotor", values.motor_id)]}',
            '</b></p>',
            '<p>Страна изготовления: <b>',
            '{[this.r("DustextractionFilterCountry", values.country)]}',
            '</b></p>',
            '<p>Потребляемая мощность: <b>{power_consumption}&nbsp;кВт</b></p>',
            '<p>Мощность всасывания: <b>{vacuum_power}&nbsp;АэроВатт</b></p>',
            '<p>Поток воздуха: <b>{air_flow}&nbsp;м³/ч</b></p>',
            '<p>Уровень вакуума: <b>{vacuum_pressure}&nbsp;кПа</b></p>',
            '<p>Уровень шума: <b>{noise_level}&nbsp;дБ</b></p>',
            
            '</td><td>',
            
            '<p>Предохранитель: <b>{amperage}&nbsp;ампер</b></p>',
            '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>',
            '<p>Максимальная площадь уборки: <b>{cleaning_square}&nbsp;м²</b></p>',
            '<p>Площадь фильтра: <b>{filter_square}&nbsp;м²</b></p>',
            '<p>Максимально удаленный пневмоклапан: <b>{max_remote_pneumo_valve}&nbsp;м</b></p>',
            '<p>Максимальная высота стояка: <b>{max_riser_height}&nbsp;м</b></p>',
            '<p>Максимальная длина горизонтальной разводки: <b>{max_cabling_length}&nbsp;м</b></p>',
            '<p>Диаметр стояка: <b>{riser_diameter}&nbsp;мм</b></p>',
            '<p>Диаметр горизонтальной разводки: <b>{cabling_diameter}&nbsp;мм</b></p>',
            '<p>Резервуар для пыли: <b>{dust_tank}&nbsp;л</b></p>',
            '<p>Ресурс гарантированной работы мотора: <b>{motor_resource}&nbsp;ч</b></p>',
            '<p>Наибольшее количество одновременных пользователей: <b>{max_users}&nbsp;ед.</b></p>',
            
            '</td><td>',
            
            '<p>Дополнительный клапан на корпусе: <b>{extra_case_valve}&nbsp;есть/нет</b></p>',
            '<p>Soft-start: <b>{soft_start}&nbsp;есть/нет</b></p>',
            '<p>Clean-pipe: <b>{clean_pipe}&nbsp;есть/нет</b></p>',
            '<p>Регулировка мощности всасывания: <b>{vacuum_power_adj}&nbsp;есть/нет</b></p>',
            '<p>LCD дисплей на корпусе: <b>{case_lcd}&nbsp;есть/нет</b></p>',
            '<p>Регулировочный клапан: <b>{regulating_valve}&nbsp;есть/нет</b></p>',
            '<p>Продувной клапан: <b>{downy_valve}&nbsp;есть/нет</b></p>',
            '<p>Автоматическая чистка фильтра: <b>{auto_clean}&nbsp;есть/нет</b></p>',
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