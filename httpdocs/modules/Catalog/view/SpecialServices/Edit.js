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
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
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