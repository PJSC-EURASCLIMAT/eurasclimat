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
            }, {
                xtype: 'textfield',
                hidden: true,
                name: 'account_id'
            }, {
                xtype: 'ReferenceCombo',
                fieldLabel: 'Категория',
                store: 'EC.Main.store.News.Categories',
                name: 'category_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Заголовок новости',
                name: 'title',
                allowBlank:false
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Дата публикации',
                value: new Date(),
                renderer: Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
                name: 'date'
            }, {
                fieldLabel: 'Опубликовано',
                xtype: 'checkboxfield',
                name: 'published',
                inputValue: 1,
                uncheckedValue: 0
            }, {
                xtype: 'textarea',
                labelAlign: 'top',
                fieldLabel: 'Полный текст',
                name: 'long_text'
            }],

            buttons:[{
                text: 'Удалить',
                hidden: true,
                itemId: 'delBtn'
            }, '->', {
                text: 'Сохранить',
                formBind: true,
                itemId: 'saveBtn'
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