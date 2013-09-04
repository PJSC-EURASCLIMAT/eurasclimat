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
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Артикул',
                name: 'code'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ед. изм.',
                name: 'measure'
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