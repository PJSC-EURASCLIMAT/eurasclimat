Ext.define('EC.PA.view.MessageEditor', {
    
    extend: 'Ext.form.Panel',

    alias: 'widget.pa-message-editor',

    autoScroll: true,

    layout: 'form',

    bodyPadding: 5,

    bbar: [
        {
            xtype: 'button',
//            iconCls: 'add',
            text: 'Отправить',
            disabled: true,
            action: 'send'
        }, '->', {
            xtype: 'button',
//            iconCls: 'remove',
            text: 'Отмена',
            action: 'cancel'
        }
    ],

    items: [
        {
            xtype: 'combo',
//            store: Ext.StoreManager.lookup("AccountsNames"),
            displayField: 'name',
            queryMode: 'local',
            valueField: 'id',
            fieldLabel: 'Кому',
            name: 'receiver_id',
//            store: {
//                type: 'accounts-names',
//                autoLoad: true,
//                sorters: [{property:'name', direction: 'ASC'}],
//                sortOnLoad: true
//            },
            allowBlank:false
        }, {
            xtype: 'textarea',
            fieldLabel: 'Сообщение',
            name: 'message',
            allowBlank:false,
            listeners: {
                change: function( textarea, newValue, oldValue, eOpts ) {
                    var form = textarea.up('form');
                    if (form.isValid()) {
                        form.down("[action=send]").enable();
                    } else {
                        form.down("[action=send]").disable();
                    }
                }
            }
        }
    ]
});