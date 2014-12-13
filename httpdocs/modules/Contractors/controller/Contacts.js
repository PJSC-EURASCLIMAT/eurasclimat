Ext.define('EC.Contractors.controller.Contacts', {

    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Contractors.store.Contacts'
    ],
    
    models: [
        'EC.Contractors.model.Contacts'
    ],
    
    views: [
        'EC.Contractors.view.Contacts.List',
        'EC.Contractors.view.Contacts.Edit'
    ],
    
    URL: {
		get: '/json/crm/contractors-contacts/get',
	    add: '/json/crm/contractors-contacts/create',
	    update: '/json/crm/contractors-contacts/update'
	},
    
	contractor_id: null,
	
    permissions: acl.isUpdate('crm', 'contractors'),
    
    run: function(container, contractor_id) {

        this.Container = container;
        this.contractor_id = contractor_id;
        
        this.grid = container.add(Ext.create('EC.Contractors.view.Contacts.List', {
            permissions: this.permissions
        }));

        if (this.permissions) {

            this.grid.on({
                additem: this.addItem,
                edititem: this.editItem,
                deleteitem: this.deleteItem,
                reload: this.loadList,
                scope: this
            });

            this.on('itemSaved', this.loadList, this);
        }
        
        this.loadList();
    },

    loadList: function() {
    	this.grid.getStore().load({params: {contractor_id: this.contractor_id}});
    },
    
    addItem: function() {

        var win = Ext.create('EC.Contractors.view.Contacts.Edit'),
            form = win.down('form');

        form.getForm().setValues({contractor_id: this.contractor_id});
        
        form.on('save', function(values) {
        	form.submit({
        		url: this.URL.add,
        		success: function(form, action) {
        			this.fireEvent('itemSaved');
        			win.close();
        		},
        		failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                   }
                },
                scope: this
        	});
        }, this );
    },

    editItem: function(grid, record) {

        var win = Ext.create('EC.Contractors.view.Contacts.Edit'),
            form = win.down('form');

        form.getForm().load({
        	url: this.URL.get,
        	params: {id: record.get('id')}
        });

        form.on('save', function(values) {
        	form.submit({
	        	url: this.URL.update,
	    		success: function() {
	    			this.fireEvent('itemSaved');
	    			win.close();
	    		},
	    		failure: function(form, action) {
	                switch (action.failureType) {
	                    case Ext.form.action.Action.CLIENT_INVALID:
	                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
	                        break;
	                    case Ext.form.action.Action.CONNECT_FAILURE:
	                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
	                        break;
	                    case Ext.form.action.Action.SERVER_INVALID:
	                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
	               }
	            },
	            scope: this
        	});
    	}, this);
    },

    deleteItem: function(grid, record) {
    	
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                this.grid.store.remove(record);
                this.grid.store.sync();
            }
        }, this);
    }
});