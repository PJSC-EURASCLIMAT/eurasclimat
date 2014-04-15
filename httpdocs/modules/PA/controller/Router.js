Ext.define('EC.PA.controller.Router', {
    extend: 'Ext.app.Controller',

    getURL: '/json/pa/info/get-account-info',

    showProfile: function(recordId) {
        Ext.Ajax.request({
            params: {
                id: recordId
            },
            url: this.getURL,
            success: function(response, opts) {
                var data = Ext.decode(response.responseText).data;

                if (!Ext.isEmpty(data)) {
                    var card = Ext.create('EC.PA.view.Info');
                    card.showTpl.overwrite(card.down('panel').body, data);
                }

            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить карточку специалиста.');
            },
            scope: this
        });
        Ext.Router.redirect('');
    }

});