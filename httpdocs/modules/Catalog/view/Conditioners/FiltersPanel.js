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
        width: 145,
        defaults: {
            width: 145,
            hideLabel: true
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
            action: 'settings'
        }, {
            type: 'plus',
            tooltip: 'Добавить',
            action: 'additem'
        }];
        
        this.items = [{
            items: [{ 
                xtype: 'ConditionersFilterGroup'
            }, {
                xtype: 'ConditionersFilterName'
            }, {
                xtype: 'ConditionersFilterMark'
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
                xtype: 'ConditionersFilterPurpose'
            }, {
                xtype: 'ConditionersFilterCondition'
            }, {
                xtype: 'ConditionersFilterAvailability'
            }]
        }, {
            items: [{
                xtype: 'displayfield',
                value: 'Производительность:',
                height: 22
            }, {
                xtype: 'ConditionersFilterInputCooling'
            }, {
                xtype: 'ConditionersFilterInputHeating'
            }]
        }, {
            items: [{
                xtype: 'displayfield',
                value: 'Потребление:',
                height: 22
            }, {
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
        }, {
            width: 140,
            defaults: {
                margin: 2,
                textAlign: 'left',
                width: 135,
                scope: this
            },
            items: [{
                xtype: 'button',
                iconCls: 'remove',
                text: 'Сбросить фильтры',
                action: 'resetfilters'
            }, {
                xtype: 'button',
                iconCls: 'option',
                text: 'Настройки каталога',
                action: 'settings'
            }, {
                xtype: 'button',
                iconCls: 'add',
                text: 'Добавить позицию',
                action: 'additem'
            }]
        }];

        this.callParent(arguments);
    }
});