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
        '<h5 style="text-align: center;">Развитие партнерских взаимоотношений ' +
        'ОАО «ЕВРАЗКЛИМАТ» с контрагентами – участниками проектов</h5>' +
        '<p style="text-indent: 2em;">' +
        'Компания ОАО «Евразклимат», ежегодно реализующая большое количество ' +
        'сложных инженерных проектов, обладающая прекрасно выстроенной системой ' +
        'планирования и исполнения проектов, ведет непрерывную работу ' +
        'по оптимизации и интенсификации рабочих взаимоотношений с контрагентами.</p>'
        + '</div>'
});