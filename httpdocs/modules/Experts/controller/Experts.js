Ext.define('EC.Experts.controller.Experts', {

    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Experts.store.Experts',
        'EC.Experts.store.ActiveExperts',
        'EC.Experts.store.Equipment',
        'EC.Experts.store.JobTypes',
        'EC.Experts.store.Rating',
        'EC.Experts.store.Statuses'
    ],
    
    models: [
        'EC.Experts.model.Expert'
    ],
    
    views: [
        'EC.Experts.view.Experts.List',
        'EC.Experts.view.Experts.Edit',
        'EC.Experts.view.Experts.Info'
    ],
    
    permissions: acl.isUpdate('experts'),
    
    addURL: '/json/experts/experts/add',

    activateURL: '/json/experts/experts/activate',

    deleteURL: '/json/experts/experts/delete',

    filtersTreeURL: '/json/experts/experts/get-filters-tree',

    refNames: {
        'rating': 'Рейтинг специалистов',
        'equipment': 'Типы инженерного оборудования специалистов',
        'statuses': 'Статусы специалистов',
        'job_types': 'Типы деятельности специалистов'
    },

    hiddenGridColumns: [],
    filters: {
        'rating': '',
        'equip_id': '',
        'status_id': '',
        'job_type_id': '',
        'city_id': '',
        'experience': ''
    },

    run: function(container) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet')); 
        
        this.layout = container.add(Ext.create('EC.Experts.view.Experts.Layout', {
            permissions: this.permissions
        }));

        this.grid = this.layout.down('#list');

        this.filtersTree = this.layout.down('#tree');
        this.filtersTree.on('checkchange', this.onTreeFilterCheck, this);

        this.grid.store.load();

        this.loadFilterTree();

        if (this.permissions) {

            this.grid.down('button[action=additem]').on({
                click: function(){
                    this.addItem();
                },
                scope: this
            });

            this.grid.on({
                edititem: this.editItem,
                itemdblclick: function(grid, record) {
                    this.showItem(record.get('id'));
                },
                deleteitem: this.deleteItem,
                openref: this.openRef,
                activechange: this.activeChange,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    grid.getStore().load();
                },
                scope: this
            }, this);
        }

//        this.grid.down('toolbar [name=equip_id]').on('change', this.onEquipFilter, this.grid);
//        this.grid.down('toolbar [name=status_id]').on('change', this.onStatusFilter, this.grid);
    },


    loadFilterTree: function() {

        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Не удалось получить даныне по фильтрам!');
        };

        Ext.Ajax.request({
            url: this.filtersTreeURL,
            success: function(response, opts) {
                try {
                    var r = Ext.decode(response.responseText);
                    if (!r.success) {
                        return failureFn(arguments);
                    }
                    var root = {
                        expanded: true,
                        children: r.data
                    };

                    var store = Ext.create('Ext.data.TreeStore', {
                        fields: ['filId', 'text', 'type'],
                        root: root
                    });

                    this.filtersTree.setRootNode(store.getRootNode());

                } catch(e) {
                    return failureFn(arguments);
                }
            },
            failure: failureFn,
            scope: this
        });
    },

    onTreeFilterCheck: function( node, checked, eOpts ) {
        var p = node.parentNode;
        this.filters[p.data.type] = '';
        var arr = [];

        p.cascadeBy(function(n){
            if(n.data.checked === true) {
                arr.push(n.data.filId);
            }
        }, this);

        this.filters[p.data.type] = arr.join(',');
        this.refreshGridFilters();
    },

    refreshGridFilters: function() {
//        this.grid.store.clearFilter();

        this.grid.store.proxy.extraParams.filters = [];
        var arr = [];
        Ext.iterate(this.filters, function(key, value){
                if (value !== "" ) {
                    if(key === 'rating') {
                        arr.push({
                            field: key,
                            type: 'numeric',
                            comparison: 'numeric',
                            value: value
                        });
                    } else {
                        arr.push({
                            field: key,
                            type: 'list',
                            value: value
                        });
                    }
                }
        }, this);

        this.grid.store.proxy.extraParams.filter = Ext.JSON.encode(arr);

        this.grid.store.load();

    },

    onEquipFilter: function(combo, newValue, oldValue, eOpts) {
        this.store.removeFilter('equipFilter');
        this.store.addFilter({
            id: 'equipFilter',
            property: 'equip_id',
            value: combo.getValue()
        });
    },

    onStatusFilter: function(combo, newValue, oldValue, eOpts) {
        this.store.removeFilter('statusFilter');
        this.store.addFilter({
            id: 'statusFilter',
            property: 'status_id',
            value: combo.getValue()
        });
    },

    onActualityFilter: function(combo, newValue, oldValue, eOpts) {
        this.getStore().getProxy().extraParams = {actuality: combo.getValue()};
        this.getStore().guaranteeRange(0, 10);
    },

    activeChange: function(rowIndex, checked) {
        var record = this.grid.store.getAt(rowIndex);

        Ext.Ajax.request({
            params: {
                id: record.get('id'),
                active: checked
            },
            url: this.activateURL,
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                record.commit();
            },
            failure: function() {
                record.reject();
                Ext.Msg.alert('Ошибка', 'Не удалось активировать специалиста!');
            },
            scope: this
        });
    },

    openRef: function(ref_name) {
        var list = Ext.create('xlib.Ref.List',{
            controllerURL: '/json/experts/experts-ref/',
            ref_name: ref_name
        });

        var container = Ext.create('Ext.window.Window', {
            title: this.refNames[ref_name],
            modal: true,
            width: 400,
            height: 400,
//            autoShow: true,
            layout: 'fit',
            border: false
        });

        container.on('close',function(){
            this.getStore('EC.Experts.store.Experts').load();
        },this);
        container.add(list);
        container.show();
    },

    addItem: function() {
        
        var view = Ext.create('EC.Experts.view.Experts.Edit');
        
        view.down('button[action=save]').on({
            click: function() {
                var form = view.down('form');
                form.submit({
                    url: this.addURL,
                    success: function(form, action) {
                        view.close();
                        this.fireEvent('itemSaved');
                    },
                    failure: function(form, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                       }
                    },
                    scope: this
                });
            },
            scope: this
        });
    },

    editItem: function(grid, record, fromCurrent) {

        this.expertsEditWin = Ext.create('EC.Experts.view.Experts.Edit',{
            data: record.data,
            fromCurrent: fromCurrent,
            getFilesURL: this.getExpertDocsURL,
            listeners: {
                close: function() {
                    grid.store.load();
                }
            }
        });
    },

    deleteItem: function(grid, record) {
        
        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteURL,
                    success: function(response, opts) {
                        try {
                            var r = Ext.decode(response.responseText);
                            if (!r.success) {
                                return failureFn(arguments);
                            }
                        } catch(e) {
                            return failureFn(arguments);
                        }
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    }
});