Ext.define('EC.Catalog.view.Conditioners.Edit', {
    
    extend: 'EC.Catalog.view.EditAbstract',
    
    alias: 'widget.ConditionersEdit',

    catalog: 'conditioners',
    
    fields: [{
        xtype: 'textfield',
        fieldLabel: 'Артикул',
        name: 'code'
    }, {
        xtype: 'FilterMark',
        name: 'mark_id'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Маркировка',
        name: 'marking'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Брендовое наименование модели (серии)',
        name: 'name'
    }, {
        xtype: 'ConditionersFilterGroup',
        name: 'group_id'
    }, {
        xtype: 'ConditionersFilterProductType',
        name: 'product_type_id'
    }, {
        xtype: 'ConditionersFilterImplementationType',
        name: 'implementation_type_id'
    }, {
        xtype: 'ConditionersFilterHeatingCooling',
        name: 'heatingcooling_id'
    }, {
        xtype: 'ConditionersFilterPowerSource',
        name: 'power_source_id'
    }, {
        xtype: 'ConditionersFilterCountry',
        name: 'country'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Холодопроизводительность (кВт)',
        name: 'cooling_capacity'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Теплопроизводительность (кВт)',
        name: 'heating_capacity'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Цена (р)',
        name: 'price'
    }, {
        xtype: 'ConditionersFilterCurrency',
        name: 'currency_id'
    }],
    
    extrafields: [{
        xtype: 'numberfield',
        fieldLabel: 'Расход воздуха (мин) (м³/ч)',
        name: 'air_consumption_min'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Расход воздуха (макс) (м³/ч)',
        name: 'air_consumption_max'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Уровень шума (мин) (дБ(А))',
        name: 'noise_level_min'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Уровень шума (макс) (дБ(А))',
        name: 'noise_level_max'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Габариты (ШхДхВ) (мм)',
        name: 'dimensions'
    }, { 
        xtype: 'numberfield',
        fieldLabel: 'Гарантия (лет)',
        name: 'warranty'
    }]
});