Ext.define('EC.Catalog.view.Conditioners.Edit', {
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.ConditionersEdit',

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
                    xtype: 'ConditionersFilterGroup',
                    name: 'group_id'
                }, {
                    xtype: 'ConditionersFilterName',
                    name: 'name_id'
                }, {
                    xtype: 'ConditionersFilterMark',
                    name: 'mark_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }, {
                    xtype: 'ConditionersFilterProductType',
                    name: 'product_type_id'
                }, {
                    xtype: 'ConditionersFilterImplementationType',
                    name: 'implementation_type_id'
                }, {
                    xtype: 'ConditionersFilterCountry',
                    name: 'country'
                }, {
                    xtype: 'ConditionersFilterCondition',
                    name: 'condition'
                }, {
                    xtype: 'ConditionersFilterPurpose',
                    name: 'purpose'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Охлаждение (потр.)',
                    name: 'input_cooling'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Обогрев (потр.)',
                    name: 'input_heating'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Площадь м²',
                    name: 'square'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Объём м³',
                    name: 'volume'
                }]
            }, { 
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: 'Охлаждение (произв.)',
                    name: 'output_cooling'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Обогрев (произв.)',
                    name: 'output_heating'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Гарантия (лет)',
                    name: 'warranty'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Склад',
                    name: 'storage'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Резерв',
                    name: 'reserve'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Заказ',
                    name: 'order'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Ед. изм.',
                    name: 'measure'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Цена',
                    name: 'price'
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