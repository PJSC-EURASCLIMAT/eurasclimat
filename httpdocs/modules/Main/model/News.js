Ext.define('EC.Main.model.News', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'date',
        'category_id',
        'category',
        'account_id',
        'author',
        'title',
        'short_text'
    ]
});