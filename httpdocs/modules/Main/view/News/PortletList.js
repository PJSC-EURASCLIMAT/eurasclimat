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
            tpl: '<a href="#" title="Автор: {author}.\n' +
                 'Категория: {category}." action="readmore" newsid="{id}">{title}</a>'
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
            tpl: '<a href="#" action="showperson" personid="{account_id}">{author}</a>'
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
        }, '->', {
            icon: '/images/icons/fam/feed_add.png',
            tooltip: 'RSS подписка'
        }];
        
//        this.bbar = Ext.create('Ext.PagingToolbar', {
//            store: this.store,
//            displayInfo: true,
//            plugins: Ext.create('xlib.ProgressBarPager', {})
//        });
        
        this.callParent(arguments);
    }
});