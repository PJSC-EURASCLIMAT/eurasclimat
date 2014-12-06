Ext.define('EC.Services.controller.Services', {

    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Services.store.Services',
        'EC.Professions.store.Professions',
        'EC.EngSystemTypes.store.EngSystemTypes'
    ],
    
    models: ['EC.Services.model.Service'],
    
    views: [
        'EC.Services.view.TreeGrid',
        'EC.Services.view.Edit'
//        'EC.Services.view.Info'
    ],
    
    permissions: acl.isUpdate('services'),
    
    run: function(container, activeOnly) {

        this.Container = container;
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'));

        this.treeGrid = container.add(Ext.create('EC.Services.view.TreeGrid', {
            permissions: this.permissions,
            isPortlet: isPortlet
        }));

        if (this.permissions && !isPortlet) {
            this.treeGrid.on({
                edititem: this.editItem,
                scope: this
            });
        }
//        this.treeGrid.store.load();
    },

    editItem: function(treeGrid, record ) {
    	
        var win = Ext.create('EC.Services.view.Edit'),
            form = win.down('form');

        form.getForm().setValues(record.data);
        form.on('save', function(values) {
        	
            Ext.iterate(values, function(key, value){
                if (!Ext.isEmpty(value)) record.set(key, value);
            }, this);

            this.treeGrid.store.sync({
                success: function() {
                    record.commit();
                },
                failure: function() {
                    record.reject();
                }
            });
            win.close();
        }, this );
    }
});