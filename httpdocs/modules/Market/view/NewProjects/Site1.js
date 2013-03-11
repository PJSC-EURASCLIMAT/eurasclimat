Ext.define('EC.Market.view.NewProjects.Site1', {

    extend: 'Ext.panel.Panel',

    layout: 'fit',
    
    html: '<iframe id="eventsIFrame" width="100%" height="100%" ' +
            'src="http://etp-micex.ru"></iframe>'
});