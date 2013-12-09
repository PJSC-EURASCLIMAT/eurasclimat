Ext.define('EC.Experts.view.Experts.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование документа',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

    record: null,

    requires: [
        'xlib.AccountsCombo',
        'xlib.ContrCityField'
    ],

    initComponent: function() {

        var city_id = null;
        var country_id = null;

        if(!Ext.isEmpty(this.record)) {
            city_id = this.record.get('city_id');
            country_id = this.record.get('country_id');
        }

        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'id'
                },
                {
                    xtype: 'AccountsCombo',
                    name: 'account_id'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Описание',
                    name: 'desc'
                },
                {
                    xtype: 'ContrCityField',
                    city_id: city_id,
                    country_id: country_id
                },
                {
                    fieldLabel: 'Тип инженерного оборудования',
                    xtype: 'combobox',
                    name: 'equip_id',
                    displayField: 'name',
                    valueField: 'id',
                    store: 'EC.Experts.store.Equipment'
                },
                {
                    fieldLabel: 'Статус',
                    xtype: 'combobox',
                    name: 'status_id',
                    displayField: 'name',
                    valueField: 'id',
                    store: 'EC.Experts.store.Statuses'
                }
            ]
        }];

        this.buttons = [{
            text: 'Сохранить',
            formBind: true,
            scope: this,
            action: 'save'
        } ,'->', {
            text: 'Отменить',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
        if(!Ext.isEmpty(this.record)) {
            this.down('form').getForm().setValues(this.record.data);
        }
    }
});