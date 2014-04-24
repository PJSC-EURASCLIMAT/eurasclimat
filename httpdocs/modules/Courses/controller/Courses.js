Ext.define('EC.Courses.controller.Courses', {

    extend: 'Ext.app.Controller',

    stores: [
        'EC.Courses.store.Courses'
    ],

    models: [
        'EC.Courses.model.Course'
    ],

    views: [
        'EC.Courses.view.Layout',
        'EC.Courses.view.Tree',
        'EC.Courses.view.List'
    ],

    permissions: acl.isUpdate('courses'),

    selectedGroup: null,

    ukkomURL: 'json/courses/courses/ukkom',
    
    run: function(container, activeOnly) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'));

        this.layout = container.add(Ext.create('EC.Courses.view.Layout', {
            expertsStore: this.expertsStore,
            isPortlet: isPortlet,
            permissions: this.permissions
        }));

        this.grid = this.layout.down('#list');

        this.filtersTree = this.layout.down('#tree');
        this.filtersTree.on('select', this.onTreeFilterSelect, this);

        this.grid.store.load();

        this.grid.down('#ukkom').on({
            click: this.ukkomRedirect,
            scope: this
        });

        if ( this.permissions && !isPortlet ) {

            this.grid.down('button[action=additem]').on({
                click: this.addItem,
                scope: this
            });

            this.grid.on({
                edititem: this.editItem,
                deleteitem: this.deleteItem,
                closedchange: this.closedChange,
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

    ukkomRedirect: function() {
        Ext.Ajax.request({
            url: this.ukkomURL,
            callback: function() {
                var win = window.open("http://www.ukkom.ru", "_blank");
                win.focus();

            }
        });
    },

    clearTreeFilter: function() {

        this.grid.down('#groupColumn').show();

        this.selectedGroup = null;
        
        var arr = [];
        this.grid.store.proxy.extraParams.filter = Ext.JSON.encode(arr);
        this.grid.store.load();

        var selModel = this.filtersTree.getSelectionModel();
        if ( !Ext.isEmpty( selModel ) ) {
            selModel.deselectAll();
        }

    },


    onTreeFilterSelect: function (tree, record, index, eOpts) {

        var groupID = record.get('id');
        
        if ('root' === groupID) {
            this.clearTreeFilter();
            return;
        }
        this.grid.down('#groupColumn').hide();

        this.selectedGroup = groupID; 
        
        var arr = [{
            field: 'group_id',
            type: 'list',
            value: groupID
        }];

        this.grid.store.proxy.extraParams.filter = Ext.JSON.encode(arr);
        this.grid.store.load();
    },

    addItem: function() {
        
        this.editWin = Ext.create('EC.Courses.view.Edit', {
            values: {
                name: null,
                description: null,
                group_id: this.selectedGroup,
                group_name: null,
                offer_num: null,
                price: null,
                closed: 0
            }
        });
        this.editForm = this.editWin.down('form');

        this.editForm.down('button[action=submit]').on('click',function() {
            this.grid.store.add(this.editForm.getValues());
            this.grid.store.sync();
            this.grid.store.load();
            this.editWin.close();
        }, this);
    },

    closedChange: function(rowIndex, checked) {
        //debugger;
        var record = this.grid.store.getAt(rowIndex);
        record.set('closed', checked);
        this.grid.store.sync();
        this.grid.store.load();
    },

    editItem: function(grid, record, fromCurrent) {
        this.editWin = Ext.create('EC.Courses.view.Edit',{
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