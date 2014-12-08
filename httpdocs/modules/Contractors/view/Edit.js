Ext.define('EC.Contractors.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактор поставщика',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

    initComponent: function() {

        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
            fieldDefaults: {
                margin: '5 0',
                labelWidth: 150,
                anchor: '100%'
            },
            items: [{
                xtype: 'hiddenfield',
                margin: 0,
                name: 'id'
            }, {
                fieldLabel: 'Наименование',
                allowBlank: false,
                xtype: 'textfield',
                name: 'name'
            }],

            buttons: ['->',{
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