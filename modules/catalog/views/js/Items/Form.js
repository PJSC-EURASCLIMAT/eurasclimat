Ext.ns('Catalog.Items');

Catalog.Items.Form = Ext.extend(xlib.form.FormPanel, {

    itemId: null,
    
    itemURL:    link('catalog', 'items', 'get'),
    
    addURL:     link('catalog', 'items', 'add'),
    
    updateURL:  link('catalog', 'items', 'update'),
    
    loadMask: true,

    markFieldsDirty: false,
    
    permissions: acl.isUpdate('catalog'),
    
    labelWidth: 100,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'treecombo',
            fieldLabel: 'Категория',
            name: 'category_id',
            hiddenName: 'category_id',
            allowBlank: true,
            lazyRender: true,
            lazyInit: true,
            rootVisible: false,
            url: link('catalog', 'categories', 'get')
        }, {
            xtype: 'treecombo',
            fieldLabel: 'Раздел',
            name: 'chapter_id',
            hiddenName: 'chapter_id',
            allowBlank: true,
            lazyRender: true,
            lazyInit: true,
            rootVisible: false,
            url: link('catalog', 'chapters', 'get')
        }, {
            xtype: 'Catalog.Marks.ComboBox',
            name: 'mark_id',
            hiddenName: 'mark_id',
            allowBlank: true
        }, {
            xtype: 'treecombo',
            fieldLabel: 'Тип',
            name: 'type_id',
            hiddenName: 'type_id',
            allowBlank: true,
            lazyRender: true,
            lazyInit: true,
            rootVisible: false,
            url: link('catalog', 'types', 'get')
        }, {
            xtype: 'textfield',
            fieldLabel: 'Маркировка',
            name: 'marking',
            allowBlank: true
        }, {
            xtype: 'Catalog.Measures.ComboBox',
            name: 'measure_id',
            hiddenName: 'measure_id',
            allowBlank: true
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Цена',
            name: 'price',
            allowBlank: true
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Холод',
            name: 'cold',
            allowBlank: true
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Тепло',
            name: 'warm',
            allowBlank: true
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Потребление',
            name: 'power',
            allowBlank: true
        }];
        
        Catalog.Items.Form.superclass.initComponent.apply(this, arguments);
        
        var w = this.getWindow(this.itemId).show();
        
//        this.getForm().setValues({
//            type_id: {
//                id: 1,
//                text: 'Кондиционеры'
//            }
//        });
        
        if (this.itemId) {
            this.getForm().load({
                url: this.itemURL,
                params: {
                    id: this.itemId
                }
            });
        }
    },
    
    // Private functions 
    
    getWindow: function(id) {
        
       var w = new Ext.Window({
            title: !id ? 'Новая запись' : 'Запись № ' + id,
            resizable: false,
            hidden: false,
            width: 400,
            //height: 400,
            modal: true,
            items: [this],
            buttons: [{
                text: 'Сохранить',
                hidden: !this.permissions,
                handler: function() {
                    
                    if (!this.getForm().isValid()) {
                        return;
                    }
                    
                    this.getForm().submit({
                        params: !this.itemId ? {} : {
                            id: this.itemId
                        },
                        url: !this.itemId ? this.addURL : this.updateURL,
                        success: function(form, options) {
                            var o = options.result;
                            if (true == o.success) {
                                form.fireEvent('saved');
                                w.close();
                                return;
                            }
                            xlib.Msg.error('Не удалось сохранить.')
                        },
                        failure: function() {
                            xlib.Msg.error('Не удалось сохранить.')
                        }
                    });
                },
                scope: this
            }, {
                text: 'Отмена',
                handler: function() {
                    w.close();
                }
            }]
        });
        
        return w;
    }
});

Ext.reg('Catalog.Items.Form', Catalog.Items.Form);