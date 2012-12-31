Ext.define('EC.Main.model.News.News', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        {name: 'date', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        'category_id',
        'category',
        'account_id',
        'author',
        'title',
        'short_text'
    ]
});