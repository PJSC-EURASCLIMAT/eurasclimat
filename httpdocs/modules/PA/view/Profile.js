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
    
    width: 400,

    initComponent: function() {

        var acc = xlib.Acl.Storage.getIdentity();


        this.items = [{
                    xtype: 'form',
                    itemId: 'displayProfile',
                    bodyPadding: 10,
                    items: [
                        {
                            layout:'hbox',
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'imagefield'
                                    ,dir: '/images/users/'
                                    ,width: 100
                                    ,height: 90
                                    ,name: 'id'
                                    ,margin: '0 10 0 0'
                                }, {
                                    xtype:'tbspacer',
                                    flex:1
                                },
                                {
                                    xtype: 'container',
                                    layout:'vbox',
                                    items: [
                                        , {
                                            xtype: 'displayfield',
                                            name: 'name',
                                            fieldLabel: 'ФИО'
                                        }, {
                                            xtype: 'displayfield',
                                            name: 'login',
                                            fieldLabel: 'Логин'
                                        }, {
                                            xtype: 'displayfield',
                                            name: 'country',
                                            fieldLabel: 'Страна'
                                        }, {
                                            xtype: 'displayfield',
                                            name: 'city',
                                            fieldLabel: 'Город'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Стать специалистом',
                                            itemId: 'makeExpertFromMe',
                                            hidden: !Ext.isEmpty(acc.expert_id),
                                            margin: '0 0 10 0'
                                        },{
                                            xtype: 'button',
                                            text: 'Профиль специалиста',
                                            hidden: Ext.isEmpty(acc.expert_id),
                                            itemId: 'editExpertProfile',
                                            margin: '0 0 10 0'
                                        }
                                    ]
                                }


                            ]
                        }
                    ]
                }, {
                    xtype: 'form',
                    itemId: 'editProfile',
                    bodyPadding: 10,
                    fieldDefaults: {
                        margin: '10 0'
//                        labelWidth: 100
//                        allowBlank: false,
//                        anchor: '-5'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            name: 'photo',
                            fieldLabel: 'Фотография',
                            buttonText: 'Выбрать фото'
                        },
                        {
                            xtype: 'textfield',
                            name: 'name',
                            fieldLabel: 'ФИО'
                        }, {
                            xtype: 'textfield',
                            name: 'login',
                            fieldLabel: 'Логин'
                        }, {
                            xtype: 'ContrCityField'
//                            ,city_id: city_id
//                            ,country_id: country_id
                        }, {
                            xtype: 'TZCombo'
                        },
                        {
                            xtype: 'button',
                            itemId: 'changePassBtn',
                            text: 'Сменить пароль',
                            margin: '0 0 10 0'
                        }
                    ]
        }];

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
            xtype:'tbspacer',
            flex:1
        }, {
            xtype: 'button',
            text: 'Редактировать профиль',
            itemId: 'showEditFormBtn',
            margin: '0 0 10 0'
        }, {
            xtype: 'button',
            hidden: true,
            text: 'Отмена',
            itemId: 'cancel',
            margin: '0 0 10 0'
        }]

        this.callParent(arguments);

        this.getLayout().setActiveItem('displayProfile');
    }
//
});