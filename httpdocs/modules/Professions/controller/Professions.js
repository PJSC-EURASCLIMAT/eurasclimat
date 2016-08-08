Ext.define('EC.Professions.controller.Professions', {

    extend: 'Ext.app.Controller',
    
    stores: ['EC.Professions.store.Professions'],
    
    models: ['EC.Professions.model.Profession'],
    
    views: [
        'EC.Professions.view.List',
        'EC.Professions.view.Edit'
//        'EC.Professions.view.Info'
    ],
    
    permissions: acl.isUpdate('crm', 'professions'),
    
    run: function(container, activeOnly) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'));

        this.grid = container.add(Ext.create('EC.Professions.view.List', {
            permissions: this.permissions,
            isPortlet: isPortlet
        }));


        this.grid.store.load();


        if (this.permissions && !isPortlet) {

            this.grid.on({
                additem: this.addItem,
                edititem: this.editItem,
                deleteitem: this.deleteItem,
                scope: this
            });

            this.on({
                'itemSaved': function() {
                    this.grid.getStore().load();
                },
                scope: this
            }, this);
        }
    },

    addItem: function() {
        var win = Ext.create('EC.Professions.view.Edit'),
            form = win.down('form');

        form.on('save',function(values) {
            this.grid.store.add(values);
            this.grid.store.sync();
            win.close();
        }, this );
    },

    editItem: function( grid, record ) {
        var win = Ext.create('EC.Professions.view.Edit'),
            form = win.down('form');

        form.getForm().setValues( record.data );

        form.on('save',function(values) {
            record.set(values);
            this.grid.store.sync();
            win.close();
        }, this );

    },

    deleteItem: function( grid, record ) {
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                this.grid.store.remove(record);
                this.grid.store.sync();
            }
        }, this);
    }

});