Ext.define('EC.Catalog.view.Heating.List', {

    extend: 'EC.Catalog.view.ListAbstract',
   
    alias: 'widget.HeatingList',
    
    store: 'EC.Catalog.store.Heating',
    
    updatePermission: acl.isUpdate('catalog', 'heating'),
    
    rowBodyTpl:  
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
        '{[this.r("FilterMark", values.mark_id)]} ' + 
        '{marking}</p></h1>' +  
        '<p>Артикул: <b>{code}</b></p>' +
        '<p>Группа оборудования: <b>' + 
        '{[this.r("HeatingFilterGroup", values.group_id)]}' + 
        '</b></p>' + 
        
        '</td></tr><tr valign="top"><td>' + 
        '<p>Тип продукции: <b>' + 
        '{[this.r("HeatingFilterProductType", values.product_type_id)]}' + 
        '</b></p>' + 
        '<p>Тип исполнения: <b>' + 
        '{[this.r("HeatingFilterImplementationType", values.implementation_type_id)]}' + 
        '</b></p>' + 
        '<p>Способ управления системой: <b>' + 
        '{[this.r("HeatingFilterControlType", values.control_type_id)]}' + 
        '</b></p>' + 
        '<p>Тип присоединения: <b>' + 
        '{[this.r("HeatingFilterConnectionType", values.connection_type_id)]}' + 
        '</b></p>' + 
        '<p>Тип защиты: <b>' + 
        '{[this.r("HeatingFilterProtectionType", values.protection_type_id)]}' + 
        '</b></p>' + 
        '<p>Источник питания: <b>' + 
        '{[this.r("HeatingFilterPowerSource", values.power_source_id)]}' + 
        '</b></p>' + 
        '<p>Материал: <b>' + 
        '{[this.r("HeatingFilterMaterial", values.material_id)]}' + 
        '</b></p>' + 
        '<p>Страна изготовления: <b>' + 
        '{[this.r("HeatingFilterCountry", values.country)]}' + 
        '</b></p>' + 
        '<p>Максимальная температура горячей воды: <b>{temp}&nbsp;°C</b></p>' + 
        '<p>Напряжение питания: <b>{power_supply}&nbsp;В</b></p>' + 
        
        '</td><td>' + 
        
        '<p>Потребляемая мощность (обогрев): <b>{heating_power_consumption}&nbsp;кВт</b></p>' + 
        '<p>Мощность котла: <b>{power}&nbsp;кВт</b></p>' + 
        '<p>Производительность: <b>{productivity}&nbsp;кг/ч</b></p>' + 
        '<p>Мощность горелки: <b>{burner_power}&nbsp;кВт</b></p>' + 
        '<p>Рабочий ток: <b>{amperage}&nbsp;ампер</b></p>' + 
        '<p>Входов для подключаемых датчиков: <b>{sensor_inputs}&nbsp;ед.</b></p>' + 
        '<p>Давление: <b>{pressure}&nbsp;бар</b></p>' + 
        '<p>Уровень шума (мин): <b>{noise_level_min}&nbsp;дБ(А)</b></p>' + 
        '<p>Противодавление топки: <b>{back_pressure}&nbsp;мбар</b></p>' + 
        '<p>Энергоэффективность: <b>{eer}&nbsp;EER</b></p>' + 
        '<p>Вес: <b>{weight}&nbsp;кг</b></p>' + 
        '<p>Габариты (ШхДхВ): <b>{dimensions}&nbsp;мм</b></p>' + 
        '<p>Длина кабеля: <b>{cable_length}&nbsp;мм</b></p>' + 
        
        '</td><td>' + 
        
        '<p>Длина горелочной трубы: <b>{burner_tube_length}&nbsp;мм</b></p>' + 
        '<p>Отверстие для горелки: <b>{burner_tube_hole}&nbsp;мм</b></p>' + 
        '<p>Диаметр дымохода: <b>{chimney_diameter}&nbsp;мм</b></p>' + 
        '<p>КПД: <b>{efficiency}&nbsp;%</b></p>' + 
        '<p>Гарантия: <b>{warranty}&nbsp;лет</b></p>' + 
        '<p>Склад: <b>{storage}&nbsp;ед.</b></p>' + 
        '<p>Резерв: <b>{reserve}&nbsp;ед.</b></p>' + 
        '<p>Заказ: <b>{order}&nbsp;ед.</b></p>' + 
        
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
            flex: 1,
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterGroup', value);
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
            header: 'Артикул',
            width: 100,
            dataIndex: 'code',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Тип продукции',
            width: 150,
            dataIndex: 'product_type_id',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterProductType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип исполнения',
            width: 150,
            dataIndex: 'implementation_type_id',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterImplementationType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Способ управления системой',
            hidden: true,
            dataIndex: 'control_type_id',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterControlType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип присоединения',
            hidden: true,
            dataIndex: 'connection_type_id',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterConnectionType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Тип защиты',
            hidden: true,
            dataIndex: 'protection_type_id',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterProtectionType', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Источник питания',
            hidden: true,
            dataIndex: 'power_source_id',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterPowerSource', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Материал',
            hidden: true,
            dataIndex: 'material_id',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterMaterial', value);
            },
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Страна',
            hidden: true,
            dataIndex: 'country',
            renderer: function(value) {
                return this.comboRenderer('HeatingFilterCountry', value);
            },
            filter: {
                type: 'string'
            }
        }, {
            header: 'Максимальная температура горячей воды (°C)',
            hidden: true,
            dataIndex: 'temp'
        }, {
            header: 'Напряжение питания (В)',
            hidden: true,
            dataIndex: 'power_supply',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Потребляемая мощность (обогрев) (кВт)',
            hidden: true,
            dataIndex: 'heating_power_consumption',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Мощность котла (кВт)',
            hidden: true,
            dataIndex: 'power',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Производительность (кг/ч)',
            hidden: true,
            dataIndex: 'productivity',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Мощность горелки (кВт)',
            hidden: true,
            dataIndex: 'burner_power',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Рабочий ток (ампер)',
            hidden: true,
            dataIndex: 'amperage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Входов для подключаемых датчиков (ед.)',
            hidden: true,
            dataIndex: 'sensor_inputs',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Давление (бар)',
            hidden: true,
            dataIndex: 'pressure'
        }, {
            header: 'Уровень шума (мин) (дБ(А))',
            hidden: true,
            dataIndex: 'noise_level_min',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Противодавление топки (мбар)',
            hidden: true,
            dataIndex: 'back_pressure',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Энергоэффективность (EER)',
            hidden: true,
            dataIndex: 'eer',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Вес (кг)',
            hidden: true,
            dataIndex: 'weight',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Габариты (ШхДхВ) (мм)',
            hidden: true,
            dataIndex: 'dimensions'
        }, {
            header: 'Длина кабеля (мм)',
            hidden: true,
            dataIndex: 'cable_length',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Длина горелочной трубы (мм)',
            hidden: true,
            dataIndex: 'burner_tube_length',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Отверстие для горелки (мм)',
            hidden: true,
            dataIndex: 'burner_tube_hole',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Диаметр дымохода (мм)',
            hidden: true,
            dataIndex: 'chimney_diameter',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'КПД (%)',
            hidden: true,
            dataIndex: 'efficiency',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Гарантия (лет)',
            hidden: true,
            dataIndex: 'warranty',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Склад (ед.)',
            hidden: true,
            dataIndex: 'storage',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Резерв (ед.)',
            hidden: true,
            dataIndex: 'reserve',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Заказ (ед.)',
            hidden: true,
            dataIndex: 'order',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'Ссылка',
            hidden: true,
            dataIndex: 'url'
        }, {
            header: 'Цена (р)',
            width: 80,
            dataIndex: 'price',
            filter: {
                type: 'numeric'
            }
        }, {
            header: 'СМР (р)',
            hidden: true,
            dataIndex: 'mount_price',
            filter: {
                type: 'numeric'
            }
        }];

        this.callParent(arguments);
    }
});