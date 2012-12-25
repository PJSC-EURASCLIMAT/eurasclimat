Ext.define('EC.Main.view.News', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Main.store.News',
    
    layout: 'fit',
    
    hideHeaders: true,
    
    disableSelection: true,
    
    enableRow
    
    viewConfig: {
        
        trackOver: false,
        
        stripeRows: false
        
    },

    columns: [{
        xtype: 'templatecolumn',
        flex: 1,
        tpl:'<div style="padding: 10px 0;">' +
            '<h1><a href="#" action="readmore" newsid="{id}">{title}</a></h1>' +
            '<p style="color: grey; padding: 10px 0;">{date}</p>' +
            'Автор: <a href="#">{author}</a> ' +
            'Категория: <a href="#">{category}</a>' +
            '<br/><br/>{short_text}' +
            '<div align="right" style="padding-top: 10px;">' +
            '<a href="#" action="readmore" newsid="{id}">Читать далее</a></div></div>'
    }],
    
    initComponent: function() {
        
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