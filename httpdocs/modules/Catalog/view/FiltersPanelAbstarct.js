Ext.define('EC.Catalog.view.FiltersPanelAbstarct', {

    extend: 'Ext.panel.Panel',
    
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
    
    permissions: false,
    
    initComponent: function() {
        
        this.tools = [{
            type: 'refresh',
            tooltip: 'Сбросить фильтры',
            action: 'resetfilters'
        }, {
            type: 'gear',
            tooltip: 'Настройки каталога',
            action: 'settings',
            hidden: this.permissions
        }];
        
        this.callParent(arguments);
    }
});