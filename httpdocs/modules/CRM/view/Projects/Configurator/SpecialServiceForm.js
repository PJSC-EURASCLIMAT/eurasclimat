Ext.define('EC.CRM.view.Projects.Configurator.SpecialServiceForm', {
    
    extend: 'Ext.form.Panel',
    
    layout: 'hbox',
    
    border: false,
    
    bodyPadding: 10,
    
    region: 'north',
    
    height: 50,
    
    defaultType: 'numberfield',
    
    fieldDefaults: {
        labelAlign: 'left',
        border: false,
        allowBlank: false
    },
    
    items: [{
        xtype: 'hidden',
        name: 'id'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Срок',
        labelWidth: 40,
        name: 'term'
    }, {
        fieldLabel: 'Количество',
        labelWidth: 80,
        padding: '0 0 0 80',
        name: 'number'
    }, {
        fieldLabel: 'Цена',
        labelWidth: 40,
        padding: '0 0 0 80',
        name: 'price'
    }, {
        xtype: 'label',
        text: 'р.',
        margin: '3 0 0 10'
    }]
    
});