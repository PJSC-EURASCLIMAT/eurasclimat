Ext.define('EC.Catalog.view.Services.Add', {
    
    extend: 'Ext.window.Window',
    
    title: 'Добавление услуги',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,
    
    groupID: null,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 80,
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'group_id',
                value: this.groupID
            }, {
                xtype: 'textfield',
                fieldLabel: 'Название',
                allowBlank: true,
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Артикул',
                name: 'code'
            }, {
                xtype: 'numberfield',
                allowNegative: false,
                fieldLabel: 'Цена',
                name: 'price'
            }],
            buttons: [{
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