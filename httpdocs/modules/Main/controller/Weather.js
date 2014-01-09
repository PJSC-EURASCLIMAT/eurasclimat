Ext.define('EC.Main.controller.Weather', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.Main.view.Weather.PortletLayout',
        'EC.Main.view.Weather.Layout'
    ],
    
    run: function(container) {
        
        if ('portlet' == container.getXType()) {
            this.Layout = container.add(this.getView('EC.Main.view.Weather.PortletLayout').create());
        } else {
            this.Layout = container.add(this.getView('EC.Main.view.Weather.Layout').create());
        }

        this.Layout.down('toolbar CountriesCombo').on('change', this.getCities, this);
        this.Layout.down('WeatherCitiesList').on('itemclick', this.onItemClick, this);
        
        // set location to Russia (id:643), Moscow(id:27) for now
        this.Layout.down('toolbar CountriesCombo').setValue('643', true);
        this.Layout.down('WeatherCitiesList').getStore().on('load', function() { 
            this.Layout.down('toolbar textfield[name=search]').setValue('Москва');
            this.getForecast(27);
        }, this, {single: true});
    },
    
    onItemClick: function(grid, record, item, index, e, eOpts) {
       
        var link = e.target.attributes;
        
        if (!link.action || !link.cityID) {
            return;
        }
        
        this.getForecast(link.cityID.value);
    },
    
    getCities: function(combo, newValue, oldValue, eOpts) {
        
        if (!newValue) {
            return;
        }
        var store = this.Layout.down('WeatherCitiesList').getStore();
        store.load({id: newValue});
    },
    
    getForecast: function(cityID) {
        
        var panel = this.Layout.down('WeatherForecast');
        failure = function() {
//            Ext.Msg.alert('Ошибка', 'Ошибка при получении погоды');
            panel.update('Ошибка при получении погоды');
        }
        
        Ext.Ajax.request({
            url: '/json/default/weather/get-forecast-by-city-code',
            params: {id: cityID},
            failure: failure,
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp) {
                    failure();
                    return;
                }
                this.Layout.down('WeatherForecast').renderData(resp);
            },
            scope: this
        })
        
    }
});