Ext.define('EC.Market.view.Docs.Edit', {
    
    itemId: 'EC.Market.view.Docs.Edit',
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование документа',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

    docModel: null,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'docTypesCombo',
                fieldLabel: 'Тип документа',
                name: 'type_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Имя документа',
                name: 'name'
            }, {
                xtype: 'hidden',
                name: 'id'
            }]
        }];

        this.buttons = ['->', {
            text: 'Сохранить',
            formBind: true,
            scope: this,
            handler: function(btn) {
                this.fireEvent('save');
            }
        }, {
            text: 'Отменить',
            scope: this,
            handler: this.close
        }];
        
        this.callParent(arguments);

        this.down('form').getForm().setValues(this.docModel.data);
    }
});