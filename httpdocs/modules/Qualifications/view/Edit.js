Ext.define('EC.Qualifications.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Квалификация',
    
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
                xtype: 'hiddenfield',
                margin: 0,
                name: 'type_name'
            }, {
                fieldLabel: 'Наименование',
                allowBlank: false,
                xtype: 'textfield',
                name: 'name'
            }, {
                fieldLabel: 'Значимость',
                allowBlank: false,
                xtype: 'numberfield',
                minValue: 1,
                name: 'num'
            }, {
                xtype: 'combo',
                allowBlank: false,
                editable: false,
                fieldLabel: 'Тип квалификации',
                store: Ext.create('EC.Qualifications.store.QualificationsTypes'),
                valueField: 'id',
                displayField: 'name',
                name: 'type_id'
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
        this.type = this.down('[name=type_id]');
        this.typeName = this.down('[name=type_name]');

        this.type.on('select', this.onTypeSelect, this);

    },

    onTypeSelect: function( combo, records, eOpts ) {
        var val = this.type.getDisplayValue();
        this.typeName.setValue( val );
    }

});