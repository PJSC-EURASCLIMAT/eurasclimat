Ext.define('EC.Courses.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Информация о курсе',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

    requires: ['xlib.TreeRefField'],

    values: {
        name: null,
        description: null,
        group_id: null,
        group_name: null,
        offer_num: null,
        price: null,
        closed: 0
    },

    initComponent: function() {

        this.items = [{
            xtype: 'form',

            bodyPadding: 10,

            layout: 'anchor',

            defaults: {
                anchor: '100%'
            },

            items: [{
                xtype: 'tree-reffield',
                fieldLabel: 'Группа',
                controllerURL: '/json/courses/groups/',
                value: this.values.group_id,
                listeners: {
                    change: function() {
                        this.up('form').down('[name=group_name]').setValue(this.value[0]);
                    }
                },
                name: 'group_id'
            }, {
                xtype: 'textfield',
                hidden: true,
                value: this.values.group_name,
                name: 'group_name'
            }, {
                xtype: 'textfield',
                fieldLabel: '№ оферты',
                value: this.values.offer_num,
                name: 'offer_num'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Имя',
                name: 'name',
                value: this.values.name,
                allowBlank:false
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                fieldLabel: 'Цена',
                value: this.values.price,
                name: 'price'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Описание',
                value: this.values.description,
                name: 'description'
            }, {
                fieldLabel: 'Архивный',
                xtype: 'checkboxfield',
                name: 'closed',
                checked: this.values.closed,
                inputValue: 1,
                uncheckedValue: 0
            }],

            buttons:['->', {
                text: 'Сохранить',
                formBind: true,
                action: 'submit'
            }, {
                text: 'Отмена',
                handler: function() {
                    this.up('window').close();
                }
            }]
        }];

        this.callParent();
    }


});