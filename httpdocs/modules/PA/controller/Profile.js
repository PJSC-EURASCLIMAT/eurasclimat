Ext.define('EC.PA.controller.Profile', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.PA.view.Profile'],
    
    URL: '/json/pa/profile/get-profile',

    updateURL: '/json/pa/profile/update-profile',

    run: function(container) {

        this.win = this.getView('EC.PA.view.Profile').create();
        this.displayForm = this.win.down('#displayProfile');
        this.editForm = this.win.down('#editProfile');

        this.win.hide();

//
//        function fillImageField(curForm, login) {
//            var login = curForm.owner.down("[name=login]").getValue();
//            curForm.owner.down("[name=photo]").setValue(login+".jpg");
//        }

        this.fillDisplayForm();
        this.fillEditForm();

        this.win.on('updateAccount',this.updateProfile, this);
        this.win.on('openPassWindow',this.openPassWindow, this);


//        var submitForm = function() {
//            
//            var form = win.down('form');
//        
//            form.submit({
//                url: this.URL,
//                success: function(form, action) {
//                    Ext.Msg.alert('Ответ системы', 
//                        '<span style="color:green;">Регистрация прошла успешно.</span>');
//                    win.close();
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert('Ответ системы', 
//                        '<span style="color:red;">ОШИБКА РЕГИСТРАЦИИ!</span>');
//                },
//                scope: this
//            });
//        }
//        
//        win.down('button[action=submit]').on('click', submitForm, this);
//        win.on('enterPressed', submitForm, this);
    }
    ,openPassWindow: function(){

        var passWin = Ext.create('Ext.window.Window', {
            title: 'Hello',
            height: 200,
            width: 400,
            layout: 'fit',

            items: [
                {
                    type: 'form',
                    itemId: 'passResetProfile',
                    bodyPadding: 10,
                    items: [{
                        inputType: 'textfield',
                        name: 'firstPass'
//                    allowBlank: false,
//                    fieldLabel: 'Новый пароль <sup style="color: red;">*</sup>',
//                    labelWidth: 150,
//                    minLength: 3,
//                    maxLength: 15,
//                    itemId: 'passwordFieldRegister',
//                    name: 'password'
////                        listeners: {
//                            validitychange: function(field){
//                                this.up('form').down('#passwordFieldRegisterConfirm').validate();
//                            },
//                            blur: function(field){
//                                this.up('form').down('#passwordFieldRegisterConfirm').validate();
//                            }
//                        }
                    }]
                }

            ]

//            items: {  // Let's put an empty grid in just to illustrate fit layout
//                xtype: 'grid',
//                border: false,
//                columns: [{header: 'World'}],                 // One header just for show. There's no data,
//                store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
//            }
        }).show();
//
//        this.passWin = Ext.create("Ext.window.Window",{
//            width: 300,
//            height: 300,
//            layout: 'fit',
//            title: 'Смена пароля',
//            autoScroll: true,
//
//            border: false,
//
//            autoShow: true,
//
//            modal: true,
//
//            items: [
//                {
//                    inputType: 'password',
//                    allowBlank: false
////                    fieldLabel: 'Новый пароль <sup style="color: red;">*</sup>',
////                    labelWidth: 150,
////                    minLength: 3,
////                    maxLength: 15,
////                    itemId: 'passwordFieldRegister',
////                    name: 'password'
////                        listeners: {
////                            validitychange: function(field){
////                                this.up('form').down('#passwordFieldRegisterConfirm').validate();
////                            },
////                            blur: function(field){
////                                this.up('form').down('#passwordFieldRegisterConfirm').validate();
////                            }
////                        }
//                }
//            ]
//            ,buttons: [
//                {text:"OK"}
//            ]
//        });

//        this.passWin.show();

    }
    ,fillDisplayForm: function(){
        this.displayForm.load({
            url: this.URL
            ,success: this.fillImageField
        });
    }

    ,fillEditForm: function(){
        this.editForm.load({
            url: this.URL
            ,success: function(curForm, action) {
                var me = this;
                this.fillImageField(curForm, action);
                setTimeout(function(){
                    me.win.show();
                },100);
            }
            ,scope:this
        });
    }

    ,fillImageField: function(curForm, login) {
        var login = curForm.owner.down("[name=login]").getValue();
        curForm.owner.down("[name=photo]").setValue(login+".jpg");
    }

    ,onProfileRender: function(){
        console.log('profile rendered');
    }

    ,updateProfile: function(){
        var me = this;
        var form = this.win.down('#editProfile');
//        var formValues = this.win.down('#editProfile').getValues();

//        console.log(formValues);
        form.submit({
            url: this.updateURL,
            success: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Обновление аккаунта прошло успешно.</span>');
                this.fillDisplayForm();
                this.win.getLayout().setActiveItem('displayProfile');
                this.win.down('#saveBtn').hide();
            },
            failure: function(curForm, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">Ошибка обновления аккаунта!</span>');
            },
            scope: this
        });

    }
});