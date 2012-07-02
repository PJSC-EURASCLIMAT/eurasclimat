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
        defaults: {
            width: 160,
            labelAlign: 'top'
        }
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
            items: [{ 
                xtype: 'ConditionersFilterGroup'
            }, {
                xtype: 'ConditionersFilterMark'
            }, {
                xtype: 'ConditionersFilterPurpose'
            }]
        }, {
            items: [{ 
                xtype: 'ConditionersFilterProductType'
            }, {
                xtype: 'ConditionersFilterImplementationType'
            }, {
                xtype: 'ConditionersFilterCountry'
            }]
        }, {
            items: [{
                xtype: 'ConditionersFilterInputCooling'
            }, {
                xtype: 'ConditionersFilterInputHeating'
            }]
        }, {
            items: [{
                xtype: 'ConditionersFilterOutputCooling'
            }, {
                xtype: 'ConditionersFilterOutputHeating'
            }]
        }, {
            items: [{
                xtype: 'ConditionersFilterSquare'
            }, {
                xtype: 'ConditionersFilterVolume'
            }, {
                xtype: 'ConditionersFilterWarranty'
            }]
        }];

        this.callParent(arguments);
    }
});