Ext.define('EC.Manufacturers.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Производитель',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 800,

    initComponent: function() {

        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                allowBlank: false
            },
            defaultType: 'textfield',
            items: [{
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Направления',
                name: 'type'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Адрес URL',
                name: 'url'
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