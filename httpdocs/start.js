Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Ext'   : '/library/ext4/src',
        'xlib'  : '/library/xlib',
        'EC'    : '/modules'
    }
});

Ext.require('xlib.overrides.FileField');
Ext.require('xlib.overrides.Format');
Ext.require('xlib.Acl.Manager');
Ext.require('xlib.Acl.AuthManager');

Ext.ns('xlib');
xlib.formatCurrency = function(value) {
    return Ext.util.Format.currency(value, ' р.', 2, true);
}

Ext.application({
    name: 'App',
    appFolder: 'app',
    controllers: ['Main'],

    requires: [
        'xlib.Router'
    ],

    routes: {
        '/profile/:id/show' : 'main#profile',
        '/download/:id' : 'main#download'
    },

    // Глобальные переменные
    globals: {
        avatarsDir: '/images/users/'
    },

    launch: function() {

        /*
        Ext.Ajax.on({
            requestexception: function(conn, response, options) {
                switch (response.status) {
                    case 401:
                        alert("Авторизация истекла! \n Вы будете перенаправлены на страницу входа.");
                        window.location.reload();
                        break;
                        
                    case 404:
                        xlib.Msg.error('Страница не найдена');
                        break;
                        
                    case 405:
                    
                        var t = ['<b>Нет прав!</b>'];
                        
                        var result = xlib.decode(response.responseText);
                        if (Ext.isArray(result.trace) && result.trace.length > 0) {
    
                            t = t.concat(['<table style="padding-top: 20px">', '<tr>', '<td colspan="2"><b>Запрашиваемый ресурс:</b></td></tr>']);
                            
                            Ext.each(result.trace, function(i) {
                                t.push('<tr><td><b>Ресурс:</b> <i>' + i.resource.join('->') + '</i></td></tr>');
                                t.push('<tr><td><b>Привилегия:</b> <i>' + i.privilege + '</i></td></tr>');
                            }, this);
                            
                            t.push('</table>');
                        }
                            
                        xlib.Msg.error(t.join(''));
                        break;
                        
                    case 500:
                        xlib.Msg.error('Ошибка сервера');
                        break;
                }
            }  
        });
        */
        
        // чтобы был доступ к объекту приложения
        App.app = this;

        // Fix quick tips width
        delete Ext.tip.Tip.prototype.minWidth;
        
        // Add the additional 'advanced' VTypes
        Ext.apply(Ext.form.field.VTypes, {
            
            daterange: function(val, field) {
                var date = field.parseDate(val);
                if (!date) {
                    return false;
                }
                if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                    var start = field.up('form').down('#' + field.startDateField);
                    start.setMaxValue(date);
                    start.validate();
                    this.dateRangeMax = date;
                }
                else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                    var end = field.up('form').down('#' + field.endDateField);
                    end.setMinValue(date);
                    end.validate();
                    this.dateRangeMin = date;
                }
                /*
                 * Always return true since we're only using this vtype to set the
                 * min/max allowed values (these are tested for after the vtype test)
                 */
                return true;
            },
            daterangeText: 'Дата начала должна быть раньше даты конца',
    
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: 'Пароли не совпадают',
            
            phone: function(v) {
                var phoneRegex = /^((0|8|\+7|\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                return phoneRegex.test(v);
            },
            phoneMask: /[\d-+]/,
            phoneText: 'Неверный формат: +#-###-###-####'
        });
        
        this.getController('Main').run();

        var isAuth = (xlib.Acl.Storage.getIdentity().login !== 'guest');
        if (isAuth) this.getController("EC.PA.controller.Messages").listenUserMessages();
    }
});