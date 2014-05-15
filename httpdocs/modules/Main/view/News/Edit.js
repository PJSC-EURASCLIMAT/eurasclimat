Ext.define('EC.Main.view.News.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Новость',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,

    requires: ['xlib.Reference.Combo'],

    initComponent: function() {


        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                labelWidth: 130
            },
            items: [{
                xtype: 'textfield',
                hidden: true,
                name: 'id'
            },{
                xtype: 'textfield',
                hidden: true,
                name: 'account_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Заголовок новости',
                name: 'title',
                allowBlank:false
            }, {
                xtype: 'datefield',
                fieldLabel: 'Дата публикации',
                format: 'd.m.Y',
                altFormats: 'Y-m-d H:i:s',
                submitFormat: 'Y-m-d H:i:s',
                name: 'date',
                allowBlank:false
            }, {
                fieldLabel: 'Опубликовано',
                xtype: 'checkboxfield',
                name: 'published',
                inputValue: 1,
                uncheckedValue: 0
            }, {
                xtype: 'ReferenceCombo',
                fieldLabel: 'Категория',
                store: 'EC.Main.store.News.Categories',
                name: 'category_id'
            },{
                xtype: 'textarea',
                labelAlign: 'top',
                fieldLabel: 'Анотация',
                name: 'short_text'
            }, {
                xtype: 'textarea',
                labelAlign: 'top',
                fieldLabel: 'Полный текст',
                name: 'long_text'
            }],

            buttons:['->', {
                text: 'Сохранить',
                formBind: true,
                itemId: 'saveBtn'
            }, {
                text: 'Удалить',
                hidden: true,
                itemId: 'delBtn'
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