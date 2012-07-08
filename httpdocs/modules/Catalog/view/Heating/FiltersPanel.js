Ext.define('EC.Catalog.view.Heating.FiltersPanel', {

    extend: 'Ext.panel.Panel',
    
    alias: ['widget.HeatingFiltersPanel'],
    
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
            hidden: !acl.isUpdate('catalog', 'heating')
        }];
        
        this.items = [{
            xtype: 'HeatingFilterMark'
        }, {
            xtype: 'HeatingFilterGroup'
        }, {
            xtype: 'HeatingFilterProductType'
        }, {
            xtype: 'HeatingFilterImplementationType'
        }, {
            xtype: 'HeatingFilterConnectionType'
        }, {
            xtype: 'HeatingFilterProtectionType'
        }, {
            xtype: 'HeatingFilterPowerSource'
        }, {
            xtype: 'HeatingFilterMaterial'
        }, {
            xtype: 'HeatingFilterControlType'
        }, {
            xtype: 'HeatingFilterCountry'
        }];
        
        this.callParent(arguments);
    }
});