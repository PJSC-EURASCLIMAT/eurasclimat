Ext.define('EC.Catalog.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.CatalogEdit',

    title: 'Редактирование',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    initComponent: function() {
        
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'Имя'
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Сохранить',
                action: 'save'
            },
            {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});