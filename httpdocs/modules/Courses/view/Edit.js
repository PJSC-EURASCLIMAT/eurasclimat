Ext.define('EC.Courses.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Информация о курсе',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 300,

    requires: ['xlib.TreeRefField'],

    values: {
        name: null,
        description: null,
        type_id: null,
        type_name: null,
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
                xtype: 'textfield',
                fieldLabel: 'Имя',
                name: 'name',
                value: this.values.name,
                allowBlank:false
            },{
                xtype: 'textarea',
                fieldLabel: 'Описание',
                value: this.values.description,
                name: 'description'
            },{
                xtype: 'tree-reffield',
                fieldLabel: 'Категория',
                controllerURL: '/json/courses/groups/',
                value: this.values.type_id,
                listeners: {
                    change: function(){
                        this.up('form').down('[name=type_name]').setValue(this.value[0]);
                    }
                },
                name: 'type_id'
            },{
                xtype: 'textfield',
                hidden: true,
                value: this.values.type_name,
                name: 'type_name'
            }],

            buttons:[{
                text: 'Сохранить',
                formBind: true,
                action: 'submit'
            },'->',{
                text: 'Закрыть',
                handler: function() {
                    this.up('window').close();
                }
            }]
        }];

        this.callParent();
    }


});