Ext.define('EC.Experts.view.Experts.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Информация об эксперте',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,

    record: null,

    fromCurrent: false,

    requires: [
        'xlib.AccountsCombo',
        'xlib.ContrCityField'
    ],

    initComponent: function() {

//        var city_id = null;
//        var country_id = null;
//
//        if(!Ext.isEmpty(this.record)) {
//            city_id = this.record.get('city_id');
//            country_id = this.record.get('country_id');
//        }

        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 120,
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hidden',
                    name:'from_current',
                    allowBlank: true,
                    value: this.fromCurrent
                },
                {
                    xtype: 'hidden',
                    allowBlank: true,
                    name: 'id'
                },
                {
                    xtype: 'AccountsCombo',
                    hidden: this.fromCurrent,
                    allowBlank: true,
                    name: 'account_id'
                },
                {
                    fieldLabel: 'Инж. оборудование',
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
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Описание',
                    grow: true,
                    name: 'desc'
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