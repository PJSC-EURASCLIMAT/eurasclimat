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
            
            '<p>Цена: <b>{price}&nbsp;{[this.r("ConditionersFilterCurrency", values.currency_id)]}</b></p>',
            '<p>Артикул: <b>{code}</b></p>',
            '<p>Описание:</p>',
            '<p style="text-align: justify; padding-right: 20px; text-indent: 20px;">' +
            '{description}<p>',
            
            '</td><td colspan="2" height="40"><h1><p>',
            '{name} ',
            '{[this.r("FilterMark", values.mark_id)]} ',
            '{marking}</p></h1>',
            '<p>Группа оборудования: <b>',
            '{[this.r("ConditionersFilterGroup", values.group_id)]}',
            '</b></p>',
            
            '</td></tr><tr valign="top"><td>',
            '<p>Тип продукции: <b>',
            '{[this.r("ConditionersFilterProductType", values.product_type_id)]}',
            '</b></p>',
            '<p>Тип исполнения системы: <b>',
            '{[this.r("ConditionersFilterImplementationType", values.implementation_type_id)]}',
            '</b></p>',
            '<p>Охлаждение/нагрев: <b>',
            '{[this.r("ConditionersFilterHeatingCooling", values.heatingcooling_id)]}',
            '</b></p>',
            '<p>Наличие инвертора: <b>',
            '{[this.r("ConditionersFilterPowerSource", values.power_source_id)]}',
            '</b></p>',
            '<p>Страна производитель: <b>',
            '{[this.r("ConditionersFilterCountry", values.country)]}',
            '</b></p>',
            '<p>Холодопроизводительность: <b>{cooling_capacity}&nbsp;кВт</b></p>',
            '<p>Теплопроизводительность: <b>{heating_capacity}&nbsp;кВт</b></p>',
            
            '</td><td>',
            
            '<p>Расход воздуха (мин): <b>{air_consumption_min}&nbsp;м³/ч</b></p>',
            '<p>Расход воздуха (макс): <b>{air_consumption_max}&nbsp;м³/ч</b></p>',
            '<p>Уровень шума (мин): <b>{noise_level_min}&nbsp;дБ(А)</b></p>',
            '<p>Уровень шума (макс): <b>{noise_level_max}&nbsp;дБ(А)</b></p>',
            '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>',
            '<p>Гарантия: <b>{warranty}&nbsp;лет</b></p>',
            
            '</td></tr></table></div>', 
            {r: Ext.bind(this.comboRenderer, this)}
        );
        
        this.callParent(arguments);
    }
});