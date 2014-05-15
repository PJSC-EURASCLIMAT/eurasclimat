Ext.define('EC.CRM.view.Calcpd.ConfigPriceForm', {
    
    extend: 'Ext.form.Panel',
    
    alias: ['widget.CalcpdConfigPriceForm'],
    
    title: 'Цены на услуги проектирования (за м.кв.)',
    
    bodyPadding: 20,
    
    fieldDefaults: {
        labelAlign: 'left',
        border: false,
        allowBlank: true,
        labelWidth: 150,
        value: 0
    },
    
    defaultType: 'numberfield',

    trackResetOnLoad: true,
    
    items: [{
        xtype: 'hidden',
        name: 'obj_type_id'
    }, {
        xtype: 'hidden',
        name: 'obj_class_id'
    }, {
        xtype: 'hidden',
        name: 'serv_id'
    }, {
        fieldLabel: '< 500 м.кв.',
        name: 'price1'
    }, {
        fieldLabel: '500 - 1000 м.кв.',
        name: 'price2'
    }, {
        fieldLabel: '1000 - 5000 м.кв.',
        name: 'price3'
    }, {
        fieldLabel: '5000 - 10000 м.кв.',
        name: 'price4'
    }, {
        fieldLabel: '> 10000 м.кв.',
        name: 'price5'
    }],
    
    bbar: ['->',{
        text: 'Сохранить',
        formBind: true,
        action: 'save'
    }, {
        text: 'Отменить изменения',
        action: 'reset'
    }]
});