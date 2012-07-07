Ext.define('EC.Catalog.view.Conditioners.FiltersPanel', {

    extend: 'Ext.panel.Panel',
    
    alias: ['widget.ConditionersFiltersPanel'],
    
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
            hidden: !acl.isUpdate('catalog', 'conditioners')
        }];
        
        this.items = [{
            xtype: 'ConditionersFilterMark'
        }, {
            xtype: 'ConditionersFilterGroup'
        }, {
            xtype: 'ConditionersFilterProductType'
        }, {
            xtype: 'ConditionersFilterImplementationType'
        }, {
            xtype: 'ConditionersFilterConnectionType'
        }, {
            xtype: 'ConditionersFilterProtectionType'
        }, {
            xtype: 'ConditionersFilterPowerSource'
        }, {
            xtype: 'ConditionersFilterMaterial'
        }, {
            xtype: 'ConditionersFilterControlType'
        }, {
            xtype: 'ConditionersFilterCountry'
        }];
        
        this.callParent(arguments);
    }
});