Ext.ns('Catalog.Settings');

Catalog.Settings.Form = Ext.extend(xlib.form.FormPanel, {

    itemId: null,
    
    entity: null,
    
    addURL:     link('catalog', 'settings', 'add'),
    
    updateURL:  link('catalog', 'settings', 'update'),
    
    permissions: true,
    
    labelWidth: 80,
    
    initComponent: function() {
        
        if (Ext.isEmpty(this.entity)) {
            throw 'Entity is not defined';
        }
        
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
        
        Catalog.Settings.Form.superclass.initComponent.apply(this, arguments);
        
        this.getForm().on('saved', function() {
            w.close();
        }, this);
        
        var w = this.getWindow(this.itemId).show();
    },
    
    // Private functions 
    
    getWindow: function(id) {
        
       var w = new Ext.Window({
            title: !id ? 'Новая запись' : 'Запись № ' + id,
            resizable: false,
            hidden: false,
            width: 400,
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
                entity: this.entity
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

Ext.reg('Catalog.Settings.Form', Catalog.Settings.Form);