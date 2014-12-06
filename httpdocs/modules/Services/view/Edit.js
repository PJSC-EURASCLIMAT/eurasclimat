Ext.define('EC.Services.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Услуга',
    
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
                labelWidth: 170,
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
                xtype: 'hiddenfield',
                margin: 0,
                name: 'service_id'
            },{
                xtype: 'hiddenfield',
                margin: 0,
                name: 'parent_id'
            },{
                xtype: 'hiddenfield',
                margin: 0,
                name: 'profession_name'
            },{
                xtype: 'hiddenfield',
                margin: 0,
                name: 'eng_sys_type_name'
            },{
                fieldLabel: 'Наименование',
                allowBlank: false,
                xtype: 'textfield',
                name: 'text'
            },{
                xtype: 'combo',
                editable: false,
                fieldLabel: 'Профессия',
                store: 'EC.Professions.store.Professions',
                valueField: 'id',
                displayField: 'name',
                name: 'profession_id',
                listeners: {
                    scope: this,
                    change: function(combo, newValue, oldValue, eOpts) {
                        this.pfField.setValue(combo.getDisplayValue());
                    }
                }
            },{
                xtype: 'combo',
                editable: false,
                fieldLabel: 'Тип инженерных систем',
                store: 'EC.EngSystemTypes.store.EngSystemTypes',
                valueField: 'id',
                displayField: 'name',
                name: 'eng_sys_type_id',
                listeners: {
                    scope: this,
                    change: function(combo, newValue, oldValue, eOpts) {
                        this.estField.setValue(combo.getDisplayValue());
                    }
                }
            },{
                xtype: 'numberfield',
                fieldLabel: 'Кол-во нормочасов',
                minValue: 0,
                name: 'norm_hours'
            },{
                xtype: 'numberfield',
                fieldLabel: 'Разряд',
                minValue: 0,
                name: 'min_rank'
            }],

            buttons: ['->', {
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
        }];

        this.callParent();

        this.pfField = this.down('[name=profession_name]');
        this.estField = this.down('[name=eng_sys_type_name]');
    }
});