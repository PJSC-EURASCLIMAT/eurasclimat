Ext.define('EC.CRM.controller.Projects.Docs', {

//    itemId: 'EC.CRM.controller.Projects.Docs',
    
    extend: 'Ext.app.Controller',

    addDocURL: '/json/crm/projects-docs/add-doc',
    uploadURL: '/json/crm/projects-docs/upload',
    deleteDocURL: '/json/crm/projects-docs/delete',
    downloadURL: '/json/crm/projects-docs/download',
    updateDocURL: '/json/crm/projects-docs/update-doc',

    uploadDocVersionURL: '/json/crm/projects-docs-versions/upload-version',
    deleteDocVersionURL: '/json/crm/projects-docs-versions/delete-version',
    downloadDocVersionURL: '/json/crm/projects-docs-versions/download-version',

    refs: [
        { ref: 'docList', selector: 'crm-projects-docs-list' }
    ],

    stores: [
        'xlib.DocTypes.store.DocTypes',
        'EC.CRM.store.Projects.Docs',
        'EC.CRM.store.Projects.DocsVersions'
    ],

    models: [
        'xlib.DocTypes.model.DocTypes',
        'EC.CRM.model.Projects.Docs',
        'EC.CRM.model.Projects.DocsVersions'
    ],

    views: [
        'xlib.DocTypes.view.Combo',
        'EC.CRM.view.Projects.Docs.List',
        'EC.CRM.view.Projects.Docs.Versions'
    ],

    cur_project_id: null,

    run: function(container) {
        
        this.Container = container;
        
        var docsPanel = container.add(Ext.create('EC.CRM.view.Projects.Docs.List', {
        	cur_project_id: this.cur_project_id
        }));
        
        docsPanel.on({
            deleteitem: this.onDocDelete,
            'open-versions': this.openVersionsForDoc,
            download: this.downloadDoc,
            'update-doc-file': this.addDocVersion,
            'update-doc': this.editDoc,
            scope: this
        });
        
        docsPanel.down('button[action=add]').on({
            click: this.addDoc,
            scope: this
        });
        
        docsPanel.down('button[action=refresh]').on({
            click: this.docListRefresh,
            scope: this
        });
        
        docsPanel.down('button[action=edit-doc-types]').on({
            click: this.editDocTypes,
            scope: this
        });
        
        this.docListRefresh();
    },
    
    docListRefresh: function() {
       	this.Container.down('grid').getStore().load({
            params: {project_id: this.cur_project_id}
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
                        id: 'downloadIframe',
                        frameBorder: 0,
                        width: 0,
                        height: 0,
                        css: 'display:none;visibility:hidden;height:0px;',
                        src: url
                    });
                } else {
                    Ext.Msg.alert('Сообщение', 'Запрашиваемый файл не найден');
                }
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'В ходе получения файла произошла ошибка');
            },
            scope: this
        });
    },

    refreshDocVersionsList: function() {

        if (Ext.isDefined(this.docVerList)) {
            this.docVerList.down('grid').store.load();
        }
    },

    addDocVersion: function(doc_id) {
        
        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            singleUpload: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.uploadDocVersionURL,
            uploadParams: {doc_id: doc_id},
            listeners: {
                'uploadcomplete': {
                    fn: function(upDialog, manager, items, errorCount) {
                        if (!errorCount) {
                            upDialog.close();
                            this.refreshDocVersionsList();
                        }
                    },
                    scope: this
                },
                'close': {
                    fn: function (panel, eOpts ) {
                        this.refreshDocVersionsList();
                        this.docListRefresh();
                    },
                    scope: this
                }
            }
        });
    },

    deleteDocVersion: function(record) {

        var versLength = this.docVerList.down("grid").store.data.length;
        var doc_id  = this.docVerList.doc_id;

        var msgBox = Ext.create('Ext.window.MessageBox',{
            buttonText: {
                ok     : "OK",
                cancel : "Закрыть",
                yes    : "Удалить документ",
                no     : "Удалить только версию"
            }
        });

        if (versLength === 1) {
            msgBox.confirm('Подтверждение', 'Удалить документ, или только версию?', function(b) {
                if ('yes' === b) {
                    this.deleteDoc(doc_id);
                    this.docVerList.close();
                }
                if ('no' === b) {
                    this.removeDocVersion(record.getId(), record.get('file_id'));
                }
            }, this);
        } else {
            Ext.MessageBox.confirm('Подтверждение', 'Удалить версию?', function(b) {
                if ('yes' === b) {
                    this.removeDocVersion(record.getId(),record.get('file_id'));
                }
            }, this);
        }
    },

    removeDocVersion: function(id, file_id) {
        
        var failure = function() {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }
        
        Ext.Ajax.request({
            params: {
                id: id,
                file_id: file_id
            },
            url: this.deleteDocVersionURL,
            success: function(response, opts) {

                try {
                    var r = Ext.JSON.decode(response.responseText);
                } catch (e) {
                    return failure();
                }

                if (r.success !== true) {
                    return failure();
                }

                Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                this.refreshDocVersionsList();
            },
            failure: failure,
            scope: this
        });
    },

    openVersionsForDoc: function(record) {

        this.docVerList = Ext.create('EC.CRM.view.Projects.Docs.Versions').show();
        
        this.docVerList.on({
            'close': this.docListRefresh,
            'add-doc-version': this.addDocVersion,
            scope: this
        });
            
        this.docVerList.down('button[action=refresh]').on({
            click: this.refreshDocVersionsList,
            scope: this
        });
        
        this.docVerList.down('grid').on({
            download: this.downloadDocVersion,
            'delete': this.deleteDocVersion,
            scope: this
        });
        
        this.docVerList.doc_id = record.getId();
        this.docVerList.down('grid').store.proxy.extraParams = {doc_id: record.getId()};
        this.docVerList.down('grid').store.load();
    },

    deleteDoc: function(id) {
        
        var failure = function() {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        };
        Ext.Ajax.request({
            params: {
                id: id
            },
            url: this.deleteDocURL,
            success: function(response, opts) {

                try {
                    var r = Ext.JSON.decode(response.responseText);
                } catch (e) {
                    return failure();
                }

                if (r.success !== true) {
                    return failure();
                }
                
                this.docListRefresh();
                Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
            },
            failure: failure,
            scope: this
        });
    },

    onDocDelete: function(record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить документ?', function(b) {
            if ('yes' === b) {
                this.deleteDoc(record.getId());
            }
        }, this);
    },

    downloadDoc: function(record) {
        
        var url = this.downloadURL + "?id=" + record.get('id');
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
                    Ext.Msg.alert('Сообщение', 'Запрашиваемый файл не найден');
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'В ходе получения файла произошла ошибка');
            },
            scope: this
        });
    },

    submitAddForm: function(view, andUpload) {
        
        var form = view.down('form');
        form.submit({
            url: this.addDocURL,
            success: function(form, action) {
                this.docListRefresh();
                view.close();
                if (andUpload === true) {
                    this.addDocVersion(action.result.id);
                }
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

    submitEditForm: function(view) {
        
        var form = view.down('form');
        form.submit({
            url: this.updateDocURL,
            success: function(form, action) {
                this.docListRefresh();
                view.close();
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

    editDoc: function(record) {

        var view = Ext.create('EC.CRM.view.Projects.Docs.Edit', {
            docModel: record
        });
        
        view.on({
            save: function(event) {
                this.submitEditForm(view);
            },
            scope: this
        });
    },

    addDoc: function() {

        var view = Ext.create('EC.CRM.view.Projects.Docs.Add', {
            project_id: this.cur_project_id
        });

        view.on({
            save: function(event, andUpload) {
                this.submitAddForm(view, andUpload);
            },
            scope: this
        });
    },

    editDocTypes: function() {
        
        var win = Ext.create('Ext.window.Window', {
            title: 'Список групп документов',
            modal: true,
            width: 400,
            height: 400,
            autoShow: true,
            layout: 'fit',
            border: false,
            buttons: [{
                text: 'Закрыть',
                scope: this,
                handler: function(btn, e) {
                    this.docListRefresh();
                    btn.up('window').close();
                }
            }]
        });
        this.getController('xlib.DocTypes.controller.DocTypes').run(win);
    }

});