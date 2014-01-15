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

    updateURL: '/json/pa/profile/update-profile',

    changePassURL: '/json/pa/profile/change-password',

    getExpertURL: '/json/pa/profile/get-expert',

    addExpertURL: '/json/pa/profile/register-expert',

    editExpertURL: '/json/pa/profile/edit-expert',

    addExpertDocURL: '/json/pa/profile/upload-expert-doc',

    deleteExpertDocURL: '/json/pa/profile/delete-expert-doc',

    getExpertDocsURL: '/json/pa/profile/get-expert-docs',

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
            'passchangeview button#saveBtn': {
                click: this.chagePassword
            }
        });


        this.profileWin = Ext.create('EC.PA.view.Profile',{editable:true});
        this.profileWin.down('button#changePassBtn').on('click',this.openPassWindow,this);
        this.profileWin.down('button#showEditFormBtn').on('click',this.showEditForm,this);
        this.profileWin.down('button#cancel').on('click',this.hideEditForm,this);
        this.profileWin.down('button#saveBtn').on('click',this.updateProfile,this);
        this.profileWin.down('button#makeExpertFromMe').on('click',this.addExpert,this);
        this.profileWin.down('button#editExpertProfile').on('click',this.editExpert,this);

        //Создаем окошко профиля

        this.profileWin.hide();

        //заполняем формы
        this.fillDisplayForm();
        this.fillEditForm();

    },

    showExpertCard:function(){
//        console.log("showing edit form");
        var win = this.profileWin;

//        console.time("Form show");

        Ext.suspendLayouts();

        win.getLayout().setActiveItem('editProfile');
        win.down("#saveBtn").show();
        win.down('#showEditFormBtn').hide();
        win.down("#cancel").show();

        Ext.resumeLayouts(true);

//        console.timeEnd("Form show");
    },

    addExpert: function(fromCurrent) {

        var view = Ext.create('EC.Experts.view.Experts.Edit',{
            fromCurrent: true,
            hideFiles: true
        });

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

                        var win = this.profileWin;

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

    // TODO проверить
    addExpertFile: function(win) {

        Ext.create('xlib.upload.Dialog', {
            autoShow: true,
            singleUpload: true,
            dialogTitle: 'Передача файлов на сервер',
            uploadUrl: this.addExpertDocURL,
            uploadParams: {
                expert_id: win.data.id
            },
            listeners: {
                'uploadcomplete': {
                    fn: function(upDialog, manager, items, errorCount) {
                        if (!errorCount) {
                            upDialog.close();
                            win.filesStore.load();
                        }
                    },
                    scope: this
                },
                'close': {
                    fn: function (panel, eOpts ) {
                        win.filesStore.load();
                    },
                    scope: this
                }
            }
        });
    },

    // TODO проверить
    downloadExpertFile: function(record) {

        var url = this.downloadURL + "?id=" + record.get('id');
        Ext.Ajax.request({
            url: url,
            success: function(response, opts) {
                var r = Ext.JSON.decode(response.responseText);

                if (r.success === true) {
                    Ext.DomHelper.append(document.body, {
                        tag: 'iframe',
                        id:'downloadIframe',
                        frameBorder: 0,
                        width: 0,
                        height: 0,
                        css: 'display:none;visibility:hidden;height:0px;',
                        src: url
                    });
                } else {
                    Ext.Msg.alert('Сообщение', 'Заправшиваемый файл не найден');
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'В ходе получения файла произошла ошибка');
            },
            scope: this
        });
    },

    deleteExpertFile: function(record) {

        Ext.MessageBox.confirm('Подтверждение', 'Удалить документ?', function(b) {

            if ('yes' === b) {
                Ext.Ajax.request({
                    params: record.data,
                    url: this.deleteExpertDocURL,
                    success: function(response, opts) {
                        var r = Ext.JSON.decode(response.responseText);

                        if (r.success === true) {
                            this.expertsEditWin.filesStore.load();
                        } else {
                            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                        }

                    },
                    failure: function() {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);

    },

    editExpert: function() {

        var data = {
            id: this.account.expert_id,
            account_id: this.account.id,
            equip_id: this.account.expert_equip_id,
            status_id: this.account.expert_status_id,
            rating: this.account.expert_rating,
            experience: this.account.expert_experience,
            desc: this.account.expert_desc
        };


        this.expertsEditWin = Ext.create('EC.Experts.view.Experts.Edit',{
            data: data,
            hideFiles: false,
            fromCurrent: true,
            getFilesURL: this.getExpertDocsURL
        });

        this.expertsEditWin.on({
            add: this.addExpertFile,
            download: this.downloadExpertFile,
            delete: this.deleteExpertFile,
            scope: this
        });

        this.expertsEditWin.down('button[action=save]').on({
            click: function() {
                var form = this.expertsEditWin.down('form');
                form.submit({
                    url: this.editExpertURL,
                    success: function(form, action) {
                        Ext.Msg.alert('Ответ системы',
                            '<span style="color:green;">Обновление профиля специалиста прошло успешно.</span>');

                        var new_data = form.getValues();

                        this.account.equip_id = new_data.equip_id;
                        this.account.status_id = new_data.status_id;
                        this.account.rating = new_data.rating;
                        this.account.experience = new_data.experience;
                        this.account.desc = new_data.desc;

                        this.expertsEditWin.close();
                        this.fillDisplayForm();
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
        var win = this.profileWin;

        if (win.getLayout().activeItem.itemId === 'editProfile') {
            return;
        }

//        console.time("Form show");

        Ext.suspendLayouts();
        win.down("#saveBtn").show();
        win.down('#showEditFormBtn').hide();

        if (this.isExpert()) {
            win.down('#editExpertProfile').hide();
        } else {
            win.down('#makeExpertFromMe').hide();
        }

        win.down('#showEditFormBtn').hide();
        win.down("#cancel").show();


        win.getLayout().setActiveItem('editProfile');

        Ext.resumeLayouts(true);

//        console.timeEnd("Form show");
    },


    hideEditForm: function(){
        var win = this.profileWin;

        if (win.getLayout().activeItem.itemId === 'displayProfile') {
            win.doLayout();
            return;
        }

//        console.time("Form hide");

        Ext.suspendLayouts();

        win.down("#saveBtn").hide();
        win.down('#showEditFormBtn').show();

        if (this.isExpert()) {
            win.down('#editExpertProfile').show();
        } else {
            win.down('#makeExpertFromMe').show();
        }


        win.down("#cancel").hide();
        win.getLayout().setActiveItem('displayProfile');
        win.doLayout();

        Ext.resumeLayouts(true);

//        console.timeEnd("Form hide");
    }

    ,openPassWindow: function(){
        Ext.create('EC.PA.view.PassChange');
    }


//    ,getExpertData: function() {
//        var ex_id = this.account.expert_id;
//
//        if (ex_id === 0 || ex_id === null) {
//            this.hideEditForm();
//            return;
//        }
//
//        Ext.Ajax.request({
//            url: this.getExpertURL,
//            success: function(response) {
//                var r = Ext.JSON.decode(response.responseText);
//                var disp = this.profileWin.down("#displayProfile");
//
//                this.expert = Ext.create('EC.Experts.model.Expert',r.data);
//
//                this.account.expert = r.data;
//                disp.tpl.overwrite(disp.body,this.account);
//
//                this.hideEditForm();
//
//            },
//            failure: function(response) {
//                Ext.Msg.alert('Ответ системы',
//                    '<span style="color:red;">Ошибка получения данных профиля!</span>');
//            },
//            scope: this
//        });
//
//    }

    ,fillDisplayForm: function(){
//        TODO заполнять из this.account
        Ext.Ajax.request({
            url: this.URL,
            success: function(response) {
                var r = Ext.JSON.decode(response.responseText);
                this.account = r.data;

                var disp = this.profileWin.down("#displayProfile");

                disp.tpl.overwrite(disp.body,this.account);

//                this.getExpertData();

            },
            failure: function(response) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка получения данных профиля!</span>');
            },
            scope: this
        });
    }

    ,fillEditForm: function() {
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

    ,updateProfile: function(){
        var me = this;
        var form = this.profileWin.down('#editProfile');

        form.submit({
            url: this.updateURL,
            success: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Обновление аккаунта прошло успешно.</span>');

                this.fillDisplayForm();

            },
            failure: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка обновления аккаунта!</span>');
            },
            scope: this
        });

    }
});