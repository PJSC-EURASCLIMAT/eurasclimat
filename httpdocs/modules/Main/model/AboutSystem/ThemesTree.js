Ext.define('EC.Main.model.AboutSystem.ThemesTree', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'parent_id',
        'account_id',
        {name: 'extended', type: 'boolean'}
    ]
    
});