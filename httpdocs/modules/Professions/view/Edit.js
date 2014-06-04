Ext.define('EC.Professions.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Профессия',
    
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
        },{
            fieldLabel: 'КЧ',
            xtype: 'numberfield',
            name: 'kch'
        },{
            fieldLabel: 'Код выпуска ЕТКС',
            xtype: 'numberfield',
            name: 'etks'
        },{
            fieldLabel: 'Код по ОКЗ',
            xtype: 'numberfield',
            name: 'okz'
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