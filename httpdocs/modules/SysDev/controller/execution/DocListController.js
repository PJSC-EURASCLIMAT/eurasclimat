Ext.define('EC.SysDev.controller.execution.DocListController', {
    
    extend: 'Ext.app.Controller',

    uploadURL: '/json/sysdev/project-docs/upload',

    deleteGroupURL: '/json/sysdev/project-docs/delete',

    downloadURL: '/json/sysdev/project-docs/download',

    refs: [
        { ref: 'docList', selector: 'project-doc-list' } // this.getDocList()
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
                download: this.downloadDoc
            },
            'project-doc-list button[action=add]': {
                click: this.onDocAdd
            },
            'project-doc-list button[action=refresh]': {
                click: this.docListRefresh
            }
        });

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
                    url: this.deleteGroupURL,
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
        var url = this.downloadURL + "?id=" + record.get('id');
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