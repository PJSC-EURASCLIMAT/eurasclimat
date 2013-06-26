Ext.define('EC.Catalog.view.Services.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование услуги',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 80,
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Название',
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Артикул',
                allowBlank: true,
                name: 'code'
            }, {
                xtype: 'numberfield',
                allowNegative: false,
                fieldLabel: 'Цена',
                name: 'price'
            }],
            buttons: [{
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