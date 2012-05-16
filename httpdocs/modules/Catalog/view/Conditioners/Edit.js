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
                    xtype: 'textfield',
                    fieldLabel: 'Группа оборудования',
                    name: 'group_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Наименование',
                    name: 'name_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Марка',
                    name: 'mark_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Маркировка',
                    name: 'marking'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Тип продукции',
                    name: 'product_type_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Тип исполнения',
                    name: 'implementation_type_id'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Страна',
                    name: 'country'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Состояние продукции',
                    name: 'condition'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Назначение продукции',
                    name: 'purpose'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Охлаждение',
                    name: 'input_cooling'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Обогрев',
                    name: 'input_heating'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Площадь м²',
                    name: 'square'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Объём м³',
                    name: 'volume'
                }]
            }, { 
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Охлаждение',
                    name: 'output_cooling'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Обогрев',
                    name: 'output_heating'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Гарантия',
                    name: 'warranty'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Склад',
                    name: 'storage'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Резерв',
                    name: 'reserve'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Заказ',
                    name: 'order'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Ед. изм.',
                    name: 'measure'
                }, {
                    xtype: 'textfield',
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