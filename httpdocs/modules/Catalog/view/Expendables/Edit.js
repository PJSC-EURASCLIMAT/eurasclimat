Ext.define('EC.Catalog.view.Expendables.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 800,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 180,
                border: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                allowBlank: false,
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Артикул',
                allowBlank: true,
                name: 'code'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ед. изм.',
                allowBlank: true,
                name: 'measure'
            }, {
                xtype: 'numberfield',
                allowNegative: false,
                allowBlank: true,
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