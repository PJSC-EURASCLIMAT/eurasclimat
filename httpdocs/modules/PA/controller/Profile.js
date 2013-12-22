Ext.define('EC.PA.controller.Profile', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.PA.view.Profile',
        'EC.PA.view.PassChange',
        'xlib.AccountsCombo',
        'xlib.ContrCityField'
    ],

    stores: [
        'EC.Experts.store.Equipment',
        'EC.Experts.store.Statuses'
    ],

    models: ['EC.PA.model.Profile'],

    URL: '/json/pa/profile/get-profile',

    updateURL: '/json/pa/profile/update-profile',

    changePassURL: '/json/pa/profile/change-password',

    getExpertURL: '/json/pa/profile/get-expert',

    addExpertURL: '/json/pa/profile/register-expert',

    editExpertURL: '/json/pa/profile/edit-expert',

    refs: [
        {
            ref: 'profileWin',
            selector: 'profilewin'
        },{
            ref: 'changePassBtn',
            selector: 'profilewin button#changePassBtn'
        },{
            ref: 'showEditFormBtn',
            selector: 'profilewin button#showEditFormBtn'
        },{
            ref: 'displayProfileForm',
            selector: 'profilewin form#displayProfile'
        },{
            ref: 'editProfileForm',
            selector: 'profilewin form#editProfile'
        }
        ,{
            ref: 'passChangeWin',
            selector: 'passchangeview'
        }
    ],

    init:function(){
        //Копируем инфу по пользователю в текущий контроллер
        this.account = xlib.Acl.Storage.getIdentity();

        this.callParent();
    },

    chagePassword: function(){
        var win = this.getPassChangeWin();
        var form = win.down('form');

        form.submit({
            url: this.changePassURL,
            success: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Пароль успешнго обновлен.</span>');
                win.close();
            },
            failure: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка обновления пароля!</span>');
            },
            scope: this
        });

    },

    run: function(container) {

        this.control({
            'profilewin button#changePassBtn': {
                click: this.openPassWindow
            },
            'profilewin button#showEditFormBtn': {
                click: this.showEditForm
            },
            'profilewin button#cancel': {
                click: this.hideEditForm
            },

            'profilewin button#makeExpertFromMe': {
                click: this.addExpert
            },
            'profilewin button#editExpertProfile': {
                click: this.editExpert
            },

            'profilewin button#saveBtn': {
                click: this.updateProfile
            },
            'passchangeview button#saveBtn': {
                click: this.chagePassword
            }
        });



        //Создаем окошко профиля
        Ext.create('EC.PA.view.Profile');
        this.getProfileWin().hide();

        //заполняем формы
        this.fillDisplayForm();
        this.fillEditForm();

    },

    showExpertCard:function(){
//        console.log("showing edit form");
        var win = this.getProfileWin();

        console.time("Form show");

        Ext.suspendLayouts();

        win.getLayout().setActiveItem('editProfile');
        win.down("#saveBtn").show();
        win.down('#showEditFormBtn').hide();
        win.down("#cancel").show();

        Ext.resumeLayouts(true);

        console.timeEnd("Form show");
    },


    addExpert: function(fromCurrent) {

        var view = Ext.create('EC.Experts.view.Experts.Edit',{fromCurrent: true});

        view.down('button[action=save]').on({
            click: function() {
                var form = view.down('form');
                form.submit({
                    url: this.addExpertURL,
                    success: function(form, action) {
                        Ext.Msg.alert('Ответ системы',
                            '<span style="color:green;">Обновление профиля специалиста прошло успешно.</span>');

                        var expert_id = parseInt(Ext.JSON.decode(action.response.responseText).data);
                        this.account.expert_id  = expert_id;
                        this.getExpertData();

                        var win = this.getProfileWin();

                        view.close();
                        win.down('#makeExpertFromMe').hide();
                        win.down("#editExpertProfile").show();

                    },
                    failure: function(form, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                        }
                    },
                    scope: this
                });
            },
            scope: this
        });
    },

    editExpert: function() {
        var view = Ext.create('EC.Experts.view.Experts.Edit',{
            record: this.expert,
            fromCurrent: true
        });

        view.down('button[action=save]').on({
            click: function() {
                var form = view.down('form');
                form.submit({
                    url: this.editExpertURL,
                    success: function(form, action) {
                        Ext.Msg.alert('Ответ системы',
                            '<span style="color:green;">Обновление профиля специалиста прошло успешно.</span>');
                        this.expert.data = form.getValues();
                        view.close();
//                        this.fireEvent('itemSaved');
                    },
                    failure: function(form, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                        }
                    },
                    scope: this
                });
            },
            scope: this
        });
    },
    showEditForm:function(){
//        console.log("showing edit form");
        var win = this.getProfileWin();

        console.time("Form show");

        Ext.suspendLayouts();

        win.getLayout().setActiveItem('editProfile');
        win.down("#saveBtn").show();
        win.down('#showEditFormBtn').hide();
        win.down("#cancel").show();

        Ext.resumeLayouts(true);

        console.timeEnd("Form show");
    },


    hideEditForm: function(){
        var win = this.getProfileWin();

        console.time("Form hide");

        Ext.suspendLayouts();

        win.getLayout().setActiveItem('displayProfile');
        win.down("#saveBtn").hide();
        win.down('#showEditFormBtn').show();
        win.down("#cancel").hide();

        Ext.resumeLayouts(true);

        console.timeEnd("Form hide");
    }

    ,openPassWindow: function(){
        Ext.create('EC.PA.view.PassChange');
    }

    ,getExpertData: function() {
        var ex_id = this.account.expert_id;
        var win = this.getProfileWin();

        if (ex_id === 0 || ex_id === null) {
            win.down('#makeExpertFromMe').show();
            win.down('#editExpertProfile').hide();
            return;
        }

        Ext.Ajax.request({
            url: this.getExpertURL,
            success: function(response) {
                var r = Ext.JSON.decode(response.responseText);
                this.expert = Ext.create('EC.Experts.model.Expert',r.data);

                win.down('#makeExpertFromMe').hide();
                win.down('#editExpertProfile').show();
            },
            failure: function(response) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка получения данных профиля!</span>');
            },
            scope: this
        });

    }

    ,fillDisplayForm: function(){
//        TODO заполнять из this.account
        Ext.Ajax.request({
            url: this.URL,
            success: function(response) {
                var r = Ext.JSON.decode(response.responseText);
                this.account = r.data;

                var formValues = new EC.PA.model.Profile(this.account);

                this.getDisplayProfileForm().loadRecord(formValues);

                this.getExpertData();

            },
            failure: function(response) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка получения данных профиля!</span>');
            },
            scope: this
        });
    }

    ,fillEditForm: function(){
//        TODO заполнять из this.account
        var form = this.getEditProfileForm();
        form.load({
            url: this.URL
            ,success: function(curForm, action) {
                var me = this;
//                this.fillImageField(curForm);
                setTimeout(function(){
                    me.getProfileWin().show();
                },100);
            }
            ,scope:this
        });

        form.down('[name=city_id]').setValue(this.account.city_id);
        form.down('[name=country_id]').setValue(this.account.country_id);

    }

    ,fillImageField: function(curForm) {
        curForm.owner.down("[name=id]").setValue(this.account.id+".jpg");
    }

    ,onProfileRender: function(){
//        console.log('profile rendered');
    }

    ,updateProfile: function(){
        var me = this;
        var form = this.getProfileWin().down('#editProfile');
//        var formValues = this.getProfileWin().down('#editProfile').getValues();

//        console.log(formValues);
        form.submit({
            url: this.updateURL,
            success: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Обновление аккаунта прошло успешно.</span>');
                this.fillDisplayForm();
                this.getProfileWin().getLayout().setActiveItem('displayProfile');
                this.getProfileWin().down('#saveBtn').hide();
            },
            failure: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка обновления аккаунта!</span>');
            },
            scope: this
        });

    }
});