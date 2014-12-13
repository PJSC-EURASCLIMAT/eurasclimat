Ext.define('EC.Contractors.view.Contacts.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактор контакта поставщика',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 700,

    initComponent: function() {

        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
            fieldDefaults: {
                margin: '5 0',
                labelWidth: 150,
                anchor: '100%',
                allowBlank: true
            },
            defaultType: 'textfield',
            items: [{
                xtype: 'hiddenfield',
                margin: 0,
                name: 'id'
            }, {
            	xtype: 'hiddenfield',
            	margin: 0,
            	name: 'contractor_id'
            }, {
                fieldLabel: 'ФИО',
                allowBlank: false,
                name: 'name'
            }, {
                fieldLabel: 'Должность',
                name: 'function'
            }, {
                fieldLabel: 'Рабочий телефон',
                name: 'work_phone'
            }, {
                fieldLabel: 'Мобильный телефон',
                name: 'mobile_phone'
            }, {
                fieldLabel: 'Email',
                name: 'email'
            }],
            buttons: ['->', {
                text: 'Сохранить',
                formBind: true,
                handler: function() {
                    var form = this.up('form');
                    this.up('form').fireEvent('save', form.getValues());
                }
            }, {
                text: 'Отмена',
                handler: function() {
                    this.up('window').close();
                }
            }]
        }];
        this.callParent();
    }
});