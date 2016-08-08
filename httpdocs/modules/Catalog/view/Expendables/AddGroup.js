Ext.define('EC.Catalog.view.Expendables.AddGroup', {
    
    extend: 'Ext.window.Window',
    
    title: 'Создание группы',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 300,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            hideLabel: true,
            items: [{
                xtype: 'textfield',
                border: false,
                padding: 5,
                allowBlank: false,
                anchor: '100%',
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