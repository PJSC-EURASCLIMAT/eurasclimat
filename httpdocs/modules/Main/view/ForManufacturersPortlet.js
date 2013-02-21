Ext.define('EC.Main.view.ForManufacturersPortlet', {

    extend: 'Ext.panel.Panel',

    autoScroll: true,
    
    layout: 'fit',
    
    bbar: ['->', {
        text: 'Подробнее',
        pressed: true,
        action: 'filter'
    }],
    
    html: '<div style="text-align: justify; padding: 10px;">' +
        '<p style="text-indent: 2em;">' +
        'Непременным условием эффективной работы Портала является укрепление ' +
        'партнерских отношений с производителями современного инженерного оборудования, ' +
        'выстраивание системы работы на Портале, исходя из их интересов.</p>'
        + '</div>'
});