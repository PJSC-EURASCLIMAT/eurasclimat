Ext.define('EC.Main.view.ArticlePortlet', {

    extend: 'Ext.panel.Panel',

    autoScroll: true,
    
    layout: 'fit',
    
    bbar: ['->', {
        text: 'Подробнее',
        pressed: true,
        action: 'filter'
    }],
    
    html: '<div style="text-align: justify; padding: 10px;">' +
        '<p style="text-indent: 2em;">Lorem ipsum dolor sit amet, ' +
        'consectetur adipiscing elit. Nam risus arcu, lobortis sit ' +
        'amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. ' +
        'Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. ' +
        'Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue ' +
        'facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, ' +
        'suscipit ut vehicula non, interdum vitae eros.</p>'
        + '</div>'
});