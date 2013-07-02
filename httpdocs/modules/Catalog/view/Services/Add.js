Ext.define('EC.Catalog.view.Services.Add', {
    
    extend: 'Ext.window.Window',
    
    title: 'Добавление услуги',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 800,
    
    groupID: null,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 180,
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'group_id',
                value: this.groupID
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование работ',
                allowBlank: true,
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Артикул работ',
                name: 'code'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ед. изм. работ',
                name: 'measure'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Сроки выполнения работ',
                name: 'term'
            }, {
                xtype: 'numberfield',
                allowNegative: false,
                fieldLabel: 'Цена работ',
                name: 'price'
            }],
            buttons: [{
                text: 'Сохранить',
                formBind: true,
                action: 'save'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});