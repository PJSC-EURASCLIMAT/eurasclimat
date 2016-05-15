Ext.define('EC.Contractors.controller.Contractors', {

    extend: 'Ext.app.Controller',
    
    controllers: [
         'EC.Contractors.controller.Contacts',
         'EC.Contractors.controller.EngSys',
         'EC.Contractors.controller.Docs'
	  ],
    
    stores: [
        'EC.Contractors.store.Contractors',
        'EC.EngSystemTypes.store.EngSystemTypes'
    ],
    
    models: [
        'EC.Contractors.model.Contractors'
    ],
    
    views: [
        'EC.Contractors.view.List',
        'EC.Contractors.view.Add',
        'EC.Contractors.view.Edit',
        'EC.Contractors.view.Info'
    ],
    
    URL: {
        get: '/json/crm/contractors/get',
	      add: '/json/crm/contractors/create',
	      update: '/json/crm/contractors/update'
    },
    
    permissions: acl.isUpdate('crm', 'contractors'),
    
    run: function(container) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'));

        this.grid = container.add(Ext.create('EC.Contractors.view.List', {
            permissions: this.permissions,
            isPortlet: isPortlet
        }));

        this.grid.getStore().load();

        if (this.permissions && !isPortlet) {

            this.grid.on({
                additem: this.addItem,
                edititem: this.editItem,
                deleteitem: this.deleteItem,
                scope: this
            });

            this.on('itemSaved', function() {
                this.grid.getStore().load();
            }, this);
            
            this.on('itemCreated', function(id) {
        		var record = this.getModel('EC.Contractors.model.Contractors').create({id: id});
        		this.editItem(this.grid, record);
            }, this);
        }
    },

    addItem: function() {

        var win = Ext.create('EC.Contractors.view.Add'),
            form = win.down('form');

        form.on('save', function(values) {
        	form.submit({
        		url: this.URL.add,
        		success: function(form, action) {
        			this.fireEvent('itemSaved');
        			this.fireEvent('itemCreated', action.result.id);
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

        var win = Ext.create('EC.Contractors.view.Edit'),
            form = win.down('form'),
            contractor_id = record.get('id');

        this.getController('EC.Contractors.controller.EngSys').run(win.down('#ContractorsEngSysTab'), contractor_id);
        this.getController('EC.Contractors.controller.Contacts').run(win.down('#ContractorsContactsTab'), contractor_id);
        this.getController('EC.Contractors.controller.Docs').run(win.down('#ContractorsDocsTab'), contractor_id);
        
        form.getForm().load({
        	url: this.URL.get,
        	params: {id: contractor_id}
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