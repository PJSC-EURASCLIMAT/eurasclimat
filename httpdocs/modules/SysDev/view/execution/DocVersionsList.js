Ext.define('EC.SysDev.view.execution.DocVersionsList', {

    extend: 'Ext.window.Window',
    
    alias: 'widget.project-doc-versions-win',

    title: 'Версии документа',

    border: true,

    modal: true,

    messagesCount: 0,

    width: 500,

    height: 300,

    layout: 'fit',

    maximizable: true,

    closeAction: 'hide',

    tbar: [
        {
            xtype: 'button',
            iconCls: 'add',
            text: 'Добавить',
            tooltip: 'Добавить новую версию',
            action: 'add'
        },'->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }
    ],



    items: [
        {
            xtype: 'grid',
            itemId: 'docVersGrid',
            border:false,
//            hideHeaders: true,
            store: 'EC.SysDev.store.execution.DocVersionsStore',
            listeners: {
                cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
                    if (cellIndex === 1) {
                        this.fireEvent('download', record);
                    }
                },
                beforeload: function() {

                }
            },
            columns: [
//                {
//                    xtype: 'checkcolumn',
//                    width: 30,
//                    dataIndex: 'checked'
//                },
                {
                    text: '№',
                    dataIndex: 'id',
                    width: 30
                },
                {
                    xtype: 'templatecolumn',
                    header: 'Наименование',
                    tpl: '<a href="#">{file_name}</a>',
//                    dataIndex: 'file_name',
                    flex: 1
                },
                {
                    text: 'Дата загрузки',
                    xtype: 'datecolumn',
                    dataIndex: 'date_create',
                    format: 'd.m.Y H:i',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    align: 'left',
                    items: [
                        {
                            iconCls: 'x-btn icon',
                            icon: '/images/icons/delete.png',
                            tooltip: 'Удалить',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                this.up('#docVersGrid').fireEvent('delete',rec);
                            }

                        }
                    ],
                    width: 30
                }
            ]
        }
    ]
//
//    layout: 'fit',
//
//    forceFit: true,
//
//    border: false,
//
//    store: {
//        type: 'project-doc-store'
//    },
//
//    listeners: {
//        cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
//            if (cellIndex === 0) {
//                this.fireEvent('download', record);
//            }
//        }
//    },
//
//    columns: [{
//        xtype: 'templatecolumn',
//        cls: 'download-link',
//        header: 'Наименование',
//        tpl: '<a href="#">{name}</a>'
//    }, {
//        header: 'Автор',
//        dataIndex: 'author'
//    }, {
//        xtype: 'datecolumn',
//        header: 'Дата создания',
//        format: 'd.m.Y H:i',
//        dataIndex: 'date_create'
//    }, {
//        header: 'project_id',
//        dataIndex: 'project_id',
//        hidden: true
//    }, {
//        xtype:'actioncolumn',
//        hidden: !acl.isUpdate('sysdev', 'docs'),
//        width: 20,
//        items: [
//            {
//                icon: '/images/icons/fam/grid.png',
//                tooltip: 'Версии документа',
//                iconCls: 'x-btn',
//                handler: function(grid, rowIndex, colIndex) {
//                    this.up('panel').fireEvent('open-versions', grid.getStore().getAt(rowIndex));
//                }
//            },
//            {
//                icon: '/images/icons/fam/delete.gif',
//                tooltip: 'Удалить',
//                iconCls: 'x-btn',
//                handler: function(grid, rowIndex, colIndex) {
//                    this.up('panel').fireEvent('deleteitem', grid.getStore().getAt(rowIndex));
//                }
//            }
//        ]
//    }],
//
//    tbar: [{
//        text: 'Добавить',
//        iconCls: 'add',
//        action: 'add',
//        hidden: !acl.isUpdate('sysdev', 'docs'),
//        scope: this
//    }, '->', {
//        xtype: 'button',
//        tooltip: 'Обновить',
//        iconCls: 'x-tbar-loading',
//        action: 'refresh'
//    }]

});