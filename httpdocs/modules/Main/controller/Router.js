Ext.define('EC.Main.controller.Router', {
    extend: 'Ext.app.Controller',

    getURL: '/json/default/news/get',

    showNew: function(recordId) {
        Ext.Ajax.request({
            params: {
                id: recordId
            },
            url: this.getURL,
            success: function(response, opts) {
                var data = Ext.decode(response.responseText).data;

                if (!Ext.isEmpty(data)) {
                    var card = Ext.create('EC.Main.view.News.Card');
                    card.showTpl.overwrite(card.down('panel').body, data);
                    card.setTitle(data.title);
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить новость.');
            },
            scope: this
        });
        Ext.Router.redirect('');
    }

});