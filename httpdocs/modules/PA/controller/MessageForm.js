Ext.define('EC.PA.controller.MessageForm', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.PA.view.MessageEditor'],

    messageEditor: null,

    sendURL: '/json/pa/messages/add',

    successFn: null,

    refs: [{
        ref: 'mesEditor',
        selector: 'pa-message-editor'
    }],

    init: function() {
        this.callParent();
        this.account = xlib.Acl.Storage.getIdentity();
    },

    run: function(container, data, successFn) {

        if (!Ext.isDefined(container)) {
            return;
        }

        if (Ext.isFunction(successFn)) {
            this.successFn = successFn;
        } else {
            this.successFn = null;
        }

        this.form = Ext.create('EC.PA.view.MessageEditor', {data: data});
        this.form.down('[action=send]').on('click', this.sendMessage, this);
        this.form.down('[action=cancel]').on('click', this.closeMessageEditor, this);

        container.add(this.form);

    },

    runSuccessFn: function() {
        if(this.successFn === null) {
            return;
        }
        this.successFn();
    },


    closeMessageEditor: function() {
        this.getMesEditor().up('window').close();
    },

    sendMessage: function() {
        
        var editor = this.getMesEditor(),
            values = editor.getValues(),
            mask = new Ext.LoadMask(editor, { msg: "Отправка..." });
            
        mask.show();
        
        Ext.Ajax.request({
            params: values,
            url: this.sendURL,
            waitMsg: 'Отправка',
            success: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'Сообщение успешно отправлено!');
                mask.hide();
                this.getMesEditor().up('window').close();
                this.runSuccessFn();
//                this.getMesGrid().getStore().load();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Сообщение не отправлено!');
                mask.hide();
            },
            scope: this
        });
    }

});