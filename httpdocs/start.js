Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Ext'   : '/library/ext4/src',
        'xlib'  : '/library/xlib',
        'EC'    : '/modules'
    }
});


Ext.application({
    name: 'App',
    appFolder: 'app',
    controllers: ['Main'],
    launch: function() {
        this.getController('Main').run();
    }
});

/* Overrides */
Ext.onReady(function() {
    
    /* Translation */
    
    if (Ext.grid.RowEditor) {
        Ext.apply(Ext.grid.RowEditor.prototype, {
            saveBtnText  : 'Сохранить',
            cancelBtnText: 'Отменить',
            errorsText: 'Ошибки',
            dirtyText: 'Вы должны сохранить или отменить ваши изменения'
        });
    }

    Ext.MessageBox.initComponent();
    

    /* 
     * Fucking bug fixing for Ext 4.1 
     * TODO: check this in future releases
     */
    
    Ext.override(Ext.panel.Panel, {
        getDockedItems: function (selector, beforeBody) {
            return this.getComponentLayout().getDockedItems ?  
                this.callOverridden([selector, beforeBody]) : [];
        }
    });
    
    Ext.override(Ext.view.AbstractView, {
      onRender: function() {
        var me = this;
        this.callOverridden();
        if (me.mask && Ext.isObject(me.store)) {
            me.setMaskBind(me.store);
        }
      }
    });
    
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
    
});