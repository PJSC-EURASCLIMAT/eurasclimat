Ext.define('EC.PA.controller.Messages', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.PA.view.Messages',
        'EC.PA.view.MessageEditor',
        'App.view.TopPanel'
    ],

    stores: ['EC.PA.store.Messages'],

    messageEditor: null,

    sendURL:        '/json/pa/messages/add',
    unreadMesURL:   '/json/pa/messages/unread-count',
    delURL:         '/json/pa/messages/delete',
    trashURL:         '/json/pa/messages/trash',
    untrashURL:         '/json/pa/messages/untrash',
    markAsReadURL:  '/json/pa/messages/mark-as-read',

    inBoxURL: '/json/pa/messages/get-list',
    sentBoxURL: '/json/pa/messages/get-sent-list',
    delBoxURL: '/json/pa/messages/get-deleted-list',

    expandedMessages: [],

    newMessagesCount: null,

    viewerWindow: null,

    fitlerParams: [],

//    URL: '/json/pa/profile/get-profile',
//    updateURL: '/json/pa/profile/update-profile',
//    changePassURL: '/json/pa/profile/change-password',

    refs: [
        {
            ref: 'mesWin',
            selector: 'pa-messages-win'
        },
        {
            ref: 'mesGrid',
            selector: 'pa-messages-win #mesGrid'
        },
        {
            ref: 'mesDetail',
            selector: 'pa-messages-win #mesDetail'
        },
        {
            ref: 'mesEditor',
            selector: 'pa-message-editor'
        },
        {
            ref: 'mesTopPanelButton',
            selector: 'TopPanel top-panel-msg-button'
        }
    ],

    init: function() {
        this.callParent();

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

            'pa-message-editor [action=send]': {
                click: this.sendMessage,
                scope: this
            },

            'pa-message-editor [action=cancel]': {
                click: this.closeMessageEditor,
                scope: this
            },

            'pa-messages-win #mesDetail': {
                respond: this.onDetailRespond,
                respondWithCit: this.onDetailRespondWithCit,
                forward: this.onDetailForward,
                delete: this.onDetailDelete
            }
        });

        this.mesStore.on('load',this.onMessagesStoreLoad,this);

            //Создаем окошко профиля
            this.viewerWindow = Ext.create('EC.PA.view.Messages',{
                messagesCount: this.newMessagesCount
            }).show();

        } else {
            this.viewerWindow.show();
        }

        this.mesStore.load();
    },

    onDetailRespond: function() {
        var record = this.getMesDetail().record;
        var editorWin = this.showMessageEditor();
        editorWin.down('[name=receiver_id]').setValue(record.get('sender_id'));
        console.log('onDetailRespond');
    },

    onDetailRespondWithCit: function() {
        var record = this.getMesDetail().record;

        var editorWin = this.showMessageEditor();
        editorWin.down('[name=receiver_id]').setValue(record.get('sender_id'));

        var message = '\n---- Пересылаемое сообщение ----\n' +
            'От: ' + record.get('sender_name') + '\n' +
            'Кому: ' + record.get('receiver_name') + '\n' +
            'Тема: ' + record.get('subject') + '\n' + record.get('message');

        editorWin.down('[name=message]').setValue(message);
        editorWin.down('[name=subject]').setValue('Re: ' + record.get('subject'));
    },

    onDetailForward: function() {
        var record = this.getMesDetail().record;

        var editorWin = this.showMessageEditor();
        var message = '\n---- Пересылаемое сообщение ----\n' +
            'От: ' + record.get('sender_name') + '\n' +
            'Кому: ' + record.get('receiver_name') + '\n' +
            'Тема: ' + record.get('subject') + '\n' + record.get('message');

        editorWin.down('[name=message]').setValue(message);
        editorWin.down('[name=subject]').setValue('Fwd: ' + record.get('subject'));
    },

    onDetailDelete: function() {
        var me = this;
        var record = this.getMesDetail().record;
        this.onMessageDelete([record],function(){
            me.getMesDetail().hide();
        });


        console.log('onDetailDelete');
    },

    onFilterTreeSelect: function( tree, record, index, eOpts ) {
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

        if(record.get('readed') === 1)
            return;

        var task = new Ext.util.DelayedTask(function(record){
            var curSelRecord = this.getMesGrid().getSelectionModel().getLastSelected();

            if  (this.selectedRecord === curSelRecord ) {
                this.markAsRead(record.getId());
            }

        },this,[record]);

        task.delay(3000);
    },


    onMessageSelect: function( mesGrid, record, index, eOpts ) {
        this.checkReadedDelay(record);
        var detail = this.getMesDetail();
        detail.record = record;
        detail.show();
        detail.tpl.overwrite(detail.body,record.data)
    },

    checkAllMessages: function() {
        this.mesStore.each(function(item){
           item.set('checked',1);
        });
    },

    uncheckAllMessages: function() {
        this.mesStore.each(function(item){
            item.set('checked',0);
        });
    },

    setAllMessagesReaded: function() {
        var selMesIds = [];
        this.mesStore.each(function(item){
            if(item.get('checked') === 1)
                selMesIds.push(item.getId());
        },this);

        if (selMesIds.length === 0) {
            return;
        }

        this.markAsRead(selMesIds);
    },

    onMessagesStoreLoad: function() {
        this.getNewMessagesCount();
    },

    listenUserMessages: function() {
        this.unreadRunner.start({
            run: this.getNewMessagesCount
            ,interval: 30000
            ,scope: this
        });
        this.getNewMessagesCount();
    },

    updateTopMesButtonCount: function(count) {
        this.getMesTopPanelButton().updateCount(count)
    },

    udpateMesWinTitleCount: function() {
        var win = this.getMesWin();
        if(Ext.isDefined(win)) {
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

        Ext.Ajax.request({
            params: {
                id: Ext.JSON.encode(selIds)
            },
            url: this.markAsReadURL,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);
                var mesId = response.request.options.params.id;
                if (r.success) {
                    this.selectedRecord.set('readed',1);
                    this.selectedRecord = null;
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

    }



    ,refreshMessages: function() {
        this.mesStore.load();
    }

    ,onSelectedMessagesDelete: function() {

        var ids = [];
        this.getMesGrid().getStore().each(function(item){

            if(item.get('checked') === 1) {
                ids.push(item);
            }

        });

        if(ids.length === 0) {
            return;
        }

        this.onMessageDelete(ids);
    }

    ,onMessageDelete: function(records, successCallback) {

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
            Ext.each(records,function(item){
                params.push(item.getId());
            },this);
            params = Ext.JSON.encode(params);
        } else {
            params = records.getId();
        }

        Ext.MessageBox.confirm('Подтверждение', map[deleted].message, function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: params
                    },
                    extraParams:{
                        records: records
                    },
                    url: map[deleted].url,
                    success: function(response, opts) {
                        this.getMesGrid().getStore().remove(opts.extraParams.records);
                        if(Ext.isDefined(successCallback)){
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

    }

    ,closeMessageEditor: function() {
        this.getMesEditor().up('window').close();
    }

    ,sendMessage: function() {
        var editor = this.getMesEditor();
        var values = editor.getValues();

        Ext.Ajax.request({
            params: values,
            url: this.sendURL,
            success: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'Сообщение успешно отправлено!');
                this.getMesEditor().up('window').close();
                this.getMesGrid().getStore().load();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Сообщение не отправлено!');
                this.getMesEditor().up('window').close();
            },
            scope: this
        });

    }

    ,showMessageEditor: function() {

        var mesEdWin = Ext.create("Ext.window.Window", {
            title: 'Новое сообщение',
            modal: true,
            width: 350,
            items: [{
                xtype: 'pa-message-editor'
            }]
        });

        mesEdWin.show();

        return mesEdWin;
    }

});