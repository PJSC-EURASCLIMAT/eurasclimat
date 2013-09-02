Ext.define('EC.Catalog.view.SpecialServices.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование услуги',
    
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
                labelAlign: 'left',
                labelWidth: 180,
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование работ',
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