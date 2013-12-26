Ext.define('EC.PA.view.Profile', {
    
    extend: 'Ext.window.Window',
    
    uses: [
        'xlib.ContrCityField',
        'xlib.TZCombo',
        'xlib.LanguageCombo',
        'xlib.form.ImageField'
    ],

    title: 'Профиль пользователя ' + xlib.Acl.Storage.getIdentity().name +
        ' (' + xlib.Acl.Storage.getIdentity().login + ') ',

    alias: 'widget.profilewin',
    
    layout: 'card',

    autoScroll: true,
    
    border: false,
    
    autoShow: true,
    
    modal: true,

    editable: false,
    
    width: 400,

    height: 350,

    initComponent: function() {

        var acc = xlib.Acl.Storage.getIdentity();


        this.items = [{
            xtype: 'panel',
            itemId: 'displayProfile',
            layout: 'fit',
            bodyPadding: 10,
            tpl: Ext.create('Ext.XTemplate',

                '<table width="100%" border="0">',
                    '<tr valign="top">',
                        '<td width="100">',
                            '<tpl if="have_avatar == 1">',
                                '<img src="images/users/{id}.jpg?{[this.dc()]}" width="100" style="float: left;margin-right: 15px">',
                            '<tpl else>',
                                '<img src="http://placehold.it/100x100" style="float: left;margin-right: 15px"/>',
                            '</tpl>',
                        '</td>',
                        '<td>',
                            'ФИО: {name}<br/><br/>',
                            'Email: {login}<br/><br/>',
                            'г. {city}, {country}<br/><br/>',
                        '</td>',
                    '</tr>',

                    '<tpl if="this.isExpert(values)">',
                        '<tr valign="top">',
                            '<td colspan="2">',
                                '<p><b>Специализация</b><p>',
                                '<p>Описание: {expert.desc}</p>',
                                '<p>Тип инженерного оборудования: {expert.equipment}</p>',
                                '<p>Статус: {expert.status}</p>',
                            '</td>',
                        '</tr>',
                    '</tpl>',

                {
                    dc: function() {
                        return new Date().getTime();
                    },
                    isExpert: function(values) {
                        if(!Ext.isEmpty(values.expert)){
                            return true
                        }
                        return false;
                    }
                }

            )

        }];

        if (this.editable === false) {
            this.callParent(arguments);
            this.getLayout().setActiveItem('displayProfile');
            return;
        }

        this.items.push({
                xtype: 'form',
                itemId: 'editProfile',
                bodyPadding: 10,
                fieldDefaults: {
                    margin: '10 0',
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'filefield',
                        name: 'photo',
                        fieldLabel: 'Фотография',
                        buttonText: 'Выбрать фото'
                    }, {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'ФИО'
                    }, {
                        xtype: 'textfield',
                        name: 'login',
                        fieldLabel: 'Email',
                        vtype: 'email'
                    }, {
                        xtype: 'ContrCityField'
                    }, {
                        xtype: 'TZCombo'
                    }
                ]
        });

        this.buttons = [{
            text: 'Сохранить',
            itemId: 'saveBtn',
            formBind: true,
            handler: function(){
                this.up('window').fireEvent('updateAccount');
            },
            hidden: true
//                action: 'submit'
        }, {
            xtype: 'button',
            text: 'Стать специалистом',
            itemId: 'makeExpertFromMe',
            hidden: !Ext.isEmpty(acc.expert_id),
            margin: '0 0 10 0'
        }, {
            xtype: 'button',
            text: 'Специализация',
            tooltip: 'Редактировать профиль специалиста',
            hidden: Ext.isEmpty(acc.expert_id),
            itemId: 'editExpertProfile'
        }, '->', {
            xtype: 'button',
            itemId: 'changePassBtn',
            text: 'Сменить пароль'
        },'->', {
            xtype: 'button',
            text: 'Редактировать профиль',
            itemId: 'showEditFormBtn'
        }, {
            xtype: 'button',
            hidden: true,
            text: 'Отмена',
            itemId: 'cancel'
        }]

        this.callParent(arguments);

        this.getLayout().setActiveItem('displayProfile');
    }
//
});