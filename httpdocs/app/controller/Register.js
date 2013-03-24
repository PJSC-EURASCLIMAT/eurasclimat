Ext.define('App.controller.Register', {
    
    extend: 'Ext.app.Controller',

    views: ['App.view.Register'],
    
    URL: '/json/default/index/register',
    
    run: function(container) {
        
        var win = this.getView('App.view.Register').create();
        
        var submitForm = function() {
            
            var form = win.down('form');
        
            form.submit({
                url: this.URL,
                success: function(form, action) {
                    Ext.Msg.alert('Ответ системы', 
                        '<span style="color:green;">Регистрация прошла успешно.</span>');
                    win.close();
                },
                failure: function(form, action) {
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