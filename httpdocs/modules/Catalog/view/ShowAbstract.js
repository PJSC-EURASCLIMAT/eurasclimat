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

    initComponent: function() {

        this.tpl = new Ext.XTemplate(

            '<table width="100%" border="0">' +

                '<tr valign="top">' +

                    '<td width="320">' +
                        '<tpl if="[values.images.length] &gt; 0">' +
                            '<img src="/images/catalog/{[values.images[0].name]}"/>' +
                        '<tpl else>' +
                            '<img src="http://placehold.it/300x220"/>' +
                        '</tpl>' +

                        '<p>Цена: <b>{price}&nbsp;{[ this.getCurrency( values.currency_id ) ]}</b></p>' +
                    '</td>' +

                    '<td><h1>{name}</h1><p>Описание:</p><p class="description">{description}<p></td>' +

                '</tr>' +

                '<tr>' +
                	'<td colspan="2"><b>Технические характеристики:</b>' + 
                		'<table width="100%" border="1" cellspacing="0" cellpadding="0">' +
                			this.createPropsTpl() +                	
                		'</table>' +
            		'</td>' +
                '</tr>' +

            '</table>', {
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
        Ext.iterate(this.productProps.data, function(item) {
            content += '<tr><td>' + item.label + '</td><td><b>' + item.value + '</b></td></tr>';
        }, this);
        return content;
    }
});