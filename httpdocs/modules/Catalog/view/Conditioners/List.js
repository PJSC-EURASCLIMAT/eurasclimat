Ext.define('EC.Catalog.view.Conditioners.List', {

    extend: 'EC.Catalog.view.ListAbstract',
    
    alias: 'widget.ConditionersList',
    
    store: 'EC.Catalog.store.Conditioners',
    
    updatePermission: acl.isUpdate('catalog', 'conditioners'),
    
    rowBodyTpl:  
        '<div style="padding: 10px;"><table width="100%" border="0">' + 
        '<tr valign="top">' + 
        
        '<td rowspan="2" width="320">' +
        '<tpl if="[values.images.length] &gt; 0">' +
            '<img src="/images/catalog/{[values.images[0].name]}"/>' +
        '<tpl else>' + 
            '<img src="http://placehold.it/300x220"/>' +
        '</tpl>' + 
        
        '<p>Цена: <b>{price}&nbsp;' + 
        '{[this.r("ConditionersFilterCurrency", values.currency_id)]}' +
        '</b></p>' + 
        '<p>Артикул: <b>{code}</b></p>' + 

        '</td><td colspan="2" height="40"><h1><p>' +
        '{name} ' +
        '{[this.r("FilterMark", values.mark_id)]} ' + 
        '{marking}</p></h1>' + 
        '<p>Группа оборудования: <b>' + 
        '{[this.r("ConditionersFilterGroup", values.group_id)]}' + 
        '</b></p>' + 
        
        '</td></tr><tr valign="top"><td>' + 
        '<p>Тип продукции: <b>' + 
        '{[this.r("ConditionersFilterProductType", values.product_type_id)]}' + 
        '</b></p>' + 
        '<p>Тип исполнения системы: <b>' + 
        '{[this.r("ConditionersFilterImplementationType", values.implementation_type_id)]}' + 
        '</b></p>' + 
        '<p>Охлаждение/нагрев: <b>' +
        '{[this.r("ConditionersFilterHeatingCooling", values.heatingcooling_id)]}' +
        '</b></p>' + 
        '<p>Наличие инвертора: <b>' + 
        '{[this.r("ConditionersFilterPowerSource", values.power_source_id)]}' + 
        '</b></p>' +
        '<p>Страна производитель: <b>' + 
        '{[this.r("ConditionersFilterCountry", values.country)]}' + 
        '</b></p>' + 
        '<p>Холодопроизводительность: <b>{cooling_capacity}&nbsp;кВт</b></p>' + 
        '<p>Теплопроизводительность: <b>{heating_capacity}&nbsp;кВт</b></p>' + 
        
        '</td><td>' + 
        
        '<p>Расход воздуха (мин): <b>{air_consumption_min}&nbsp;м³/ч</b></p>' + 
        '<p>Расход воздуха (макс): <b>{air_consumption_max}&nbsp;м³/ч</b></p>' + 
        '<p>Уровень шума (мин): <b>{noise_level_min}&nbsp;дБ(А)</b></p>' + 
        '<p>Уровень шума (макс): <b>{noise_level_max}&nbsp;дБ(А)</b></p>' + 
        '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>' + 
        '<p>Гарантия: <b>{warranty}&nbsp;лет</b></p>' + 
        
        '</td></tr></table></div>',
        
    initComponent: function() {

        this.columns = [{
            header: 'Марка',
            dataIndex: 'mark_id',
            width: 100,
            renderer: function(value) {
                return this.comboRenderer('FilterMark', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Группа оборудования',
            dataIndex: 'group_id',
            hidden: true,
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterGroup', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Маркировка',
            width: 150,
            dataIndex: 'marking',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Наименование',
            tooltip: 'Брендовое наименование модели (серии)',
            flex: 1,
            dataIndex: 'name',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Артикул',
            width: 100,
            hidden: true,
            dataIndex: 'code',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Тип продукции',
            width: 150,
            dataIndex: 'product_type_id',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterProductType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип исполнения системы',
            width: 150,
            dataIndex: 'implementation_type_id',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterImplementationType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Охлаждение/нагрев',
            hidden: true,
            dataIndex: 'heatingcooling_id',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterHeatingCooling', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Наличие инвертора',
            hidden: true,
            dataIndex: 'power_source_id',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterPowerSource', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Страна производитель',
            hidden: true,
            dataIndex: 'country',
            renderer: function(value) {
                return this.comboRenderer('ConditionersFilterCountry', value);
            },
            filter: {
                type: 'string'
            }
        }, {
            header: 'Холодопроизводительность (кВт)',
            hidden: true,
            dataIndex: 'cooling_capacity',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Теплопроизводительность (кВт)',
            hidden: true,
            dataIndex: 'heating_capacity',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Расход воздуха (мин) (м³/ч)',
            hidden: true,
            dataIndex: 'air_consumption_min',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Расход воздуха (макс) (м³/ч)',
            hidden: true,
            dataIndex: 'air_consumption_max',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Уровень шума (мин) (дБ(А))',
            hidden: true,
            dataIndex: 'noise_level_min',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Уровень шума (макс) (дБ(А))',
            hidden: true,
            dataIndex: 'noise_level_max',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Габариты (ШхДхВ) (мм)',
            hidden: true,
            dataIndex: 'dimensions'
        }, {
            header: 'Гарантия (лет)',
            hidden: true,
            dataIndex: 'warranty',
            filter: {
                type: 'numeric'
            }
        }, { 
            header: 'Сезонная энергоэффективность (SEER)',
            hidden: true,
            dataIndex: 'seer'
        }, {
            header: 'Сезонная энергоэффективность (SCOP)',
            hidden: true,
            dataIndex: 'scop'
        }, {
            header: 'Макс. количество внутренних блоков (шт.)',
            hidden: true,
            dataIndex: 'maxblocks',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Количество портов (шт.)',
            hidden: true,
            dataIndex: 'ports',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Уровень звуковой мощности (дБ(А))',
            hidden: true,
            dataIndex: 'sound_power_level',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Рабочий ток (А)',
            hidden: true,
            dataIndex: 'working_amperage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Рабочий ток (А)',
            hidden: true,
            dataIndex: 'operating_amperage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Макс. Рабочий ток (А)',
            hidden: true,
            dataIndex: 'max_working_amperage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Заводская заправка хладагента (кг)',
            hidden: true,
            dataIndex: 'factory_refrigerant_charge',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Цена',
            width: 80,
            dataIndex: 'price',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Валюта',
            width: 80,
            dataIndex: 'currency_id',
            renderer: function(value) {
                return value == '0' ? '' : this.comboRenderer('ConditionersFilterCurrency', value);
            },
            filter: {
                type: 'numeric'
            }
        }];

        this.callParent(arguments);
    }
});