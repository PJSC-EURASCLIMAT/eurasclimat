Ext.define('EC.Contractors.view.Add', {
    
    extend: 'Ext.window.Window',
    
    title: 'Новый поставщик',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

    initComponent: function() {

        this.items = [{
            xtype: 'form',
            items: [{
                allowBlank: false,
                xtype: 'textfield',
                name: 'name',
                anchor: '100%'
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