Ext.define('xlib.Ref.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 300,
    
    uses: ['xlib.Ref.Combo'],
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 100,
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                listeners: {
                    specialkey: function(obj, event) {
                        if (event.getKey() == event.ENTER) {
                            obj.up('form').down("button[action=save]").fireHandler();
                        }
                    }
                    ,scope:this
                },
                name: 'name'
            }],
            openMsg: function() {
                Ext.Msg.alert("ALERT","Login form was submitted using ENTER Key!");
            },
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