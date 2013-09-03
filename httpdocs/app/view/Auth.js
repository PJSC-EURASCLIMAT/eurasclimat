Ext.define('App.view.Auth', {
    
    extend: 'Ext.window.Window',

    alias: 'widget.loginwindow',
    
    title: 'Вход в систему',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 200,

    listeners: {
        afterrender: function(field) {
            this.down('[name=login]').focus(false,300);
        }
    },
    items : [{
        xtype: 'form',
        bodyPadding: 5,
        items: [{
            xtype: 'hidden',
            name: 'do',
            value: 1
        }, {
            xtype: 'textfield',
            labelWidth: 50,
            allowBlank: false,
            name: 'login',
            fieldLabel: 'Логин',
            inputAttrTpl: [
                'autocomplete="on"'
            ]
        }, {
            xtype: 'textfield',
            labelWidth: 50,
            allowBlank: false,
            inputType: 'password',
            fieldLabel: 'Пароль',
            name: 'password',
            listeners: {
                specialkey: function(f,e){
                    if (e.getKey() == e.ENTER) {
                        this.up('window').fireEvent('enterPressed');
                    }
                }
            }
        }, {
            xtype: 'label',
            itemId: 'regBtn',
//            style: 'padding-left: 10px; font-size: x-small;',
            html: '<a href="#">Регистрация</a>',
            listeners: {
                afterrender: function(label) {
                    // no delegate needed, since inputCmp.el is the <input>
                    label.mon(label.el, 'click', function(){
                        this.up('loginwindow').fireEvent("regBtnClicked");
                    }, this);
                }
                ,single: true
            }
        }],

        buttons: [{
            text: 'Войти',
            formBind: true,
            action: 'doLogin'
        },
        {xtype:'tbfill'},
        {
            text: 'Отменить',
            handler: function(){
                this.up('window').close();
            }
        }]
    }]


});