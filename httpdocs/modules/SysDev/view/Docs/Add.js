Ext.define('EC.SysDev.view.Docs.Add', {

    extend: 'Ext.window.Window',
    
    title: 'Создание документа',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

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
                name: 'project_id',
                value: this.project_id
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

        this.buttons = [
        {
            text: 'Сохранить и закрыть',
            formBind: true,
            scope: this,
            handler: function(btn) {
                this.fireEvent('save',null,false);
            }
        }, {
            text: 'Сохранить и загрузить файл',
            formBind: true,
            scope: this,
            handler: function(btn) {
                this.fireEvent('save',null,true);
            }
        },'->', {
                text: 'Отменить',
                scope: this,
                handler: this.close
        }];
        
        this.callParent(arguments);
    }
});