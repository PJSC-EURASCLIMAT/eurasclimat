Ext.define('EC.Catalog.view.RelatedServices.Edit', {
    
    extend: 'Ext.form.Panel',
    
    title: false,
    
    bodyPadding: 5,
    
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 130,
        border: false,
        allowBlank: false,
        anchor: '100%'
    },
    
    items: [{
        xtype: 'hiddenfield',
        name: 'id'
    }, {
        xtype: 'ServicesCombo',
        name: 'service_id',
        hiddenName: 'service_id'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Срок выполнения',
        name: 'term'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Цена (р.)',
        name: 'price'
    }]
});