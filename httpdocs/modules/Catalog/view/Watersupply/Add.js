Ext.define('EC.Catalog.view.Watersupply.Add', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.WatersupplyAdd',

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
                xtype: 'WatersupplyFilterMark',
                name: 'mark_id'
            }, {
                xtype: 'WatersupplyFilterGroup',
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