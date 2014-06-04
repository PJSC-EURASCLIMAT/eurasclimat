Ext.define('EC.Services.controller.Services', {

    extend: 'Ext.app.Controller',
    
    stores: ['EC.Services.store.Services'],
    
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

        if ( this.permissions && !isPortlet ) {

            this.treeGrid.on({
                edititem: this.editItem,
                scope: this
            });

        }
    },

    editItem: function(treeGrid, record ) {
        var win = Ext.create('EC.Services.view.Edit'),
            form = win.down('form');

        form.getForm().setValues( record.data );

        form.on('save',function(values) {

            // TODO так пашет
            record.set('text', values.text);

            // TODO так не пашет
            record.set(values);

            this.treeGrid.store.sync();
            win.close();
        }, this );

    }


});