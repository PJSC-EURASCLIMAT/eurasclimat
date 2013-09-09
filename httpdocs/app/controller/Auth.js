Ext.define('App.controller.Auth', {
    
    extend: 'Ext.app.Controller',

    views: ['App.view.Auth'],
    
    URL: '/json/default/index/auth',

    run: function(container) {

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

                    var msg = null;

                    var errors = Ext.JSON.decode(action.response.responseText).errors;

                    if (Ext.isDefined(errors)) {

                        for (var i = 0; i < errors.length; i++) {

                            var obj = errors[i];

                            // TODO наверное лучше вынести проверку всех кодов статусов в отдельный класс или функцию
                            if (errors[i].code === -109) {
                                msg = 'АККАУНТ НЕ АКТИВИРОВАН!';
                                break;
                            }

                        }

                    }


                    if (msg === null) {
                        msg = 'ОШИБКА АВТОРИЗАЦИИ!';
                    }

                    Ext.Msg.alert('Ответ системы',
                        '<span style="color:red;">'+msg+'</span>');
                },
                scope: this
            });
        }
        
        
        authWin.down('button[action=doLogin]').on('click', submitForm, this);
        authWin.down('button[action=doRegister]').on('click', function() {
            authWin.close();
            App.app.getController("Register").run();
        }, this);
        authWin.on('enterPressed', submitForm, this);
    }

});