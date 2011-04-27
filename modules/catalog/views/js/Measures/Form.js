Ext.ns('Catalog.Measures');

Catalog.Measures.Form = Ext.extend(xlib.form.FormPanel, {

    itemId: null,
    
    categoryId: null,
    
    itemURL:    link('catalog', 'measures', 'get'),
    
    addURL:     link('catalog', 'measures', 'add'),
    
    updateURL:  link('catalog', 'measures', 'update'),
    
    loadMask: true,

    markFieldsDirty: false,
    
    permissions: acl.isUpdate('catalog'),
    
    labelWidth: 80,
    
    initComponent: function() {
        
        this.keys = [{
            key: [10,13],
            fn: this.submitForm,
            scope: this 
        }]
        
        this.items = [{
            xtype: 'textfield',
            fieldLabel: 'Название',
            name: 'name',
            allowBlank: false
        }];
        
        Catalog.Measures.Form.superclass.initComponent.apply(this, arguments);
        
        this.getForm().on('saved', function() {
            w.close();
        }, this);
        
        var w = this.getWindow(this.itemId).show();
                
        if (!this.itemId) {
            return;
        }
        
        this.getForm().load({
            url: this.itemURL,
            params: {
                id: this.itemId
            }
        });
    },
    
    // Private functions 
    
    getWindow: function(id) {
        
       var w = new Ext.Window({
            title: !id ? 'Новая запись' : 'Запись № ' + id,
            resizable: false,
            hidden: false,
            width: 250,
            modal: true,
            items: [this],
            buttons: [{
                text: 'Сохранить',
                hidden: !this.permissions,
                handler: this.submitForm,
                scope: this
            }, {
                text: 'Отмена',
                handler: function() {
                    w.close();
                },
                scope: this
            }]
        });
        
        return w;
    },
    
    submitForm: function() {
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
                    return;
                }
                xlib.Msg.error('Не удалось сохранить.')
            },
            failure: function() {
                xlib.Msg.error('Не удалось сохранить.')
            }
        });
    }
});

Ext.reg('Catalog.Measures.Form', Catalog.Measures.Form);