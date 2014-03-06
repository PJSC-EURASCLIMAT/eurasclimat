Ext.define('EC.PA.view.MessageEditor', {

    extend: 'Ext.form.Panel',

    alias: 'widget.pa-message-editor',

    autoScroll: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    border: false,

    bodyPadding: 5,

    requires: [
        'xlib.AccountsRef'
    ],

    bbar: [
        {
            xtype: 'button',
            formBind: true,
            text: 'Отправить',
            disabled: true,
            action: 'send'
        }, '->', {
            xtype: 'button',
            text: 'Отмена',
            action: 'cancel'
        }
    ],

    initComponent: function() {
        var d = this.data,
            receiver_id,
            subject,
            message;

        if ( !Ext.isEmpty(d) ) {
            receiver_id =   ( !Ext.isEmpty(d.receiver_id) ) ? d.receiver_id : null;
            subject =       ( !Ext.isEmpty(d.subject) ) ? d.subject : null;
            message =       ( !Ext.isEmpty(d.message) ) ? d.message : null;
        }

        this.items = [{
            xtype: 'accounts-ref',
            name: 'receiver_id',
            value: receiver_id
        }, {
            xtype: 'textfield',
            name: 'subject',
            fieldLabel: 'Тема',
            allowBlank: true,
            value: subject
        }, {
            xtype: 'textarea',
            fieldLabel: 'Сообщение',
            name: 'message',
            allowBlank: false,
            value: message,
            flex: 1
        }];

        this.callParent(arguments);
    }

});