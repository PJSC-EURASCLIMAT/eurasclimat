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
        '<h5 style="text-align: center;">Партнерские взаимоотношения ' +
        'ОАО «ЕВРАЗКЛИМАТ» с производителями оборудования</h5>' +
        
        '<p style="text-indent: 2em;">' +
        'Непременным условием эффективной работы компании является укрепление ' +
        'партнерских отношений с производителями современного инженерного оборудования, ' +
        'выстраивание системы своей работы, с учётом интересов производителей.</p>' 
       
        + '</div>'
});