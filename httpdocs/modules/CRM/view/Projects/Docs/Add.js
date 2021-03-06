Ext.define('EC.CRM.view.Projects.Docs.Add', {

    itemId: 'EC.CRM.view.Projects.Docs.Add',
    
    extend: 'Ext.window.Window',
    
    title: 'Создание документа',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

    itemId: 'CRM.view.Projects.Docs.Add',
    
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
                name: 'project_id',
                value: this.project_id
            }]
        }];

        this.buttons = ['->',{
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
        }, {
            text: 'Отменить',
            scope: this,
            handler: this.close
        }];
        
        this.callParent(arguments);
    }
});