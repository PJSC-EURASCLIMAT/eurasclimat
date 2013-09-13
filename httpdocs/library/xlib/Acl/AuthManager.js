Ext.ns('xlib.Acl');

xlib.Acl.AuthManager = function() {

    return {
        showAuthWin: function() {
            var me = this;

            this.authCntr = App.app.getController('Auth');
            this.regCntr = App.app.getController('Register');


            Ext.create('Ext.window.Window', {
                title: 'Доступ к системе',
                bodyPadding: 20,
                html: 'Для продолжения небходимо авторизоваться или зарегистрироваться.',
                buttons: [
                    '->',{
                        text: 'Авторизация',
                        handler: function(btn, eOpts){
                            me.authCntr.run();
                            btn.up('window').close();
                        }
                    },{
                        text: 'Регистрация',
                        handler: function(btn, eOpts){
                            me.regCntr.run();
                            btn.up('window').close();
                        }
                    },'->'
                ]
            }).show();

        }
    };
}();