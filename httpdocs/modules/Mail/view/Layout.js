Ext.define('EC.Mail.view.Layout', {

    extend: 'Ext.tab.Panel',

    alias: 'widget.MailPanel',
    
    title: 'Корпаративная связь',
    
    icon: '/images/icons/about.png',

    requires: ['xlib.portal.PortalPanel'],
    
    closable: false,
    
    border: false,
    
    bodyBorder: false,

    tabBar: {
        style: 'margin-top: -1px;'
    },

    defaults: {
        layout: 'fit',
        bodyBorder: false,
        closable: false
    },
    
    items: [
        Ext.create('EC.Mail.view.SysMail.Layout'),
        Ext.create('EC.Mail.view.CorpCellNet.Layout'),
        Ext.create('EC.Mail.view.CorpBaseNet.Layout'),
        Ext.create('EC.Mail.view.Chat.Layout'),
        Ext.create('EC.Mail.view.VideoChat.Layout'),
        Ext.create('EC.Mail.view.NewChapter.Layout')
    ]
});