Ext.define('App.view.TopPanel', {

    extend: 'Ext.toolbar.Toolbar',
    
    alias: 'widget.TopPanel',

    baseCls: 'xlib-bkg',
    
    region: 'north',
    
    padding: 5,
    
    border: false,
    
    items: ['->', {
        xtype: 'label',
        flex: 1,
        style: 'color: white; text-align: right; padding-right: 10px;',
        text: 'Вы вошли как ' 
            + xlib.Acl.Storage.getIdentity().name 
            + ' (' + xlib.Acl.Storage.getIdentity().login + ') '
    }, {
        xtype: 'label',
        html: xlib.Acl.Storage.getIdentity().login == 'guest' 
            ? '<a href="/index/login" style="color: white;">[Войти]</a>'
            : '<a href="/index/logout" style="color: white;">[Выйти]</a>'
//    }, ' ', {
//        xtype: 'button',
//        text: 'Выход',
//        pressed: true,
//        handler: function() {
//            Ext.MessageBox.confirm('Подтверждение', 'Выйти из системы?', function(b) {
//                if ('yes' === b) {
//                    window.location.href = '/index/login';
//                }
//            });
//        }
    }]
});