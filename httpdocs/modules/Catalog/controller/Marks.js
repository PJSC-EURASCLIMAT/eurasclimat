Ext.define('EC.Catalog.controller.Marks', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
         'EC.Catalog.store.Marks'
 	],
         
    models: [
        'EC.Catalog.model.Marks'
    ],

    views: [
        'EC.Catalog.view.Marks.List'
    ],
    
    permissions: acl.isUpdate('admin'),
    
    addURL: '/json/catalog/marks/add',
    
    editURL: '/json/catalog/marks/update',
    
    deleteURL: '/json/catalog/marks/delete',
    
    run: function(container) {
	
		this.Container = container;
		
	    var panel = container.add(Ext.create('EC.Catalog.view.Marks.List', {
	        permissions: this.permissions
	    }));
	    
	    panel.down('button[action=refresh]').on({
	        click: function() {
	            this.getStore('EC.Catalog.store.Marks').load();
	        },
	        scope: this
	    });
	    
	    if (this.permissions) {
	        
	        panel.down('button[action=additem]').on({
	            click: this.addItem,
	            scope: this
	        });
	        
	        panel.on({
	            edititem: this.editItem,
	            deleteitem: this.deleteItem,
	            scope: this
	        });
	        
	        this.on({
	            'itemSaved': function() {
	                this.getStore('EC.Catalog.store.Marks').load();
	            },
	            scope: this
	        }, this);
	    }
    },
    
    addItem: function() {
        
        var view = Ext.create('EC.Catalog.view.Marks.Add');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.addURL);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.create('EC.Catalog.view.Marks.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.editURL);
            },
            scope: this
        });
        
        var form = view.down('form');
        form.loadRecord(record);
    },
    
    updateItem: function(view, URL) {
        
        var form = view.down('form');
        
        form.submit({
            url: URL,
            success: function(form, action) {
                view.close();
                this.fireEvent('itemSaved');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
               }
            },
            scope: this
        });
    },
    
    deleteItem: function(grid, record) {
        
        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteURL,
                    success: function(response, opts) {
                        try {
                            var r = Ext.decode(response.responseText);
                            if (!r.success) {
                                return failureFn(arguments);
                            }
                        } catch(e) {
                            return failureFn(arguments);
                        }
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    } 
});