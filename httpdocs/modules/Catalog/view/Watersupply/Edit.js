Ext.define('EC.Catalog.view.Watersupply.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.WatersupplyEdit',

    title: 'Новая позиция',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            layout: 'column',
            width: 700,
            defaults: {
                border: false,
                padding: 5
            },
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 150,
                anchor: '-5'
            },
            items: [{
                items: [{
                    xtype: 'WatersupplyFilterGroup',
                    name: 'group_id'
                }, {
                    xtype: 'WatersupplyFilterMark',
                    name: 'mark_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }]
            }],
            buttons: [{
                text: 'Сохранить',
                formBind: true,
                disabled: true,
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