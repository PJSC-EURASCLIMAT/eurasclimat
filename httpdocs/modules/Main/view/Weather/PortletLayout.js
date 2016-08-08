Ext.define('EC.Main.view.Weather.PortletLayout', {
    
    extend: 'EC.Main.view.Weather.Layout',
    
    items: [{
        region: 'center',
        xtype: 'WeatherCitiesList'
    }, {
        region: 'east',
        xtype: 'WeatherForecast',
        width: 230
    }]
});