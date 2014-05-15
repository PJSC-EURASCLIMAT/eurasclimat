Ext.define('EC.Catalog.view.EditAbstract', {
    
    extend: 'Ext.window.Window',
    
    title: 'Новая позиция',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    width: 600,
    
    height: 500,
    
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
                border: false,
                defaults: {
                    border: false
                },
                items: [{
                    title: 'Параметры',
                    xtype: 'form',
                    autoScroll: true,
                    defaults: {
                        border: false,
                        padding: 5
                    },
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 270,
                        anchor: '100%'
                    },
                    items: this.fields
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
            buttons: ['->',{
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