Ext.define('EC.Catalog.view.AddAbstract', {
    
    extend: 'Ext.window.Window',
    
    title: 'Новая позиция',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            defaults: {
                border: false,
                padding: 5
            },
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 140,
                allowBlank: false,
                anchor: '-5'
            },
            items: [{
                xtype: 'FilterMark',
                name: 'mark_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
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