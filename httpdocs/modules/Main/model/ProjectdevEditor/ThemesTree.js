Ext.define('EC.Main.model.ProjectdevEditor.ThemesTree', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'parent_id',
        'account_id',
        {name: 'extended', type: 'boolean'},
        {name: 'leaf', type: 'boolean'},
        {name: 'date_vote_begin', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_vote_end',   type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_discuss_begin', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_discuss_end',   type: 'date', dateFormat: 'Y-m-d H:i:s'},
    ]
});