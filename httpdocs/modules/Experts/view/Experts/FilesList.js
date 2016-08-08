Ext.define('EC.Experts.view.Experts.FilesList', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.experts-files-list',

    title: 'Файлы',
    
    layout: 'fit',
    
    border: false,
    
    addExpertDocURL: null,

    deleteExpertDocURL: null,

    getExpertDocsURL: null,

    hideHeaders: true,

    columns: [{
        xtype: 'templatecolumn',
        header: 'Заголовок новости',
        flex: 1,
        tpl: '<a href="#/download/{file_id}">{file_name}</a>'
    }, {
        xtype: 'actioncolumn',
        align: 'center',
        width: 30,
        items: [{
            iconCls: 'x-btn icon',
            icon: '/images/icons/delete.png',
            tooltip: 'Удалить',
            disabled: !acl.isUpdate('sysdev', 'docs', 'versions'),
            handler: function(gridView, rowIndex, colIndex) {
                var grid = gridView.up('grid');
                var rec = grid.getStore().getAt(rowIndex);
                grid.deleteExpertFile(rec);
            }
        }]
    }],

    tbar: [{
        xtype: 'button',
        iconCls: 'add',
        text: 'Добавить',
        listeners: {
            click: function() {
                var grid = this.up('grid');
                grid.addExpertFile(grid);
            }
        }
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        listeners: {
            click: function() {
                this.up('grid').store.load();
            }
        }
    }],

    initComponent: function() {

        if (Ext.isEmpty(this.data)) {
            this.hidden = true;
            this.callParent(arguments);
            return;
        }

        if (!Ext.isEmpty(this.getExpertDocsURL)) {
            this.store = Ext.create('Ext.data.Store', {

                fields: [
                    'id',
                    'file_id',
                    'file_name'
                ],

                sorters: [{
                    property: 'file_name',
                    direction: 'DESC'
                }],

                proxy: {
                    extraParams: {
                        expert_id: this.data.id
                    },
                    type: 'ajax',
                    url: this.getExpertDocsURL,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            });

            this.store.load();
        }

        this.callParent(arguments);
    },

    addExpertFile: function(grid) {

        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            singleUpload: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.addExpertDocURL,
            uploadParams: {
                expert_id: grid.data.id
            },
            listeners: {
                'uploadcomplete': {
                    fn: function(upDialog, manager, items, errorCount) {
                        if (!errorCount) {
                            upDialog.close();
                            grid.store.load();
                        }
                    },
                    scope: this
                },
                'close': {
                    fn: function (panel, eOpts ) {
                        grid.store.load();
                    },
                    scope: this
                }
            }
        });
    },

    deleteExpertFile: function(record) {

        Ext.MessageBox.confirm('Подтверждение', 'Удалить документ?', function(b) {

            if ('yes' === b) {
                Ext.Ajax.request({
                    params: record.data,
                    url: this.deleteExpertDocURL,
                    success: function(response, opts) {
                        var r = Ext.JSON.decode(response.responseText);

                        if (r.success === true) {
                            this.store.load();
                        } else {
                            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                        }

                    },
                    failure: function() {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);

    }

});