Ext.define('EC.Main.view.News.List', {

    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.ux.PreviewPlugin',
        'xlib.grid.FiltersFeature',
        'EC.Main.view.News.CategoriesCombo',
        'EC.Main.view.News.ActualityCombo'
    ],
    
    store: 'EC.Main.store.News.News',
    
    layout: 'fit',
    
    forceFit: true,
    
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
            tpl: '<a href="#" action="readmore" newsid="{id}">{title}</a>'
        }, {
            xtype: 'datecolumn',
            header: 'Дата и время публикации',
            width: 150,
            format: 'd.m.Y H:i',
            dataIndex: 'date'
        }, {
            xtype: 'templatecolumn',
            header: 'Автор',
            width: 100,
            tpl: '{author}'
        }, {
            xtype: 'templatecolumn',
            header: 'Категория',
            width: 100,
            dataIndex: 'category_id',
            tpl: '{category}'
        }],
        
        this.tbar = [{
            xtype: 'tbtext',
            style: 'color: #04408C; font-weight: bold;',
            text: 'Фильтр:'
        }, {
            xtype: 'NewsCategoriesCombo'
        }, ' ', {
            xtype: 'NewsActualityCombo'
//        }, '->', {
//            icon: '/images/icons/fam/feed_add.png',
//            tooltip: 'RSS подписка'
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});