Ext.define('EC.EngSystemTypes.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Тип инженерных систем',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 300,

    items: [{
        xtype: 'form',
        bodyPadding: 10,
        fieldDefaults: {
            margin: '5 0',
            labelWidth: 120,
            anchor: '100%'
        },
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'hiddenfield',
            margin: 0,
            name: 'id'
        },{
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
        },{
            text: 'Отмена',
            handler: function() {
                this.up('window').close();
            }
        }]
    }]

});