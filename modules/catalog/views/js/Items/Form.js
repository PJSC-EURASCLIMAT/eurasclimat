Ext.ns('Catalog.Items');

Catalog.Items.Form = Ext.extend(xlib.form.FormPanel, {

    itemId: null,
    
    categoryId: null,
    
    itemURL:    link('catalog', 'items', 'get'),
    
    addURL:     link('catalog', 'items', 'add'),
    
    updateURL:  link('catalog', 'items', 'update'),
    
    loadMask: true,

    markFieldsDirty: false,
    
    permissions: acl.isUpdate('catalog'),
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'textfield',
            fieldLabel: 'Маркировка',
            name: 'marking',
            allowBlank: false
        }];
        
        Catalog.Items.Form.superclass.initComponent.apply(this, arguments);
        
        var w = this.getWindow(this.itemId).show();
        
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
            width: 750,
            height: 200,
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
                        params: {
                            id: this.itemId,
                            category_id: this.categoryId
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