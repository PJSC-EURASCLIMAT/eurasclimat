Ext.define('EC.PA.model.Profile', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'active',  type: 'string'},
        {name: 'city',   type: 'string'},
        {name: 'country', type: 'string'},
        {name: 'expert_id', type: 'number'},
        {name: 'id', type: 'number'},
        {name: 'lang', type: 'string'},
        {name: 'login', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'tz', type: 'string'},
        {name: 'photo', type: 'string'
            ,convert: function (newValue, model) {
                if(typeof(newValue) === "undefined" || newValue === '' ){
                    return App.app.globals.avatarsDir + model.get('login') + '.jpg';
                }else {
                    return newValue;
                }
            }
        }
    ]

});