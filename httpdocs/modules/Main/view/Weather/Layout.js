Ext.define('EC.Main.view.Weather.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    requires: [
        'xlib.CountriesCombo',
        'EC.Main.view.Weather.List',
        'EC.Main.view.Weather.Forecast'
    ],

    layout: 'border',
    
    border: false,
    
    items: [{
        region: 'west',
        xtype: 'WeatherCitiesList',
        width: 150
    }, {
        region: 'center',
        xtype: 'WeatherForecast',
        minWidth: 220
    }]
});