Ext.define('EC.PA.controller.Messages', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.PA.view.Messages',
        'EC.PA.view.MessageEditor'
    ],

//    models: ['EC.PA.model.Message'],

    stores: ['EC.PA.store.Messages'],

    messageEditor: null,

    sendURL: '/json/pa/messages/add',
    delURL: '/json/pa/messages/delete',

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
            ref: 'mesGrid',
            selector: 'pa-messages-win #mesGrid'
        },

        {
            ref: 'mesEditor',
            selector: 'pa-message-editor'
        }
    ],

    init:function(){
        this.account = xlib.Acl.Storage.getIdentity();
        this.callParent();
        this.mesStore = Ext.StoreManager.lookup('EC.PA.store.Messages');
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

            'pa-messages-win #mesGrid': {
                deleteRow: this.onMessageDelete,
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
                this.getMesEditor().up('window').remove();
                Ext.Msg.alert('Сообщение', 'Сообщение успешно отправлено!');
            },
            failure: function(response, opts) {
                this.getMesEditor().up('window').remove();
                Ext.Msg.alert('Ошибка', 'Сообщение не отправлено!');
            },
            scope: this
        });

    }

    ,sendMessageSuccess: function(response) {
        var r = Ext.JSON.decode(response);
        this.getMesGrid().store.add(r.data);
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