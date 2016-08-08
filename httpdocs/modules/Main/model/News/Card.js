Ext.define('EC.Main.model.News.Card', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'date',
        'category_id',
        'category',
        'account_id',
        'author',
        'title',
        'short_text',
        'long_text'
    ]
});