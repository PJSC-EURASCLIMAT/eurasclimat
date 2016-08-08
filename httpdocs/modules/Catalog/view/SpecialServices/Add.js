Ext.define('EC.Catalog.view.SpecialServices.Add', {
    
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
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'group_id',
                value: this.groupID
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование работ',
                allowBlank: false,
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Артикул работ',
                allowBlank: true,
                name: 'code'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ед. изм. работ',
                allowBlank: true,
                name: 'measure'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Сроки выполнения работ',
                allowBlank: true,
                name: 'term'
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Цена работ',
                allowNegative: false,
                allowBlank: true,
                name: 'price'
            }],
            buttons: ['->',{
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