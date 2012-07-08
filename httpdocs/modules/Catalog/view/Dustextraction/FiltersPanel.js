Ext.define('EC.Catalog.view.Dustextraction.FiltersPanel', {

    extend: 'Ext.panel.Panel',
    
    alias: ['widget.DustextractionFiltersPanel'],
    
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
            hidden: !acl.isUpdate('catalog', 'dustextraction')
        }];
        
        this.items = [{
            xtype: 'DustextractionFilterMark'
        }, {
            xtype: 'DustextractionFilterGroup'
        }, {
            xtype: 'DustextractionFilterFiltration'
        }, {
            xtype: 'DustextractionFilterMotor'
        }, {
            xtype: 'DustextractionFilterCountry'
        }];
        
        this.callParent(arguments);
    }
});