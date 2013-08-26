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
Ext.require('xlib.Acl.Manager');

Ext.application({
    name: 'App',
    appFolder: 'app',
    controllers: ['Main'],
    launch: function() {

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
    }
});