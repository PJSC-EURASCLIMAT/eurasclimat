Ext.define('EC.Contractors.controller.EngSys', {

    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Contractors.store.EngSys'
    ],
    
    models: [
        'EC.Contractors.model.EngSys'
    ],
    
    views: [
        'EC.Contractors.view.EngSys'
    ],
    
    URL: {
		get: '/json/crm/contractors-engsys/get',
	    update: '/json/crm/contractors-engsys/update'
	},
    
	contractor_id: null,
	
    permissions: acl.isUpdate('crm', 'contractors'),
    
    run: function(container, contractor_id) {

        this.Container = container;
        this.contractor_id = contractor_id;
        
        this.grid = container.add(Ext.create('EC.Contractors.view.EngSys', {
            permissions: this.permissions
        }));

        this.grid.on({
        	ready: this.loadList,
        	reload: this.loadList,
        	scope: this
        });
        
        if (this.permissions) {
        }
    },

    loadList: function() {
    	this.grid.getStore().load({params: {contractor_id: this.contractor_id}});
    }
    
});