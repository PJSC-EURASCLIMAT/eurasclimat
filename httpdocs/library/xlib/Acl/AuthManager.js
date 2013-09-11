Ext.ns('xlib.Acl');

xlib.Acl.AuthManager = function() {

    return {
        showAuthWin: function() {
            this.authCntr = App.app.getController('Auth');
            this.regCntr = App.app.getController('Register');

            Ext.Msg.show({
                title: 'Доступ к системе',
                msg: 'Для продолжения небходимо авторизоваться или зарегистрироваться.',
                buttons: Ext.Msg.OKCANCEL,
                fn: function(b) {
                    if ('ok' == b) {
                        this.authCntr.run();
                    }
                    if ('cancel' == b) {
                        this.regCntr.run();
                    }
                },
                buttonText: {ok: "Авторизация", cancel: "Регистрация"},
                icon: Ext.MessageBox.QUESTION,
                scope: this
            });

        }
    };
}();

acl.authManager = xlib.Acl.AuthManager;