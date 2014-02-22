Ext.define('EC.PA.view.Messages', {
    
    extend: 'Ext.window.Window',

    title: 'Мои сообщения',

    alias: 'widget.pa-messages-win',

    uses: ['xlib.CheckColumn'],
    
    border: true,

    modal: true,

    messagesCount: 0,

    width: 800,

    height: 400,

//    layout: {
//        type: 'hbox',
//        align: 'stretch'
//    },
    
    layout: 'border',
    
    maximizable: true,
    
    closeAction: 'hide',

    requires: 'EC.PA.store.MessagesTypes',
    
    tbar: [{
        xtype: 'button',
        iconCls: 'add',
        text: 'Написать',
        tooltip: 'Написать новое сообщение',
        action: 'add'
    }, {
        xtype: 'button',
        text: 'Действия',
        menu: [{
            text: 'Выбрать все',
            action: 'checkAll'
        }, {
            text: 'Снять выделения',
            action: 'uncheckAll'
        }, {
            text: 'Отметить выбранные как прочитанные',
            action: 'setReaded'
        }, {
            text: 'Удалить выбранные',
            action: 'delete',
            itemId: 'deleteChecked'
        }]
    },'->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }],

    initComponent: function() {
        
        var store = Ext.create('EC.PA.store.MessagesTypes');

        this.items = [{
            region: 'west',
            collapsible: true,
            split: true,
            header: false,
            xtype: 'treepanel',
            itemId: 'mesFilterTree',
            store: store,
            animate: false,
            useArrows: true,
            rootVisible: false,
            width: 200
        }, {
            region: 'center',
            layout: 'border',
            items: [{
                region: 'center',
                hideHeaders: true,
                split: true,
                height: 150,
                xtype: 'grid',
                itemId: 'mesGrid',
                store: 'EC.PA.store.Messages',
                cls: 'curUserMessagesGrid',
                viewConfig: {
                    preserveScrollOnRefresh: true
                },
                columns: [{
                    xtype: 'checkcolumn',
                    width: 30,
                    dataIndex: 'checked',
                    listeners: {
                        checkchange: function( grid, rowIndex, checked, eOpts ) {
                            this.up('panel').fireEvent('activechange', rowIndex, checked);
                        }
                    }
                }, {
                    xtype: 'templatecolumn',
                    // itemId: 'content-col',
                    // tdCls: 'content-td',
                    flex: 1,
                    tpl: new Ext.XTemplate(
                        '<strong style="{[this.getSenderStyle(values)]}">{[this.getSender(values)]}</strong>' +
                            // '<p style="margin: 0; {[this.getEllipsisStyle(values)]}">{[this.getMessage(values)]}</p>' +
                            '</br><span style="{[this.getSenderStyle(values)]}">{subject}</span>',
                            // '<small>{date:date("h:i:s d F Y")}</small>',
                        {
                            getSender: function(values) {
                                if(Ext.isEmpty(values.sender_name)) {
                                    return 'Администрация';
                                }
                                return values.sender_name;
                            },
    
                            getMessage: function(values){
                                var mes = values.message;
                                if (!values.expanded) {
                                    mes = Ext.util.Format.stripTags(mes);
                                    mes = Ext.String.ellipsis(mes,30);
                                    return mes;
                                }
                                return '';
                            },
    
                            getSenderStyle: function(values) {
                                if (values.readed) {
                                    return 'color:gray;';
                                }
                            },
    
                            getEllipsisStyle: function(values) {
                                if (values.readed) {
                                    return 'color:#686868;';
                                }
                            }
                    })
                }, {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    format:'d.m.Y',
                    width: 70
                }, {
                    xtype: 'actioncolumn',
                    align: 'left',
                    items: [{
                        iconCls: 'x-btn icon',
                        icon: '/images/icons/delete.png',
                        tooltip: 'Удалить',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            this.up('#mesGrid').fireEvent('deleteRow',rec);
                        }
    
                    }],
                    width: 30
                }]
            }, {
                region: 'south',
                collapsible: true,
                split: true,
                header: false,
                flex: 1,
                xtype: 'panel',
                itemId: 'mesDetail',
                bodyStyle: {padding: '10px'},
                tbar: [{
                   text: 'Ответить',
                   itemId: 'respondBtn',
                   handler: function(){this.up('#mesDetail').fireEvent('respond')}
                }, {
                    text: 'Ответить c цитированием',
                    itemId: 'respondWithCitBtn',
                    handler: function(){this.up('#mesDetail').fireEvent('respondWithCit')}
                }, {
                    text: 'Переслать',
                    itemId: 'forwardBtn',
                    handler: function(){this.up('#mesDetail').fireEvent('forward')}
                }, {
                    text: 'Удалить',
                    itemId: 'delBtn',
                    handler: function(){this.up('#mesDetail').fireEvent('delete')}
                }],
                tpl: Ext.create('Ext.XTemplate',
                    '<strong>Тема: </strong>{subject}<br/>',
                    '<p><strong>От: </strong>{[this.getName(values.sender_name)]}</p>',
                    '<p><strong>Кому: </strong>{[this.getName(values.receiver_name)]}</p>',
                    '{message}', {
                    getName: function(name) {
                        if (Ext.isEmpty(name)) {
                            return 'Администрация';
                        }
                        return name;
                    }
                })
            }]
        }];

        this.callParent();
    },

    setTitleCount: function(num) {
        
        this.messagesCount = num;
        var str = (num === 0) ? '' : ' (' + num + ' непрочитанных сообщения)';
        this.setTitle('Мои сообщения' + str);
    }
});