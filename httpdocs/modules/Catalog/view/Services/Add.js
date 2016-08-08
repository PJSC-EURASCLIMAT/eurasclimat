Ext.define('EC.Catalog.view.Services.Add', {
    
    extend: 'Ext.window.Window',
    
    title: 'Добавление услуги',
    
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
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                allowBlank: false,
                name: 'name'
            }],
            buttons: ['->',{
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