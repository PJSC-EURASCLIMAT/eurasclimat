Ext.define('EC.Qualifications.controller.Router', {
    
    extend: 'Ext.app.Controller',

    getURL: '/json/crm/qualifications/get',

    showInfo: function(recordId) {
	
        Ext.Ajax.request({
            params: {
                id: recordId
            },
            url: this.getURL,
            success: function(response, opts) {
                var data = Ext.decode(response.responseText).data;

                if (!Ext.isEmpty(data)) {
                    var card = Ext.create('EC.Qualifications.view.Info');
                    card.showTpl.overwrite(card.down('panel').body, data);
                    card.setTitle(card.title + ' - ' + data.name);
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