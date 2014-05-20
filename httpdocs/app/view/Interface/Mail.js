Ext.define('App.view.Interface.Mail', {

    extend: 'App.view.PortalLayoutAbstarct',

    alias: 'widget.MailPanel',
    
    title: 'Почта',
    
    icon: '/images/icons/messages.png',
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Mail-column-1'
        }, {
            id: 'Mail-column-2'
        }, {
            id: 'Mail-column-3'
        }]
    }]
});