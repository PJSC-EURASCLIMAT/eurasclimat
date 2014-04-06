Ext.define('EC.Experts.controller.Courses', {

    extend: 'Ext.app.Controller',

    stores: [
        'EC.Experts.store.Courses'
    ],

    models: [
        'EC.Experts.model.Course'
    ],

    views: [
        'EC.Experts.view.Courses.Layout',
        'EC.Experts.view.Courses.Tree',
        'EC.Experts.view.Courses.List'
    ],

    permissions: acl.isUpdate('courses'),

    run: function(container, activeOnly) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'));

        this.layout = container.add(Ext.create('EC.Experts.view.Courses.Layout', {
            expertsStore: this.expertsStore,
            isPortlet: isPortlet,
            permissions: this.permissions
        }));

        this.grid = this.layout.down('#list');

        this.filtersTree = this.layout.down('#tree');
        this.filtersTree.on('select', this.onTreeFilterSelect, this);

        this.grid.store.load();

        this.filtersTree.down('#clear-button').on({
            click: function(){
                this.clearTreeFilter();
            },
            scope: this
        });

        if (this.permissions && !isPortlet) {

            this.grid.down('button[action=additem]').on({
                click: this.addItem,
                scope: this
            });

            this.grid.on({
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

    clearTreeFilter: function() {
        var arr = [];
        this.grid.store.proxy.extraParams.filter = Ext.JSON.encode(arr);
        this.grid.store.load();

        var selModel = this.filtersTree.getSelectionModel();
        if ( !Ext.isEmpty( selModel ) ) {
            selModel.deselectAll();
        }

    },


    onTreeFilterSelect: function( tree, record, index, eOpts ) {
        var arr = [{
            field: 'type_id',
            type: 'list',
            value: record.data.id
        }];

        this.grid.store.proxy.extraParams.filter = Ext.JSON.encode(arr);
        this.grid.store.load();
    },

    addItem: function() {
        this.editWin = Ext.create('EC.Experts.view.Courses.Edit');
        this.editForm = this.editWin.down('form');

        this.editForm.down('button[action=submit]').on('click',function() {
            this.grid.store.add(this.editForm.getValues());
            this.grid.store.sync();
            this.grid.store.load();
            this.editWin.close();
        }, this);
    },

    editItem: function(grid, record, fromCurrent) {
        this.editWin = Ext.create('EC.Experts.view.Courses.Edit',{
            values: record.data
        });
        this.editForm = this.editWin.down('form');

        var fn = function(btn, event, params) {
            params.record.set(this.editForm.getValues());
            this.grid.store.sync();
            this.grid.store.load();
            this.editWin.close();
        };

        this.editForm.down('button[action=submit]').on('click', fn, this, {record: record});
    },

    deleteItem: function(grid, record) {
        
        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        };
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ( 'yes' === b ) {
                this.grid.store.remove(record);
                this.grid.store.sync();
            }
        }, this);
    }
});