Ext.define('EC.CRM.view.Calcsmr.ProjectEdit', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    bodyBorder: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,
    
    title: 'Новая система',
    
    items: [{
        xtype: 'form',
        border: false,
        defaults: {
            allowBlank: false,
            padding: 5,
            anchor: '100%',
            labelWidth: 350,
            step: 0.01,
            decimalPrecision: 5,
            minValue: 0
        },
        items: [{
            xtype: 'hidden',
            name: 'id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Наименование системы',
            labelAlign: 'top',
            name: 'system_name'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Коэф. стоимости сопутствующего расходного материала',
            name: 'k_related'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Коэф. оплаты труда',
            name: 'k_compensation'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Коэф. эксплуатации машин и механизмов',
            name: 'k_amortisation'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Коэф. накладных расходов',
            name: 'k_overheads'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Коэф. сметной прибыли',
            name: 'k_estimated'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Коэф. НДС',
            name: 'k_vat'
        }],
        buttons: [{
            text: 'Сохранить',
            formBind: true,
            action: 'save'
        }]
    }]
    
});