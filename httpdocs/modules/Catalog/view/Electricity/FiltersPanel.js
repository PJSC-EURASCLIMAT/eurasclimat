Ext.define('EC.Catalog.view.Electricity.FiltersPanel', {

    extend: 'Ext.panel.Panel',
    
    alias: ['widget.ElectricityFiltersPanel'],
    
    title: 'Фильтры и настройки',
        
    layout: 'column',
    
    collapsible: true,
    
    collapseFirst: false,

    collapseMode: 'header',
    
    bodyBorder: true,
    
    defaults: {
        margin: 5,
        border: false,
        width: 160,
        labelAlign: 'top'
    },
    
    initComponent: function() {
        
        this.tools = [{
            type: 'refresh',
            tooltip: 'Сбросить фильтры',
            action: 'resetfilters'
        }, {
            type: 'gear',
            tooltip: 'Настройки каталога',
            action: 'settings',
            hidden: !acl.isUpdate('catalog', 'electricity')
        }];
        
        this.items = [{
            xtype: 'ElectricityFilterMark'
        }, {
            xtype: 'ElectricityFilterGroup'
        }, {
            xtype: 'ElectricityFilterProductType'
        }, {
            xtype: 'ElectricityFilterImplementationType'
        }, {
            xtype: 'ElectricityFilterConnectionType'
        }, {
            xtype: 'ElectricityFilterProtectionType'
        }, {
            xtype: 'ElectricityFilterPowerSource'
        }, {
            xtype: 'ElectricityFilterMaterial'
        }, {
            xtype: 'ElectricityFilterControlType'
        }, {
            xtype: 'ElectricityFilterIsolationType'
        }, {
            xtype: 'ElectricityFilterCountry'
        }];
        
        this.callParent(arguments);
    }
});