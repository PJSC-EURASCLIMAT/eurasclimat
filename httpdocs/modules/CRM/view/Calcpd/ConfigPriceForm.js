Ext.define('EC.CRM.view.Calcpd.ConfigPriceForm', {
    
    extend: 'Ext.form.Panel',
    
    autoScroll: true,
    
    trackResetOnLoad: true,
    
    border: false,
    
    bodyPadding: 20,
    
    fieldDefaults: {
        labelAlign: 'left',
        border: false,
        allowBlank: true,
        anchor: '100%',
        labelWidth: 500
    },
    
    bbar: ['->', {
        text: 'Сохранить',
        formBind: true,
        action: 'save'
    }, {
        text: 'Отменить изменения',
        action: 'reset'
    }]
});