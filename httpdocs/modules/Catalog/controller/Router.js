Ext.define('EC.Catalog.controller.Router', {
    
    extend: 'Ext.app.Controller',

    showInfo: function(params, id) {
        var me = this,
            tpl = me[params.category + 'Tpl'];

        Ext.Ajax.request({
            params: params,
            url: '/json/catalog/info/get',
            success: function ( response, opts ) {
                var data = Ext.decode(response.responseText).data;
                if ( Ext.isEmpty( data ) ) return;

                var classpath = this.createExtPath(opts.params.category);

                var win = Ext.create('EC.Catalog.view.' + classpath + '.Show');

                win.update( data );
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Не удалось загрузить карточку специалиста.');
            },
            scope: this
        });
        Ext.Router.redirect('');
    },

    createExtPath: function( path ) {
        var str = path.split('_');
        for ( var i = 0; i < str.length; i++ ) {
            str[i] = Ext.String.capitalize(str[i]);
        }
        return str.join('.');
    }

});