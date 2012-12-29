Ext.define('EC.Main.model.PersonCard', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        {
            name: 'roles',
            convert: function (value, record) {
                if (Ext.isArray(value)) {
                    var roles = [];
                    Ext.each(value, function(v) {
                        roles.push(v.name);
                    });
                    return roles.join(', ');
                } else {
                    return value;
                }
            }
        }
    ]
});