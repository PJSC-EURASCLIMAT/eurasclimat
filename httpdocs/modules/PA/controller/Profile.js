Ext.define('EC.PA.controller.Profile', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.PA.view.Profile',
        'EC.PA.view.PassChange'
    ],

    models: ['EC.PA.model.Profile'],

    URL: '/json/pa/profile/get-profile',

    updateURL: '/json/pa/profile/update-profile',

    changePassURL: '/json/pa/profile/change-password',

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

    showEditForm:function(){
//        console.log("showing edit form");
        var win = this.getProfileWin();
        win.getLayout().setActiveItem('editProfile');
        win.down("#saveBtn").show();

    },

    hideEditForm: function(){
//        console.log("hiding edit form");
        var win = this.getProfileView();
        win.getLayout().setActiveItem('displayProfile');
        win.down("#saveBtn").show();
    }

    ,openPassWindow: function(){
//        console.log("opening password window");
        Ext.create('EC.PA.view.PassChange');
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
            },
            failure: function(response) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка получения данных профиля!</span>');
            },
            scope: this
        })


    }

    ,fillEditForm: function(){
//        TODO заполнять из this.account

        this.getEditProfileForm().load({
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