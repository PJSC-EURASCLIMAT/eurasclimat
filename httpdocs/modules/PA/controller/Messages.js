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
    markAsReadURL:  '/json/pa/messages/mark-as-read',

    expandedMessages: [],

    newMessagesCount: null,

    viewerWindow: null,

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
                rowExpanded: this.onMessagesRowExpand,
                scope: this
            },

            'pa-message-editor [action=send]': {
                click: this.sendMessage,
                scope: this
            },

            'pa-message-editor [action=cancel]': {
                click: this.closeMessageEditor,
                scope: this
            }
        });
        //Русские даты

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

    onMessagesRowExpand: function(record) {
        if(record.get('readed') === 1)
            return;

        var task = new Ext.util.DelayedTask(function(record){
            if (record.get('expanded')) {
                this.markAsRead(record.getId());
            }
        },this,[record]);

        task.delay(3000);
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
                    this.mesStore.load();
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

    ,onMessageDelete: function(id) {

        var params = null;
        var records = id;

        if (Ext.isArray(id)) {
            params = [];
            Ext.each(id,function(item){
                params.push(item.getId());
            },this);
            params = Ext.JSON.encode(params);
        } else {
            params = id.getId();
        }

        Ext.MessageBox.confirm('Подтверждение', 'Удалить сообщение?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: params
                    },
                    extraParams:{
                        records: id
                    },
                    url: this.delURL,
                    success: function(response, opts) {
                        this.getMesGrid().getStore().remove(opts.extraParams.records);
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
                this.getMesEditor().up('window').close();
                this.getMesGrid().getStore().load();
                Ext.Msg.alert('Сообщение', 'Сообщение успешно отправлено!');
            },
            failure: function(response, opts) {
                this.getMesEditor().up('window').close();
                Ext.Msg.alert('Ошибка', 'Сообщение не отправлено!');
            },
            scope: this
        });

    }

    ,showMessageEditor: function() {

        var accountsStore = null;

        if(!Ext.isDefined(Ext.StoreManager.lookup("AccountsNames"))){
            accountsStore = Ext.create('EC.PA.store.Accounts');
            accountsStore.load();
        } else {
            accountsStore = Ext.StoreManager.lookup("AccountsNames")
        }

        var mesEdWin = Ext.create("Ext.window.Window", {
            title: 'Новое сообщение',
            modal: true,

            width: 350,
//            height: 300,
            items: [
                {
                    xtype: 'pa-message-editor'
                }
            ]
        });

        mesEdWin.messagesCount = this.mesStore.data.length;
        mesEdWin.down("combo").store = accountsStore;

        mesEdWin.show();
    }

});