Ext.define('EC.Catalog.view.EditAbstract', {
    
    extend: 'Ext.window.Window',
    
    title: 'Новая позиция',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    width: 1000,
    
    height: 600,
    
    allowEdit: false,
    
    fields: [],
    
    extrafields: [],
    
    catalog: null,
    
    catalogId: null,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            layout: 'fit',
            items: [{
                xtype: 'tabpanel',
                items: [{
                    title: 'Основные параметры',
                    xtype: 'form',
                    layout: 'column',
                    autoScroll: true,
                    defaults: {
                        border: false,
                        columnWidth: .5,
                        padding: 5
                    },
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 160,
                        anchor: '-5'
                    },
                    items: this.fields
                }, {
                    title: 'Дополнительные параметры',
                    xtype: 'form',
                    layout: 'column',
                    autoScroll: true,
                    columns: 3,
                    defaults: {
                        border: false,
                        columnWidth: .5,
                        padding: 5
                    },
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 300,
                        anchor: '-5'
                    },
                    items: this.extrafields
                }, {
                    title: 'Описание',
                    xtype: 'form',
                    layout: 'fit', 
                    hideLabel: true,
                    items: [{
                        xtype: 'textarea',
                        anchor: '100% 100%',
                        border: false,
                        name: 'description'
                    }]
                }, {
                    xtype: 'CatalogRelatedServices',
                    catalog: this.catalog,
                    catalogId: this.catalogId,
                    allowEdit: this.allowEdit
                }, {
                    xtype: 'CatalogImages',
                    catalog: this.catalog,
                    catalogId: this.catalogId,
                    allowEdit: this.allowEdit
                }]
            }],
            buttons: [{
                text: 'Сохранить',
                action: 'save'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});