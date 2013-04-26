Ext.define('EC.Catalog.view.Automation.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.AutomationEdit',

    title: 'Новая позиция',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    width: 1000,
    
    height: 600,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'tabpanel',
            items: [{
                title: 'Параметры',
                xtype: 'form',
                layout: 'column',
                columns: 4,
                defaults: {
                    border: false,
                    padding: 5
                },
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 160,
                    anchor: '-5'
                },
                items: [{
                    xtype: 'FilterMark',
                    name: 'mark_id'
                }, {
                    xtype: 'AutomationFilterGroup',
                    name: 'group_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }, {
                    xtype: 'AutomationFilterProductType',
                    name: 'product_type_id'
                }, {
                    xtype: 'AutomationFilterImplementationType',
                    name: 'implementation_type_id'
                }, {
                    xtype: 'AutomationFilterControlType',
                    name: 'control_type_id'
                }, {
                    xtype: 'AutomationFilterConnectionType',
                    name: 'connection_type_id'
                }, {
                    xtype: 'AutomationFilterProtectionType',
                    name: 'protection_type_id'
                }, {
                    xtype: 'AutomationFilterPowerSource',
                    name: 'power_source_id'
                }, {
                    xtype: 'AutomationFilterMaterial',
                    name: 'material_id'
                }, {
                    xtype: 'AutomationFilterIsolationType',
                    name: 'isolation_type_id'
                }, {
                    xtype: 'AutomationFilterCountry',
                    name: 'country'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Диапазон регулируемой температуры (°C)',
                    name: 'temp_adjustment_range'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Диапазон температурной настройки (°C)',
                    name: 'temp_setting_range'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Напряжение питания (В)',
                    name: 'power_supply'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Потребляемая мощность (обогрев) (кВт)',
                    name: 'heating_power_consumption'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Рабочий ток (ампер)',
                    name: 'amperage'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Входов для подключаемых датчиков (ед.)',
                    name: 'sensor_inputs'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Диапазон перепада давления (бар)',
                    name: 'pressure'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Уровень шума (мин) (дБ(А))',
                    name: 'noise_level_min'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Энергоэффективность (EER)',
                    name: 'eer'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Вес (кг)',
                    name: 'weight'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Габариты (ШхДхВ) (мм)',
                    name: 'dimensions'
                }, { 
                    xtype: 'numberfield',
                    fieldLabel: 'Длина кабеля (мм)',
                    name: 'cable_length'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Угол распыла (град.)',
                    name: 'spray_angle'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Гарантия (лет)',
                    name: 'warranty'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Склад (ед.)',
                    name: 'storage'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Резерв (ед.)',
                    name: 'reserve'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Заказ (ед.)',
                    name: 'order'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Ссылка',
                    name: 'url'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Цена (р)',
                    name: 'price'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'СМР (р)',
                    name: 'mount_price'
                }]
            }, {
                xtype: 'CatalogImages',
                catalog: 'automation',
                allowEdit: this.allowEdit
            }],
            buttons: [{
                text: 'Сохранить',
                action: 'save'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});