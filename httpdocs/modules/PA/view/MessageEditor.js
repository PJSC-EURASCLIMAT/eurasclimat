Ext.define('EC.PA.view.MessageEditor', {
    
    extend: 'Ext.form.Panel',

    alias: 'widget.pa-message-editor',

    autoScroll: true,

    layout: 'form',

    bodyPadding: 5,

    requires: ['EC.PA.store.Accounts'],

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

    items: [
        {
            xtype: 'combo',
            store: Ext.create('EC.PA.store.Accounts',{autoLoad: true}),
            displayField: 'name',
            queryMode: 'local',
            valueField: 'id',
            fieldLabel: 'Кому',
            name: 'receiver_id',
            pageSize: 25,
            allowBlank:false
        },
        {
            xtype: 'textfield',
            name: 'subject',
            fieldLabel: 'Тема',
            allowBlank:true
        },

        {
            xtype: 'textarea',
            fieldLabel: 'Сообщение',
            name: 'message',
            allowBlank:false
        }
    ]
});