Ext.define('EC.Main.view.ForSpecialistsPortlet', {

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
        'Самые широкие возможности открывает Портал для специалистов, ' +
        'заинтересованных участвовать в профильных им инженерных проектах. ' +
        'На Портале реализуются самые разнообразные проекты, в которых ' +
        'используется современное инженерное оборудования и широкий набор услуг.</p>'
        + '</div>'
});