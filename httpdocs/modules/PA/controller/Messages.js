Ext.define('EC.PA.controller.Messages', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.PA.view.Messages',
        'App.view.TopPanel'
    ],

    stores: ['EC.PA.store.Messages'],

    unreadMesURL:   '/json/pa/messages/unread-count',
    delURL:         '/json/pa/messages/delete',
    trashURL:       '/json/pa/messages/trash',
    untrashURL:     '/json/pa/messages/untrash',
    markAsReadURL:  '/json/pa/messages/mark-as-read',

    inBoxURL:   '/json/pa/messages/get-list',
    sentBoxURL: '/json/pa/messages/get-sent-list',
    delBoxURL:  '/json/pa/messages/get-deleted-list',

    newMessagesCount: null,

    viewerWindow: null,

    refs: [{
        ref: 'mesWin',
        selector: 'pa-messages-win'
    }, {
        ref: 'mesGrid',
        selector: 'pa-messages-win #mesGrid'
    }, {
        ref: 'mesDetail',
        selector: 'pa-messages-win #mesDetail'
    }, {
        ref: 'mesTopPanelButton',
        selector: 'TopPanel top-panel-msg-button'
    }],

    init: function() {
        
        this.callParent();

        this.editFormController = this.getController('EC.PA.controller.MessageForm');

        this.account = xlib.Acl.Storage.getIdentity();
        this.mesStore = Ext.StoreManager.lookup('EC.PA.store.Messages');
        this.unreadRunner = new Ext.util.TaskRunner();
    },

    run: function(container) {

        if (!this.viewerWindow) {

        this.control({
            'pa-messages-win [action=add]': {
                click: this.showMessageEditor,
                scope: this
            },

            'pa-messages-win [action=delete]': {
                click: this.onSelectedMessagesDelete,
                scope: this
            },

            'pa-messages-win [action=refresh]': {
                click: this.refreshMessages,
                scope: this
            },

            'pa-messages-win [action=checkAll]': {
                click: this.checkAllMessages,
                scope: this
            },

            'pa-messages-win [action=uncheckAll]': {
                click: this.uncheckAllMessages,
                scope: this
            },

            'pa-messages-win [action=setReaded]': {
                click: this.setAllMessagesReaded,
                scope: this
            },

            'pa-messages-win [action=contacts]': {
                click: this.onContacts,
                scope: this
            },

            'pa-messages-win #mesGrid': {
                deleteRow: this.onMessageDelete,
                select: this.onMessageSelect,
                rowExpanded: this.onMessagesRowExpand,
                scope: this
            },

            'pa-messages-win #mesFilterTree': {
                select: this.onFilterTreeSelect,
                scope: this
            },

            'pa-messages-win #mesDetail': {
                respond: this.onDetailRespond,
                respondWithCit: this.onDetailRespondWithCit,
                forward: this.onDetailForward,
                'delete': this.onDetailDelete,
                scope: this
            }
        });

        this.mesStore.on('load', this.onMessagesStoreLoad, this);

            // Создаем окошко
            this.viewerWindow = Ext.create('EC.PA.view.Messages', {
                messagesCount: this.newMessagesCount
            }).show();

        } else {
            this.viewerWindow.show();
        }

        this.mesStore.load();
    },

    onContacts: function() {
        if( !Ext.isEmpty(this.contactsWin) ) {
            this.contactsWin.show();
        }

        this.contactsWin = Ext.create('Ext.window.Window', {
            title: 'Адресная книга',
            width: 500,
            height: 400,
            layout: 'fit',
            tbar: [{
                text: 'Добавить в контакты',
                iconCls: 'add',
                handler: this.onContactsAdd
            },{
                text: 'Удалить из контактов',
                iconCls: 'remove',
                handler: this.onContactsDel
            }, '->', {
                xtype: 'button',
                tooltip: 'Обновить',
                iconCls: 'x-tbar-loading',
                scope: this,
                handler: function() {
                    this.contactsWin.down('grid').getStore().load();
//                    this.up('panel').down('grid').getStore().load();
                }
            }],
            items: [{
                xtype: 'grid',
                uses: ['xlib.CheckColumn'],
                hideHeaders: true,
                features: [{
                    ftype:'grouping',
                    groupHeaderTpl: '{name}'
                }],
                columns: [
                    {
                        xtype: 'checkcolumn',
                        width: 30,
                        dataIndex: 'checked',
                        listeners: {
                            checkchange:  function( grid, rowIndex, checked, eOpts ) {
                                grid.fireEvent('activechange', rowIndex, checked);
                            },
                            scope: this
                        }
                    },
                    {
                        text: 'name',
                        dataIndex: 'name',
                        flex: 1
                    }
                ],
                store: {
                    fields: [{name: 'id', type: 'number'}, 'name', 'group'],
                    groupers: [{property: 'group', direction: 'DESC'}],
                    sorters: [{property: 'name', direction: 'ASC'}],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        api: {
                            read:   '/json/pa/info/get-contacts'
                        },
                        reader: {
                            type: 'json',
                            root: 'data',
                            successProperty: 'success'
                        }
                    }
                }
            }]
        });

        this.contactsWin.show();

    },

    onDetailRespond: function() {
        var record = this.getMesDetail().record,
            data = {};
        if (!Ext.isObject(record)) return;

        data.receiver_id = record.get('sender_id');
        this.showMessageEditor(data);
    },

    onDetailRespondWithCit: function() {
        var record = this.getMesDetail().record,
            data = {};

        if (!Ext.isObject(record)) return;

        data.receiver_id = record.get('sender_id');
        data.subject = record.get('subject');
        data.message = '\n\r---- Пересылаемое сообщение ----\n\r' +
            'От: ' + record.get('sender_name') + '\n\r' +
            'Кому: ' + record.get('receiver_name') + '\n\r' +
            'Тема: ' + record.get('subject') + '\n\r' + record.get('message');

        this.showMessageEditor(data);
    },

    onDetailForward: function() {
        var record = this.getMesDetail().record,
            data = {};

        if (!Ext.isObject(record)) return;

        data.receiver_id = record.get('sender_id');
        data.subject = 'Fwd: ' + record.get('subject');
        data.message = '\n\r---- Пересылаемое сообщение ----\n\r' +
            'От: ' + record.get('sender_name') + '\n\r' +
            'Кому: ' + record.get('receiver_name') + '\n\r' +
            'Тема: ' + record.get('subject') + '\n\r' + record.get('message');

        this.showMessageEditor(data);
    },

    onDetailDelete: function() {
        var record = this.getMesDetail().record;
        this.onMessageDelete([record]);
    },

    onFilterTreeSelect: function(tree, record, index, eOpts) {
        
        var type = record.get('type'),
            box = record.get('box'),
            arr = [],
            boxField,
            boxValue;

        // Тип самого мессаджа
        if ( type !== 0 ) {
            arr.push({
                field: 'type',
                type: 'numeric',
                comparison: 'eq',
                value: type
            });
        }

        // Тип ящика - входящие, исходящие, удаленные
        switch(box) {
            case 'in':
                this.getMesGrid().store.proxy.url = this.inBoxURL;
                break;
            case 'out':
                this.getMesGrid().store.proxy.url = this.sentBoxURL;
                break;
            case 'deleted':
                this.getMesGrid().store.proxy.url = this.delBoxURL;
                break;
        }


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

        this.getMesGrid().store.proxy.extraParams.filter = Ext.JSON.encode(arr);

        this.getMesGrid().store.load();
    },

    checkReadedDelay: function (record) {
        
        this.selectedRecord = record;

        if (record.get('readed') === 1)
            return;

        var task = new Ext.util.DelayedTask(function(record) {
            var curSelRecord = this.getMesGrid().getSelectionModel().getLastSelected();

            if  (this.selectedRecord === curSelRecord ) {
                this.markAsRead(record.getId());
            }

        }, this, [record]);

        task.delay(3000);
    },


    onMessageSelect: function(mesGrid, record, index, eOpts) {
        var detail = this.getMesDetail();
        detail.record = record;

        var data = Ext.clone(record.data);
        data.message = data.message.replace(/\r\n|\n/g, '<br/>');

        this.checkReadedDelay(record);
        detail.tpl.overwrite(detail.body, data);
    },

    checkAllMessages: function() {
        
        this.mesStore.each(function(item) {
           item.set('checked', 1);
        });
    },

    uncheckAllMessages: function() {
        
        this.mesStore.each(function(item) {
            item.set('checked', 0);
        });
    },

    setAllMessagesReaded: function() {
        
        var selMesIds = [];
        this.mesStore.each(function(item) {
            if (item.get('checked') === 1) {
                selMesIds.push(item.getId());
            }
        }, this);

        if (selMesIds.length === 0) {
            return;
        }

        this.markAsRead(selMesIds);
    },

    onMessagesStoreLoad: function() {
        
        this.clearDetailPanel();
        this.getNewMessagesCount();
    },

    listenUserMessages: function() {
        
        this.unreadRunner.start({
            run: this.getNewMessagesCount(),
            interval: 30000,
            scope: this
        });
        this.getNewMessagesCount();
    },

    updateTopMesButtonCount: function(count) {
        this.getMesTopPanelButton().updateCount(count);
    },

    udpateMesWinTitleCount: function() {
        
        var win = this.getMesWin();
        if (Ext.isDefined(win)) {
            win.setTitleCount(this.newMessagesCount);
        }
    },

    getNewMessagesCount: function() {
        
        Ext.Ajax.request({
            params: {
               id : this.account.id
            },
            url: this.unreadMesURL,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);
                this.newMessagesCount = r.data;
                this.updateTopMesButtonCount(r.data);
                this.udpateMesWinTitleCount();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось получить сообщения!');
            },
            scope: this
        });
    },

    markAsRead: function(selIds) {
        var params = (Ext.isArray(selIds)) ? selIds.join(',') : selIds;

        Ext.Ajax.request({
            params: {
                id: params
            },
            url: this.markAsReadURL,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);
                if (r.success) {
                    var mesIds = response.request.options.params.id;
                    mesIds = (Ext.isString(mesIds)) ? mesIds.split(',') : Ext.Array.from(mesIds);

                    for (var i = 0; i < mesIds.length; i++) {
                        var id = mesIds[i];
                        var rec = this.mesStore.getById(parseInt(id));
                        rec.set('readed', 1);
                        rec.set('checked', 0);
                    }
//                    this.selectedRecord = null;
//                    this.mesStore.load();
                    this.getNewMessagesCount();
//                    this.newMessagesCount--;
//                    this.updateTopMesButtonCount(this.newMessagesCount);
//                    this.udpateMesWinTitleCount(this.newMessagesCount);
                }
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось пометить сообщение как прочитанное!');
            },
            scope: this
        });

    },

    refreshMessages: function() {
        this.mesStore.load();
    },

    onSelectedMessagesDelete: function() {

        var ids = [];
        this.getMesGrid().getStore().each(function(item) {

            if(item.get('checked') === 1) {
                ids.push(item);
            }

        });

        if(ids.length === 0) {
            return;
        }

        this.onMessageDelete(ids);
    },

    onMessageDelete: function(records, successCallback) {

        if (!Ext.isObject(records[0])) return;
        
        var params = null,
            deleted = records[0].get('deleted'),
            map = {
                0 : {
                    message: 'Переместить в корзину?',
                    url: this.trashURL
                },
                1 : {
                    message: 'Удалить навсегда?',
                    url: this.delURL
                }
            };

        if (Ext.isArray(records)) {
            params = [];
            Ext.each(records,function(item) {
                params.push(item.getId());
            }, this);
            params = params.join(',');
        } else {
            params = records.getId();
        }

        Ext.MessageBox.confirm('Подтверждение', map[deleted].message, function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: params
                    },
                    extraParams: {
                        records: records
                    },
                    url: map[deleted].url,
                    success: function(response, opts) {
                        var mesStore = this.getMesGrid().getStore();
                        mesStore.remove(opts.extraParams.records);
                        mesStore.load();
                        this.clearDetailPanel();
                        if (Ext.isDefined(successCallback)){
                            successCallback();
                        }
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    },

    showMessageEditor: function(data) {
        var me = this;
        var mesEdWin = Ext.create("Ext.window.Window", {
            title: 'Новое сообщение',
            modal: true,
            layout: 'fit',
            width: 450,
            height: 300
        });

        this.editFormController.run(mesEdWin, data, function() {
            me.getMesGrid().getStore().load();
        });

        mesEdWin.show();
    },
    
    clearDetailPanel: function() {
       
        var panel = this.getMesDetail();
        panel.record = null;
        panel.body.update('');
    }
});