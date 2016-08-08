Ext.define('EC.Main.controller.Router', {
    extend: 'Ext.app.Controller',

    info: {
        news: {
            url: '/json/default/news/get',
            view: 'EC.Main.view.News.Card'
        },
        profile: {
            url: '/json/pa/info/get-account-info',
            view: 'EC.PA.view.Info'
        },
        qualifications: {
            url: '/json/crm/qualifications/get',
            view: 'EC.Qualifications.view.Info'
        },
        professions: {
            url: '/json/crm/professions/get',
            view: 'EC.Professions.view.Info'
        },
        'eng-system-types': {
            url: '/json/crm/eng-system-types/get',
            view: 'EC.Qualifications.view.Info'
        },
        services: {
            url: '/json/crm/services/get',
            view: 'EC.Services.view.Info'
        }
    },

    downloadFileURL: '/json/pa/info/download',

    showInfo: function(id, url, className, callback, scope) {
        Ext.Ajax.request({
            params: {
                id: id
            },
            url: url,
            success: function(response, opts) {
                var data = Ext.decode(response.responseText).data,
                    card;

                if ( !Ext.isEmpty(data) ) {
                    card = Ext.create(className);
                    card.showTpl.overwrite(card.down('panel').body, data);

                    if ( !Ext.isEmpty( card.titleField ) ) {
                        card.setTitle( card.title + ' - ' + data[card.titleField] );
                    }

                    if ( !Ext.isEmpty( callback ) && Ext.isFunction( callback ) && !Ext.isEmpty( scope ) ) {
                        callback.call(scope);
                    }
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить.');
            },
            scope: this
        });
        Ext.Router.redirect('');
    },

    simple: function(params, url, opts) {
        var name = opts.route.split('/')[1];
        this.showInfo(params.id, this.info[name].url, this.info[name].view );
    },

    download: function(params) {

        var url = this.downloadFileURL + "?id=" + params.id;
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
                    Ext.Msg.alert('Сообщение', 'Запрашиваемый файл не найден');
                }
                Ext.Router.redirect('');

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Сообщение', 'В ходе получения файла произошла ошибка');
                Ext.Router.redirect('');
            },
            scope: this
        });

    }

//    news: function( params ) {
//        debugger;
//        this.showProfile(params.id, this.info.news.url, this.info.news.view );
//    },
//
//    profile: function( params ) {
//        debugger;
//        this.showProfile(params.id, this.info.profile.url, this.info.profile.view );
//    }

});