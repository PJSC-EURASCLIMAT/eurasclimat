Ext.define('EC.SysDev.view.Docs.Edit', {
    
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
                fieldLabel: 'Группа',
                name: 'type_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Имя',
                name: 'name'
            }, {
                xtype: 'hidden',
                name: 'id'
            }
//            , {
//                xtype: 'displayfield',
//                fieldLabel: 'Дата создания',
//                value: Ext.util.Format.date(Date(), 'd.m.Y')
//            }, {
//                xtype: 'displayfield',
//                fieldLabel: 'Инициатор',
//                value: xlib.Acl.Storage.getIdentity().name
//            }
            ]
        }];

        this.buttons = [{
            text: 'Сохранить',
            formBind: true,
            scope: this,
            handler: function(btn) {
                this.fireEvent('save');
            }
        } ,'->', {
            text: 'Отменить',
            scope: this,
            handler: this.close
        }];
        
        this.callParent(arguments);

        this.down('form').getForm().setValues(this.docModel.data)
    }
});