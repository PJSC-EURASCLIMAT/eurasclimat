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

        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.getId()
                    },
                    url: this.deleteGroupURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.getDocList().getStore().remove(record);
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
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
        Ext.DomHelper.append(document.body, {
            tag: 'iframe',
            id:'downloadIframe',
            frameBorder: 0,
            width: 0,
            height: 0,
            css: 'display:none;visibility:hidden;height:0px;',
            src: this.downloadURL + "?id=" + record.get('id')
        });
    },

    onDocAdd: function() {
        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.uploadURL,
            uploadParams: {project_id: this.cur_project_id},
            uploadExtraHeaders: {'Content-Type': 'multipart/form-data'},
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