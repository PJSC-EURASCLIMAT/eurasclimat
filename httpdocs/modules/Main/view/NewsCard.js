Ext.define('EC.Main.view.NewsCard', {

    extend: 'Ext.panel.Panel',

    autoScroll: true,
    
    layout: 'fit',
    
    columns: [{
        xtype: 'templatecolumn',
        flex: 1,
        tpl:'<h1>{title}</h1><p style="color: grey; padding: 10px 0;">{date}</p>' +
            'Автор: <a href="#">{author}</a> ' +
            'Категория: <a href="#">{category}</a>' +
            '<br/><br/><p>{short_text}</p>' +
            '<br/><div align="right"><a href="#">Читать далее</a>'
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