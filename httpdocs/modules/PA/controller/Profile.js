Ext.define('EC.PA.controller.Profile', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.PA.view.Profile',
        'EC.PA.view.Info',
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

    getURL: '/json/pa/info/get-account-info',

    addExpertURL: '/json/pa/profile/register-expert',

    refs: [
        {
            ref: 'profileWin',
            selector: 'profilewin'
        },{
            ref: 'showEditFormBtn',
            selector: 'profilewin button#showEditFormBtn'
        },{
            ref: 'displayProfileForm',
            selector: 'profilewin form#displayProfile'
        }
    ],

    showProfile: function(recordId) {
        Ext.Ajax.request({
            params: {
                id: recordId
            },
            url: this.getURL,
            success: function(response, opts) {
                var data = Ext.decode(response.responseText).data;

                if (!Ext.isEmpty(data)) {
                    var card = Ext.widget('ProfileInfo');
                    card.showTpl.overwrite(card.down('panel').body, data);
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить карточку специалиста.');
            },
            scope: this
        });
    },

    isExpert: function() {
        if(Ext.isEmpty(this.account.expert_id)) {
            return false;
        }
        return true;
    },

    run: function(container) {

        this.control({
            'passchangeview button#saveBtn': {
                click: this.chagePassword
            }
        });

        //заполняем формы
        this.refreshData();
    },

    refreshData: function(){
        Ext.Ajax.request({
            url: this.URL,
            success: function(response) {
                var r = Ext.JSON.decode(response.responseText);
                this.account = r.data;
                this.showProfileWin();
            },
            failure: function(response) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка получения данных профиля!</span>');
            },
            scope: this
        });
    },

    showProfileWin: function() {
        var me = this;
        if (!Ext.isEmpty(this.profileWin)) {
            this.profileWin.applyData(this.account);
            return;
        }

        this.profileWin = Ext.create('EC.PA.view.Profile',{
//            getFilesURL: this.getExpertDocsURL,
            data: this.account,
            listeners: {
                close: function() {
                    me.profileWin = null;
                }
            }
        });

        this.profileWin.down('button#showEditFormBtn').on('click',this.showEditForm,this);
        this.profileWin.down('button#makeExpertFromMe').on('click',this.addExpert,this);
        this.profileWin.show();
    },

    addExpert: function(fromCurrent) {
        var me = this;

        var view = Ext.create('EC.PA.view.ExpertForm',{
            header: false,
            fromCurrent: true,
            listeners: {
                close: function() {
                    me.addExpertWin = null;
                }
            }
        });

        this.addExpertWin = Ext.create('Ext.window.Window', {
            title: 'Стать специалистом',
            width: 400,
            height: 350,
            layout: 'fit'
        });

        this.addExpertWin.add(view);
        this.addExpertWin.show();

        view.down('button[action=save]').on({
            click: function() {
                view.getForm().submit({
                    url: this.addExpertURL,
                    success: function(form, action) {
                        Ext.Msg.alert('Ответ системы',
                            '<span style="color:green;">Обновление профиля специалиста прошло успешно.</span>');
                        this.profileWin.down('#makeExpertFromMe').hide();
//                        this.profileWin.down("#showEditFormBtn").show();
                        this.refreshData();
                        this.addExpertWin.close();
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
        var me = this;

        var win = this.profileWin;

        this.editProfileWin = Ext.create('EC.PA.view.EditProfile',{
            data: this.account,
            hideExpert: !this.isExpert(),
            listeners: {
                close: function() {
                    me.refreshData();
                }
            },
            scope: this
        });

        this.editProfileWin.down('profile-expert-edit-form')
        this.editProfileWin.show();
    }

});