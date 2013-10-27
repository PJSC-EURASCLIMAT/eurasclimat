Ext.define('EC.PA.controller.Messages', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.PA.view.Messages',
        'EC.PA.view.MessageEditor',
        'App.view.TopPanel'
    ],

//    models: ['EC.PA.model.Message'],

    stores: ['EC.PA.store.Messages'],

    messageEditor: null,

    sendURL:        '/json/pa/messages/add',
    unreadMesURL:   '/json/pa/messages/unread-count',
    delURL:         '/json/pa/messages/delete',
    markAsReadURL:  '/json/pa/messages/mark-as-read',

    expandedMessages: [],

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

    init:function(){
        this.callParent();

        this.account = xlib.Acl.Storage.getIdentity();
        this.mesStore = Ext.StoreManager.lookup('EC.PA.store.Messages');
        this.unreadRunner = new Ext.util.TaskRunner();
    },

    listenUserMessages: function() {
        this.unreadRunner.start({
            run: this.getNewMessagesCount
            ,interval: 3000
            ,scope: this
        });
    },

    updateTopMesButtonCount: function(count) {
        this.getMesTopPanelButton().updateCount(count)
    },

    getNewMessagesCount: function () {
        console.log("DELAYED TASK ");
        Ext.Ajax.request({
            params: {
               id : this.account.id
            },
            url: this.unreadMesURL,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);
                this.updateTopMesButtonCount(r.data);
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
                this.markAsRead(record);
            }
        },this,[record]);

        task.delay(3000);
    },

    markAsRead: function(record) {
        console.log("MARKING AD READ");
        console.log(record);

        Ext.Ajax.request({
            params: {
                id: record.getId()
            },
            url: this.markAsReadURL,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);
                var mesId = response.request.options.params.id;
                if (r.success) {
                    this.mesStore.getById(mesId).set('readed',1);
                }
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось пометить сообщение как прочитанное!');
            },
            scope: this
        });

    },


    run: function(container) {

        console.log("TEST");

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



        this.mesStore.load();

        //Создаем окошко профиля
        Ext.create('EC.PA.view.Messages').show();

//        this.getProfileWin().hide();


    }

    ,refreshMessages: function() {
        this.mesStore.load();
    }

    ,onSelectedMessagesDelete: function() {

        var ids = [];
        this.getMesGrid().getStore().each(function(item){

            if(item.get('checked') === true) {
                ids.push(item);
            }

        });

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

        mesEdWin.down("combo").store = accountsStore;

//        mesEdWin.add(Ext.create('EC.PA.view.MessagesEditor'))
        mesEdWin.show();
    }

});