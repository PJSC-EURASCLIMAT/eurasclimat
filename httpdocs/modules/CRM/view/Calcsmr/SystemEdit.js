Ext.define('EC.CRM.view.Calcsmr.SystemEdit', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    bodyBorder: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,
    
    title: 'Оборудование',
    
    initComponent: function() {
        
        this.items =  [{
            xtype: 'form',
            border: false,
            defaults: {
                allowBlank: false,
                padding: 5,
                anchor: '100%',
                labelWidth: 350,
                minValue: 0
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                labelAlign: 'top',
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ед. изм.',
                name: 'measure',
                value: 'шт'
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Количество',
                name: 'qty',
                decimalPrecision: 5,
                minValue: 0.00001,
                value: 1,
                listeners: {
                    keyup: this.reCalc,
                    spin: this.reCalc,
                    change: this.reCalc,
                    scope: this
                }
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Цена',
                name: 'price',
                decimalPrecision: 2,
                minValue: 0.01,
                value: 0.00,
                listeners: {
                    keyup: this.reCalc,
                    spin: this.reCalc,
                    change: this.reCalc,
                    scope: this
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Сумма',
                name: 'sum',
                renderer: xlib.formatCurrency,
                value: 0
            }],
            buttons: [{
                text: 'Сохранить',
                formBind: true,
                action: 'save'
            }]
        }]
        
        this.callParent(arguments);
        this.down('form').isValid();
    },
    
    reCalc: function() {
        
        var form = this.down('form'),
            qty = form.down('numberfield[name=qty]').getValue(),
            price = form.down('numberfield[name=price]').getValue(),
            sum = form.down('displayfield[name=sum]');
        
        sum.setValue(qty*price);
    }
});