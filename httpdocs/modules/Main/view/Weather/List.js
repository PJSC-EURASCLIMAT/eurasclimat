Ext.define('EC.Main.view.Weather.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.WeatherCitiesList',
    
    layout: 'fit',
    
    forceFit: true,
    
    hideHeaders: true,
    
    store: { 
        
        storeId: 'WeatherListStore',
        
        autoLoad: false,
        
        fields: ['id', 'name', 'region'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/default/weather/get-cities-by-country-code',
            reader: {
                type: 'json',
                root: 'data',
                successfield: 'success'
            }
        }
    },
    
    tbar: [{
        xtype: 'WeatherCountriesCombo',
        hideLabel: true,
        flex: 1
    }],
    
    columns: [{
        xtype: 'templatecolumn',
        tpl: '<a href="#" action="go" cityID="{id}">{name}' +
             '<tpl if="region"> ({region})</tpl>' +
             '</a>'
    }]
});