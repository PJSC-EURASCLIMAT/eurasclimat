Ext.define('EC.CRM.view.Calcsmr.MainEdit', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    bodyBorder: false,
    
    autoShow: true,
    
    modal: true,
    
    title: 'Проект',
    
    items: [{
        xtype: 'form',
        border: false,
        defaults: {
            allowBlank: false,
            padding: 5,
            width: 500
        },
        items: [{
            xtype: 'hidden',
            name: 'id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Наименование',
            name: 'name'
        }, {
            xtype: 'fieldset',
            title: 'Коэффициенты для ПНР (пуско-наладочные работы)',
            collapsible: false,
            layout: 'vbox',
            margin: 10,
            defaultType: 'numberfield',
            defaults: {
                allowBlank: false,
                labelWidth: 350,
                decimalPrecision: 5,
                minValue: 0
            },
            items: [{
                fieldLabel: 'Коэф. оплаты труда',
                name: 'k_compensation'
            }, {
                fieldLabel: 'Коэф. накладных расходов',
                name: 'k_overheads'
            }, {
                fieldLabel: 'Коэф. сметной прибыли',
                name: 'k_estimated'
            }, {
                fieldLabel: 'Коэф. НДС',
                name: 'k_vat'
            }]
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Создал',
            name: 'account_name',
            value: xlib.Acl.Storage.getIdentity().name
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Дата создания',
            name: 'date',
            renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
            value: Date()
        }],
        buttons: [{
            text: 'Сохранить',
            formBind: true,
            action: 'save'
        }]
    }]
    
});