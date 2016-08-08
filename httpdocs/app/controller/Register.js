Ext.define('App.controller.Register', {
    
    extend: 'Ext.app.Controller',

    views: ['App.view.Register'],
    
    URL: '/json/default/registration/register',
    
    run: function(container) {
        
        var win = this.getView('App.view.Register').create();
        
        var submitForm = function() {
            
            var form = win.down('form');
            var email = form.down('[name=login]').getValue();
            form.down('[name=email]').setValue(email);
        
            form.submit({
                url: this.URL,
                success: function(curForm, action) {
                    Ext.Msg.alert('Ответ системы', 
                        '<span style="color:green;">Регистрация прошла успешно.</br> На ваш почтовый ящик отправлена ссылка на активацию аккаунта.</span>');
                    win.close();
                },
                failure: function(curForm, action) {
                    Ext.Msg.alert('Ответ системы',
                        '<span style="color:red;">ОШИБКА РЕГИСТРАЦИИ!</span>');
                },
                scope: this
            });
        }
        
        win.down('button[action=submit]').on('click', submitForm, this);
        win.on('enterPressed', submitForm, this);
    }
});