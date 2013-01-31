Ext.define('EC.Main.view.Weather.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    requires: [
        'EC.Main.view.Weather.CountriesCombo',
        'EC.Main.view.Weather.List',
        'EC.Main.view.Weather.Forecast'
    ],

    layout: 'border',
    
    border: false,
    
    tbar: [{
        xtype: 'WeatherCountriesCombo',
        hideLabel: true
    }, ' ', {
        xtype: 'textfield',
        width: '100%',
        name: 'search'
    }],
   
    items: [{
        region: 'west',
        xtype: 'WeatherCitiesList',
        width: 150
    }, {
        region: 'center',
        xtype: 'WeatherForecast'
    }]
});