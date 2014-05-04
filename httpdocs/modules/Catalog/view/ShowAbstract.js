Ext.define('EC.Catalog.view.ShowAbstract', {
    
    extend: 'Ext.window.Window',
    
    title: 'Карточка товара',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    resizable: true,
    
    maximizable: true,
    
    modal: true,

    width: 800,
    
    height: 500,
    
    contentsTpl: '',

    bodyCls: 'catalog-product-card',

    productProps: {},

    //TODO нужно разрулить страну изготовления

    initComponent: function() {

        this.tpl = new Ext.XTemplate(

            '<table width="100%" border="0">' +

                '<tr valign="top">' +

                    '<td rowspan="2" width="320">' +
                        '<tpl if="[values.images.length] &gt; 0">' +
                            '<img src="/images/catalog/{[values.images[0].name]}"/>' +
                        '<tpl else>' +
                            '<img src="http://placehold.it/300x220"/>' +
                        '</tpl>' +

                        '<tpl if="[values.url.length] &gt; 0"><p>Ссылка: <b>{url}</b></p></tpl>' +
                        '<tpl if="[values.price.length] &gt; 0"><p>Цена: <b>{price}&nbsp;{[ this.getCurrency( values.currency_id ) ]}</b></p></tpl>' +
                        '<tpl if="[values.mount_price.length] &gt; 0"><p>СМР: <b>{mount_price}&nbsp;р.</b></p></tpl>' +
                        '<tpl if="[values.description.length] &gt; 0"><p>Описание:</p><p class="description">{description}<p></tpl>',

                    '</td>' +

                    '<td colspan="3" height="40">' +
                        //TODO будет name
                        '<h1><p>{name}</p></h1>' +
                        '<tpl if="[values.mark_name.length] &gt; 0"><p>Марка (брэнд): <b>{mark_name}</b></p></tpl>' +
                        '<tpl if="[values.code.length] &gt; 0"><p>Артикул: <b>{code}</b></p></tpl>' +
                        '<tpl if="[values.group_name.length] &gt; 0"><p>Группа оборудования: <b>{group_name}</b></p></tpl>',
                    '</td>' +

                '</tr>' +

                '<tr valign="top">' +
                    '<td class="settings">' + this.createPropsTpl() + '</td>' +
                '</tr>' +

            '</table>',{
                getCurrency: function( currency_id ) {
                    if ( Ext.isEmpty( currency_id ) ) return '';
                    var map = {
                        0: ' ',
                        1: 'Руб',
                        2: 'USD',
                        3: 'EUR'
                    };
                    return map[currency_id];
                }
            });
            
        this.callParent();
    },

    createPropsTpl: function() {
        var content = '';
        Ext.iterate(this.productProps, function(key) {
            var prop = this.productProps[key];
            content += '<tpl if="[values.' + key + '.length] &gt; 0"><p>' 
                    + (prop.name || key) + ': <b>{' + key + '}&nbsp;' 
                    + (prop.units || '') + '</b></p></tpl>';
        }, this);
        return content;
    }
});