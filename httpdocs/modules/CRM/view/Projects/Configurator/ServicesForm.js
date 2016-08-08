Ext.define('EC.CRM.view.Projects.Configurator.ServicesForm', {
    
	extend: 'Ext.window.Window',
    
	modal: true,
    
	width: 400,
    
	layout: 'fit',
    
	border: false,
    
    items: [{
    	xtype: 'form',
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
    }],
    
    buttons: ['->', {
        text: 'Сохранить',
        action: 'save'
    }, {
        text: 'Отменить',
        action: 'close'
    }]
});