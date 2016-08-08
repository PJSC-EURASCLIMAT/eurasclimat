Ext.define('EC.Catalog.view.SpecialServices.EditRelatedExpendables', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование материала',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 200,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                border: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Количество',
                allowNegative: false,
                allowBlank: true,
                name: 'number'
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Цена',
                allowNegative: false,
                allowBlank: true,
                name: 'price'
            }],
            buttons: ['->',{
                text: 'Сохранить',
                formBind: true,
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