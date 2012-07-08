Ext.define('EC.Catalog.view.Airing.FiltersPanel', {

    extend: 'Ext.panel.Panel',
    
    alias: ['widget.AiringFiltersPanel'],
    
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
            hidden: !acl.isUpdate('catalog', 'airing')
        }];
        
        this.items = [{
            xtype: 'AiringFilterMark'
        }, {
            xtype: 'AiringFilterGroup'
        }, {
            xtype: 'AiringFilterProductType'
        }, {
            xtype: 'AiringFilterImplementationType'
        }, {
            xtype: 'AiringFilterConnectionType'
        }, {
            xtype: 'AiringFilterProtectionType'
        }, {
            xtype: 'AiringFilterPowerSource'
        }, {
            xtype: 'AiringFilterMaterial'
        }, {
            xtype: 'AiringFilterControlType'
        }, {
            xtype: 'AiringFilterIsolationClass'
        }, {
            xtype: 'AiringFilterCountry'
        }];
        
        this.callParent(arguments);
    }
});