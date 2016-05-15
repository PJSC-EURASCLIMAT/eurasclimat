Ext.define('EC.Manufacturers.controller.SiteView', {
    
    extend: 'App.controller.PortalAbstract',

    views: [ 'EC.Manufacturers.view.SiteView', 'EC.Manufacturers.view.List' ],

    stores: [ 'EC.Manufacturers.store.Manufacturers' ],
    
    refs: [ { ref: 'list', selector: 'ManufacturersList' }, { ref: 'frame', selector: 'ManufacturersSiteView #SiteViewFrame' } ],

    permissions: acl.isUpdate('admin'),
    
    run: function(container) {
        this.control({
            'ManufacturersList': {
                additem: this.editItem,
                edititem: this.editItem,
                deleteitem: this.deleteItem,
                rowClicked: this.openSite
            },
            'ManufacturersSiteView': { afterlayout: this.viewAfterLayout }
        });
        container.add(this.getView(this.views[0]).create());
    },

    openSite: function(url) {
        this.getFrame().el.down('iframe').set({src: "" + url + ""});
    },

    viewAfterLayout: function ( view, layout, eOpts ) {
        document.getElementById('ManufacturersIFrame').contentWindow.document.getElementsByTagName('body')[0].innerHTML = "Выберите сайт из списка слева";
    },

    editItem: function(grid, record) {
        var win = Ext.create('EC.Manufacturers.view.Edit'), form = win.down('form');
        if (null != record) form.getForm().loadRecord(record);
        form.on('save', function(values) {
            if (null != record) { record.set(form.getValues()); } else { grid.getStore().add(form.getValues()); }
            win.close();
        });
    },

    deleteItem: function(grid, record) {
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) { if ('yes' === b) { grid.getStore().remove(record); } } );
    }
});