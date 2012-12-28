Ext.define('EC.Main.view.News', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Main.store.News',
    
    layout: 'fit',
    
//    hideHeaders: true,
//    
//    disableSelection: true,
//    
//    viewConfig: {
//        
//        trackOver: false,
//        
//        stripeRows: false
//        
//    },
//
    forceFit: true,
    
    initComponent: function() {
        
//        this.columns = [{
//            xtype: 'templatecolumn',
//            tpl:'<div style="padding: 10px 0; white-space: normal;">' +
//                '<h1><a href="#" action="readmore" newsid="{id}">{title}</a></h1>' +
//                '<p style="color: grey; padding: 10px 0;">{date}</p>' +
//                'Автор: <a href="#">{author}</a> ' +
//                'Категория: <a href="#">{category}</a>' +
//                '<br/><br/>{short_text}' +
//                '<div align="right" style="padding-top: 10px;">' +
//                '<a href="#" action="readmore" newsid="{id}">Читать далее</a></div></div>'
//        }],
        
        this.columns = [{
            xtype: 'templatecolumn',
            header: 'Заголовок новости',
//            flex: 1,
            tpl: '<a href="#" action="readmore" newsid="{id}">{title}</a>'
        }, {
            xtype: 'datecolumn',
            header: 'Дата и время публикации',
//            width: 150,
            format: 'd.m.Y H:i',
            dataIndex: 'date'
        }, {
            xtype: 'templatecolumn',
            header: 'Автор',
//            width: 100,
            tpl: '<a href="#" action="showperson" personid="{account_id}">{author}</a>'
        }, {
            xtype: 'templatecolumn',
            header: 'Категория',
//            width: 100,
            dataIndex: 'category_id',
            tpl: '{category}'
        }],
        
        this.tbar = [{
            xtype: 'tbtext',
            style: 'color: #04408C; font-weight: bold;',
            text: 'Фильтр:'
        }, {
            xtype: 'tbtext',
            text: 'Категория'
        }, {
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name', 
            editable: false,
            value: '',
            store: { 
                fields: ['id', 'name'], 
                data: [{
                    id:     '',
                    name:   'Все категории'
                }, {
                    id:     '1',
                    name:   'Общие новости'
                }]
            }
        }, ' ', {
            xtype: 'tbtext',
            text: 'Актуальность'
        }, {
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name', 
            editable: false,
            value: '',
            store: { 
                fields: ['id', 'name'], 
                data: [{
                    id:     '',
                    name:   'Все новости'
                }, {
                    id:     'today',
                    name:   'Сегодняшние новости'
                }, {
                    id:     'yesterday',
                    name:   'Вчерашние новости'
                }, {
                    id:     'last3days',
                    name:   'За последние три дня'
                }, {
                    id:     'lastweek',
                    name:   'За последнюю неделю'
                }, {
                    id:     'lastmonth',
                    name:   'За последний месяц'
                }]
            }
        }, '->', {
            icon: '/images/icons/fam/feed_add.png',
            tooltip: 'RSS подписка'
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});