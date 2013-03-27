Ext.define('EC.PA.controller.Profile', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.PA.view.Profile'],
    
    URL: '/json/pa/profile/get-profile',
    
    run: function(container) {
        
        var win = this.getView('EC.PA.view.Profile').create(),
            form = win.down('form');
            
        form.load({
            url: this.URL
        });
        
//        var submitForm = function() {
//            
//            var form = win.down('form');
//        
//            form.submit({
//                url: this.URL,
//                success: function(form, action) {
//                    Ext.Msg.alert('Ответ системы', 
//                        '<span style="color:green;">Регистрация прошла успешно.</span>');
//                    win.close();
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert('Ответ системы', 
//                        '<span style="color:red;">ОШИБКА РЕГИСТРАЦИИ!</span>');
//                },
//                scope: this
//            });
//        }
//        
//        win.down('button[action=submit]').on('click', submitForm, this);
//        win.on('enterPressed', submitForm, this);
    }
});