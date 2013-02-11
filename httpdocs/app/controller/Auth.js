Ext.define('App.controller.Auth', {
    
    extend: 'Ext.app.Controller',

    views: ['App.view.Auth'],
    
    URL: '/json/default/index/auth',
    
    init: function(container) {
        
        if (xlib.Acl.Storage.getIdentity().login !== 'guest') {
            
            Ext.MessageBox.confirm('Подтверждение', 'Выйти из системы?', function(b) {
                if ('yes' === b) {
                    window.location.href = '/index/logout';
                }
            });
            
            return;
        }
        
        var authWin = this.getView('App.view.Auth').create();
        
        var submitForm = function() {
            
            var form = authWin.down('form');
        
            form.submit({
                url: this.URL,
                success: function(form, action) {
                    window.location.href = '/';
                },
                failure: function(form, action) {
                    authWin.down('textfield[name=password]').reset();
                    Ext.Msg.alert('Ответ системы', 
                        '<span style="color:red;">ОШИБКА АВТОРИЗАЦИИ!</span>');
                },
                scope: this
            });
        }
        
        
        authWin.down('button[action=doLogin]').on('click', submitForm, this);
        authWin.on('enterPressed', submitForm, this);
    }
});