Ext.define('EC.Catalog.view.Expendables.Add', {
    
    extend: 'Ext.window.Window',
    
    title: 'Добавление',
    
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
                allowBlank: false,
                fieldLabel: 'Наименование',
                name: 'name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Артикул',
                allowBlank: true,
                name: 'code'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ед. изм.',
                allowBlank: true,
                name: 'measure'
            }, {
                xtype: 'numberfield',
                allowNegative: false,
                allowBlank: true,
                fieldLabel: 'Цена',
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