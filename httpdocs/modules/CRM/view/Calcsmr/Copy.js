Ext.define('EC.CRM.view.Calcsmr.Copy', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    bodyBorder: false,
    
    autoShow: true,
    
    modal: true,
    
    title: 'Скопировать проект',
    
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
        }],
        buttons: [{
            text: 'OK',
            formBind: true,
            action: 'save'
        }]
    }]
    
});