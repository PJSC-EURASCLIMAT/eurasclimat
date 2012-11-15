Ext.define('EC.Catalog.view.Heating.Add', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.HeatingAdd',

    title: 'Новая позиция',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            defaults: {
                border: false,
                padding: 5
            },
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 140,
                allowBlank: false,
                anchor: '-5'
            },
            items: [{
                xtype: 'HeatingFilterMark',
                name: 'mark_id'
            }, {
                xtype: 'HeatingFilterGroup',
                name: 'group_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Маркировка',
                name: 'marking'
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