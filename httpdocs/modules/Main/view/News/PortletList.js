Ext.define('EC.Main.view.News.PortletList', {

    extend: 'Ext.grid.Panel',

    requires: [
        'xlib.grid.FiltersFeature',
        'EC.Main.view.News.CategoriesCombo',
        'EC.Main.view.News.ActualityCombo'
    ],
    
    store: 'EC.Main.store.News.News',
    
    layout: 'fit',
    
    features: [{
        id: 'filter_feature',
        ftype: 'filters', 
        encode: true, 
        showMenu: false,
        filters: [{
            type: 'numeric',
            dataIndex: 'category_id'
        }]
    }],
    
    verticalScroller: {
        trailingBufferZone: 15,
        leadingBufferZone: 15
    },
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'templatecolumn',
            header: 'Заголовок новости',
            flex: 1,
            tpl: '<a href="#/news/{id}" title="Автор: {author}.\nКатегория: {category}.">{title}</a>'
        }, {
            xtype: 'datecolumn',
            header: 'Опубликовано',
            width: 100,
            format: 'd.m.Y H:i',
            dataIndex: 'date'
        }, {
            xtype: 'templatecolumn',
            header: 'Автор',
            hidden: true,
            tpl: '<a href="#/profile/{account_id}/show">{author}</a>'
        }, {
            xtype: 'templatecolumn',
            header: 'Категория',
            hidden: true,
            dataIndex: 'category_id',
            tpl: '{category}'
        }],
        
        this.tbar = [{
            xtype: 'NewsCategoriesCombo',
            hideLabel: true
        }, ' ', {
            xtype: 'NewsActualityCombo',
            hideLabel: true
//        }, '->', {
//            icon: '/images/icons/fam/feed_add.png',
//            tooltip: 'RSS подписка'
        }];
        
        this.callParent(arguments);
    }
});