Ext.define('EC.Catalog.view.Automation.FiltersPanel', {

    extend: 'Ext.panel.Panel',
    
    alias: ['widget.AutomationFiltersPanel'],
    
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
            hidden: !acl.isUpdate('catalog', 'automation')
        }];
        
        this.items = [{
            xtype: 'AutomationFilterMark'
        }, {
            xtype: 'AutomationFilterGroup'
        }, {
            xtype: 'AutomationFilterProductType'
        }, {
            xtype: 'AutomationFilterImplementationType'
        }, {
            xtype: 'AutomationFilterConnectionType'
        }, {
            xtype: 'AutomationFilterProtectionType'
        }, {
            xtype: 'AutomationFilterPowerSource'
        }, {
            xtype: 'AutomationFilterMaterial'
        }, {
            xtype: 'AutomationFilterControlType'
        }, {
            xtype: 'AutomationFilterIsolationType'
        }, {
            xtype: 'AutomationFilterCountry'
        }];
        
        this.callParent(arguments);
    }
});