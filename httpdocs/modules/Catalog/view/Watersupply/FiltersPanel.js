Ext.define('EC.Catalog.view.Watersupply.FiltersPanel', {

    extend: 'Ext.panel.Panel',
    
    alias: ['widget.WatersupplyFiltersPanel'],
    
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
            hidden: !acl.isUpdate('catalog', 'watersupply')
        }];
        
        this.items = [{
            xtype: 'WatersupplyFilterMark'
        }, {
            xtype: 'WatersupplyFilterGroup'
        }, {
            xtype: 'WatersupplyFilterProductType'
        }, {
            xtype: 'WatersupplyFilterImplementationType'
        }, {
            xtype: 'WatersupplyFilterConnectionType'
        }, {
            xtype: 'WatersupplyFilterProtectionType'
        }, {
            xtype: 'WatersupplyFilterPowerSource'
        }, {
            xtype: 'WatersupplyFilterMaterial'
        }, {
            xtype: 'WatersupplyFilterControlType'
        }, {
            xtype: 'WatersupplyFilterCountry'
        }];
        
        this.callParent(arguments);
    }
});