Ext.define('EC.Services.controller.Services', {

    extend: 'Ext.app.Controller',
    
    stores: ['EC.Services.store.Services'],
    
    models: ['EC.Services.model.Service'],
    
    views: [
        'EC.Services.view.Layout',
        'EC.Services.view.TreeGrid',

        'EC.Services.view.List',
        'EC.Services.view.Edit',
        'EC.Services.view.Info'
    ],
    
    permissions: acl.isUpdate('services'),
    
    run: function(container, activeOnly) {

        this.Container = container;
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet'));

        this.layout = container.add(Ext.create('EC.Services.view.Layout', {
            permissions: this.permissions
        }));

        this.treeGrid = this.layout.down('#tree-grid');

        this.treeGrid

//        this.grid.store.load();
//
//        if (this.permissions && !isPortlet) {
//
//            this.grid.down('button[action=additem]').on({
//                click: function(){
//                    this.addItem();
//                },
//                scope: this
//            });
//
//            this.grid.on({
//                edititem: this.editItem,
////                itemdblclick: function(grid, record) {
////                    var accId = record.get('account_id');
////                    Ext.Router.redirect('#/profile/' + accId + '/show');
////                },
//                deleteitem: this.deleteItem,
//                openref: this.openRef,
//                activechange: this.activeChange,
//                scope: this
//            });
//
//            this.on({
//                'itemSaved': function() {
//                    this.grid.getStore().load();
//                },
//                scope: this
//            }, this);
//        }
    }


//    openRef: function(ref_name) {
//
//        var list = Ext.create('xlib.Ref.List',{
//            controllerURL: '/json/experts/experts-ref/',
//            ref_name: ref_name
//        });
//
//        var container = Ext.create('Ext.window.Window', {
//            title: this.refNames[ref_name],
//            modal: true,
//            width: 400,
//            height: 400,
////            autoShow: true,
//            layout: 'fit',
//            border: false
//        });
//
//        container.on('close',function(){
//            this.getStore('EC.Experts.store.Experts').load();
//        },this);
//        container.add(list);
//        container.show();
//    }

//    addItem: function() {
//
//        var view = Ext.create('EC.Experts.view.Experts.Edit',{
//            editExpertURL: this.addURL
//        });
//
//        view.on('updateSuccess',function() {
//            this.grid.store.load();
//            view.close();
//        }, this);
//    },
//
//    editItem: function(grid, record, fromCurrent) {
//
//        this.expertsEditWin = Ext.create('EC.Experts.view.Experts.Edit',{
//            data: record.data,
//            fromCurrent: fromCurrent,
//            getFilesURL: this.getExpertDocsURL,
//            listeners: {
//                close: function() {
//                    grid.store.load();
//                }
//            }
//        });
//        this.expertsEditWin.on('updateSuccess',function() {
//            this.expertsEditWin.close();
//            this.grid.getStore().load();
//        }, this);
//    },
//
//    deleteItem: function(grid, record) {
//
//        var failureFn = function(response, opts) {
//            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
//        }
//
//        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
//
//            if ('yes' === b) {
//                Ext.Ajax.request({
//                    params: {
//                        id: record.get('id')
//                    },
//                    url: this.deleteURL,
//                    success: function(response, opts) {
//                        try {
//                            var r = Ext.decode(response.responseText);
//                            if (!r.success) {
//                                return failureFn(arguments);
//                            }
//                        } catch(e) {
//                            return failureFn(arguments);
//                        }
//                        this.fireEvent('itemSaved');
//                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
//                    },
//                    failure: failureFn,
//                    scope: this
//                });
//            }
//        }, this);
//    }
});