Ext.define('EC.PA.view.Messages', {
    
    extend: 'Ext.window.Window',

//    uses: ['xlib.CheckColumn'],
    
    title: 'Сообщения пользователя ' + xlib.Acl.Storage.getIdentity().name +
        ' (' + xlib.Acl.Storage.getIdentity().login + ') ',

    alias: 'widget.pa-messages-win',
    
    autoScroll: true,

    border: false,
    border: false,

    modal: true,

    tbar: [
        {
            xtype: 'button',
            iconCls: 'add',
            text: 'Написать',
            tooltip: 'Написать новое сообщение',
            action: 'add'
        }, '->', {
            xtype: 'button',
            iconCls: 'remove',
            text: 'Удалить',
            tooltip: 'Удалить выбранные сообщения',
            action: 'delete'
        }
    ],

    items: [
        {
            xtype: 'grid',
            itemId: 'mesGrid',
            width: 500,
            height: 300,
            hideHeaders: true,
            selType: 'rowmodel',
            selModel: {
                mode: 'MULTI'
            },
            store: 'EC.PA.store.Messages',
            cls: 'curUserMessagesGrid',
            viewConfig: {
                getRowClass: function(record, index, rowParams, store) {
                    return (record.get('read') === 0) ? 'curUserMessage_new' : '';
                }
            },
            columns: [
                {
                    xtype: 'checkcolumn',
                    width: 30,
                    dataIndex: 'checked'
                },
                {
                    xtype: 'templatecolumn',
//                    header: 'Наименование',
                    tpl: '<p><strong>{sender_name}</strong></p>' +
                        '<p>{message}</p>',
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    width: 100
                },
                {
                    xtype: 'actioncolumn',
                    align: 'left',
                    items: [
//                        {
//                            iconCls: 'x-btn icon-reply',
//                            icon: '/images/icons/reply.png',
//                            tooltip: 'Ответить',
//                            handler: function(grid, rowIndex, colIndex) {
////                                var rec = grid.getStore().getAt(rowIndex);
////                                alert("Edit " + rec.get('firstname'));
//                            }
//                        },
                        {
                            iconCls: 'x-btn icon',
                            icon: '/images/icons/delete.png',
                            tooltip: 'Удалить',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                this.up('#mesGrid').fireEvent('deleteRow',rec);
                            }

                        }
                    ],
                    width: 60
                }
            ]
        }
    ]
});