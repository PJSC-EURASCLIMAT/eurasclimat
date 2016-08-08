Ext.define('EC.Main.model.SmokerCabin.ThemesTree', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'parent_id',
        'account_id',
        {name: 'extended', type: 'boolean'}
    ]
    
});