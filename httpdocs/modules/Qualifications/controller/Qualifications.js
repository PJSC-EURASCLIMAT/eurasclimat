Ext.define('EC.Qualifications.controller.Qualifications', {

    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Qualifications.store.Qualifications',
        'EC.Qualifications.store.QualificationsTypes'
    ],
    
    models: [
        'EC.Qualifications.model.Qualification',
        'EC.Qualifications.model.QualificationType'
    ],
    
    views: [
        'EC.Qualifications.view.Layout',
        'EC.Qualifications.view.List',
        'EC.Qualifications.view.TypesList',
        'EC.Qualifications.view.Edit'
//        'EC.Qualifications.view.Info'
    ],
    
    permissions: acl.isUpdate('crm', 'qualifications'),
    
    run: function(container, activeOnly) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'));

        this.layout = container.add(Ext.create('EC.Qualifications.view.Layout', {
            permissions: this.permissions,
            isPortlet: isPortlet
        }));

        this.grid = this.layout.down('#list');

        this.typesGrid = this.layout.down('#types-list');

        this.grid.disable();
        this.typesGrid.on('select', function(){
            this.grid.store.load();
        }, this, {single: true});

        this.typesGrid.store.load();

        if (this.permissions && !isPortlet) {

            this.typesGrid.on({
                additem: this.addTypeItem,
                edititem: this.editTypeItem,
                deleteitem: this.deleteTypeItem,
                select: this.typeSelect,
                scope: this
            });

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

    typeSelect: function(grid, record, index, eOpts) {
        this.grid.enable();
        this.grid.store.clearFilter();
        this.grid.store.filter('type_id', record.data.id);
    },

    addItem: function() {

        var win = Ext.create('EC.Qualifications.view.Edit'),
            form = win.down('form');

        var selection = this.typesGrid.getSelectionModel().getSelection()[0];

        if (!Ext.isEmpty(selection)) {
            form.getForm().setValues({
                'type_id': selection.data.id
            });
        }

        form.on('save', function(values) {
            this.grid.store.add(values);
            this.grid.store.sync();
            this.grid.store.load();
            win.close();
        }, this );
    },

    editItem: function(grid, record) {
    	
        var win = Ext.create('EC.Qualifications.view.Edit'),
            form = win.down('form');

        form.getForm().setValues(record.data);

        form.on('save', function(values) {
            record.set(values);
            this.grid.store.sync();
            this.grid.store.load();
            win.close();
        }, this );

    },

    deleteItem: function(grid, record) {
    	
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                this.grid.store.remove(record);
                this.grid.store.sync();
            }
        }, this);
    },

    addTypeItem: function() {
    	
        var win = Ext.create('EC.Qualifications.view.TypeEdit'),
            form = win.down('form');

        form.on('save', function(values) {
            this.typesGrid.store.add(values);
            this.typesGrid.store.sync();
            win.close();
        }, this );
    },

    editTypeItem: function(grid, record) {
    	
        var win = Ext.create('EC.Qualifications.view.TypeEdit'),
            form = win.down('form');

        form.getForm().setValues(record.data);

        form.on('save', function(values) {
            record.set(values);
            this.typesGrid.store.sync();
            win.close();
        }, this );

    },

    deleteTypeItem: function(grid, record) {
    	
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                this.typesGrid.store.remove(record);
                this.typesGrid.store.sync();
            }
        }, this);
    }
});