Ext.define('EC.Main.view.1C', {

    extend: 'Ext.panel.Panel',
    
    alias: 'widget.1CPanel',
    
    id: '1C-tab',
    
    title: '1С Предприятие',
    
    icon: '/images/1C.png',
    
    layout: 'fit',
    
    html: '<iframe id="eventsIFrame" width="100%" height="100%" ' +
            'src="http://95.169.190.193/eurasclimat/ru_RU/"></iframe>'

});