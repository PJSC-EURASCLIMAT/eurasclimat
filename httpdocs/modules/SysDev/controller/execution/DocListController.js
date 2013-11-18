Ext.define('EC.SysDev.controller.execution.DocListController', {
    
    extend: 'Ext.app.Controller',

    uploadURL: '/json/sysdev/project-docs/upload',

    uploadDocVersionURL: '/json/sysdev/project-docs/upload-version',

    deleteDocURL: '/json/sysdev/project-docs/delete',

    deleteDocVersionURL: '/json/sysdev/project-docs/delete-version',

    downloadURL: '/json/sysdev/project-docs/download',

    downloadDocVersionURL: '/json/sysdev/project-docs/download-version',

    refs: [
        { ref: 'docList', selector: 'project-doc-list' }
    ],

    cur_project_id: null,
    
    run: function() {
        
        this.listen({
//            controller: {
//                '*': {
//                    'project-selected': this.onProjectSelected
//                }
//            }
        });
        this.control({
            'project-doc-list': {
                deleteitem: this.onDocDelete,
                'open-versions': this.openVersionsForDoc,
                download: this.downloadDoc
            },
            'project-doc-list button[action=add]': {
                click: this.onDocAdd
            },
            'project-doc-list button[action=refresh]': {
                click: this.docListRefresh
            },
            'project-doc-versions-win grid': {
                download: this.downloadDocVersion,
                delete: this.deleteDocVersion
            },
            'project-doc-versions-win button[action=add]': {
                click: this.addDocVersion
            },
            'project-doc-versions-win button[action=refresh]': {
                click: this.refreshDocVersionsList
            }
        });

    },

    downloadDocVersion: function(record) {
        var url = this.downloadDocVersionURL + "?id=" + record.get('id');
        Ext.Ajax.request({
            url: url,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);

                if (r.success === true) {
                    Ext.DomHelper.append(document.body, {
                        tag: 'iframe',
                        id:'downloadIframe',
                        frameBorder: 0,
                        width: 0,
                        height: 0,
                        css: 'display:none;visibility:hidden;height:0px;',
                        src: url
                    });
                } else {
                    Ext.Msg.alert('Сообщение', 'Заправшиваемый файл не найден');
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'В ходе получения файла произошла ошибка');
            },
            scope: this
        });
    },

    refreshDocVersionsList: function() {
        this.docVerList.down('grid').store.load();
    },

    addDocVersion: function() {
        var doc_id = this.docVerList.down('grid').store.proxy.extraParams.doc_id;
        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            singleUpload: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.uploadDocVersionURL,
            uploadParams: {doc_id: doc_id},
            listeners: {
                'uploadcomplete' : {
                    fn: function(upDialog, manager, items, errorCount) {
                        if (!errorCount) {
                            upDialog.close();
                            this.refreshDocVersionsList();
                        }
                    },
                    scope: this
                },
                'close' : {
                    fn: function (panel, eOpts ) {
                        this.refreshDocVersionsList();
                    },
                    scope: this
                }
            }
        });
    },

    deleteDocVersion: function(record) {
        Ext.MessageBox.confirm('Подтверждение', 'Удалить версию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.getId(),
                        file_id: record.get('file_id')
                    },
                    url: this.deleteDocVersionURL,
                    success: function(response, opts) {

                        try {
                            var r = Ext.JSON.decode(response.responseText);
                        } catch (e) {
                            failure();
                            return;
                        }

                        if (r.success === true) {
                            Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                            this.refreshDocVersionsList();
                        } else {
                            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                        }
                    },
                    failure: failure,
                    scope: this
                });
            }
        }, this);
    },

    openVersionsForDoc: function(record) {
//        alert('BEBE');.
        if (!Ext.isDefined(this.docVersionsList)) {
           this.docVerList = Ext.create('EC.SysDev.view.execution.DocVersionsList').show();
        }
        this.docVerList.down('grid').store.proxy.extraParams = {doc_id: record.getId()};
        this.docVerList.down('grid').store.load();
    },
            
    onProjectSelected: function(record) {

        if (record.get('leaf') != true) {
            return;
        }
        
        if (!acl.isView('sysdev', 'docs')) {
            return;
        }

        this.getDocList().getStore().load({
            params: {
                project_id: record.get('id')
            }
        });

        this.cur_project_id = record.get('id');

    },

    onDocDelete: function(record) {

        var failure = function() {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.getId()
                    },
                    url: this.deleteDocURL,
                    success: function(response, opts) {
                        
                        try {
                            var r = Ext.JSON.decode(response.responseText);
                        } catch (e) {
                            failure();
                            return;
                        }

                        if (r.success === true) {
                            Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                            this.getDocList().getStore().load();
                        } else {
                            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                        }
                    },
                    failure: failure,
                    scope: this
                });
            }
        }, this);

    },

    docListRefresh: function() {
        this.getDocList().getStore().load({
            params: {
                project_id: this.cur_project_id
            }
        });
    },

    downloadDoc: function(record){
        var url = this.downloadURL + "?doc_id=" + record.get('doc_id');
        Ext.Ajax.request({
            params: {
                id: record.getId()
            },
            url: url,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);

                if (r.success === true) {
                    Ext.DomHelper.append(document.body, {
                        tag: 'iframe',
                        id:'downloadIframe',
                        frameBorder: 0,
                        width: 0,
                        height: 0,
                        css: 'display:none;visibility:hidden;height:0px;',
                        src: url
                    });
                } else {
                    Ext.Msg.alert('Сообщение', 'Заправшиваемый файл не найден');
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'В ходе получения файла произошла ошибка');
            },
            scope: this
        });


    },

    onDocAdd: function() {
        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.uploadURL,
            uploadParams: {project_id: this.cur_project_id},
            listeners: {
                'uploadcomplete' : {
                    fn: function(upDialog, manager, items, errorCount) {
                        if (!errorCount) {
                            upDialog.close();
//                             panel.viewPanel.getStore().load({url: this.getImagesURL, id: id});
                        }
                    },
                    scope: this
                },
                'close' : {
                    fn: function (panel, eOpts ) {
                      this.docListRefresh();
                    },
                    scope: this
                }
            }
        });
    }
    
});