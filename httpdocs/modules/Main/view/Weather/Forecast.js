Ext.define('EC.Main.view.Weather.Forecast', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.WeatherForecast',
    
    layout: 'fit',
    
    bodyPadding: 5,
    
    autoScroll: true,
    
    tbar: [{
        xtype: 'textfield',
        name: 'search',
        flex: 1
    }],
    
    tpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<tpl for="location">',
                '<div style="margin-bottom: 10px;">',
                    '<h1>{name}, {country_name}</h1>',
                '</div>',
            '</tpl>',
            '<tpl for="today">',
                '<div class="forecast-day-block">',
                    '<b>Сегодня, {[this.dateFormat(values.date)]}</b> <br/><br/>',
                    '<tpl for="data">',
                        '<div class="forecast-daypart-block">',
                            '{[this.getPartOfDay(values.hour)]} <br/><br/>',
                            '{ppcp}% <br/>',
                            '<img src="/images/forecast/{pict}" /> <br/>', 
                            '{t_min}&deg;<br/>{t_max}&deg;<br/><br/>',
                            '<small>{p_min}-{p_max}</small><br/><br/>',
                            '{[this.getWindRumb(values.wind_rumb)]}<br/>',
                            '{wind_min}-{wind_max}',
                        '</div>',
                    '</tpl>',
                '</div>',
            '</tpl>',
            '<tpl for="forecast">',
                '<div class="forecast-day-block">',
                    '<b>{[this.dateFormat(values.date)]}</b> <br/><br/>',
                    '<tpl for="data">',
                        '<div class="forecast-daypart-block">',
                            '{[this.getPartOfDay(values.hour)]} <br/><br/>',
                            '{ppcp}% <br/>',
                            '<img src="/images/forecast/{pict}" /> <br/>', 
                            '{t_min}&deg;<br/>{t_max}&deg;<br/><br/>',
                            '<small>{p_min}-{p_max}</small><br/><br/>',
                            '{[this.getWindRumb(values.wind_rumb)]}<br/>',
                            '{wind_min}-{wind_max}',
                        '</div>',
                    '</tpl>',
                '</div>',
            '</tpl>',
        '</tpl>',
        {
            getWindRumb: function(value) {
                
                var v = parseInt(value);
                
                if (v > 340 || v < 20) return 'C';
                if (v >= 20 && v <= 35) return 'C,С-В';
                if (v >= 35 && v <= 55) return 'C-В';
                if (v >= 55 && v <= 70) return 'В,C-В';
                if (v >= 70 && v <= 110) return 'В';
                if (v >= 110 && v <= 125) return 'В,Ю-В';
                if (v >= 125 && v <= 145) return 'Ю-В';
                if (v >= 145 && v <= 160) return 'Ю,Ю-В';
                if (v >= 160 && v <= 200) return 'Ю';
                if (v >= 200 && v <= 215) return 'Ю,Ю-З';
                if (v >= 215 && v <= 235) return 'Ю-З';
                if (v >= 235 && v <= 250) return 'З,Ю-З';
                if (v >= 250 && v <= 290) return 'З';
                if (v >= 290 && v <= 305) return 'З,С-З';
                if (v >= 305 && v <= 325) return 'С-З';
                if (v >= 325 && v <= 340) return 'С,С-З';
                    
            },
            
            getPartOfDay: function(value) {
                switch (value) {
                    case '3':  return 'ночь';
                    case '9':  return 'утро';
                    case '15': return 'день';
                    case '21': return 'вечер';
                }
            },
            
            dateFormat: function(value) {
                return Ext.util.Format.date(value, "d.m.Y");
            },
            
            getTodayDate: function() {
                return Ext.util.Format.date(new Date(), "d.m.Y");
            }
        }
    ),
    
    renderData: function(data) {
        this.tpl.overwrite(this.body, data);
    }
});