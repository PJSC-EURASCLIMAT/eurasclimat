Ext.define('EC.Market.view.Trade.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.TradeViewList',

    hideHeaders: true,

    listeners: {
        itemclick: function(grid, record, item, index, e, eOpts) {
            var url = record.get('url');
            this.fireEvent('rowClicked', url);
        }
    },

    store: {

        storeId: 'TradeViewListStore',

        autoLoad: false,

        fields: ['id', 'name', 'url'],

        data : [
            {id: 1, name: 'ЭТП ММББ', url: 'http://etp-micex.ru'},
            {id: 2, name: 'Сбербанк-АСТ', url: 'http://utp.sberbank-ast.ru'},
            {id: 3, name: 'ЕЭТП (Росэлторг)', url: 'http://etp.roseltorg.ru'},
            {id: 4, name: 'ЗакупкиРУ', url: 'http://www.zakupki.gov.ru/epz/'},
            {id: 5, name: 'Аэрофлот', url: 'https://trade.aeroflot.ru'},
            {id: 6, name: 'Закупки Сбербанк-АСТ', url: 'http://zakupki.sbrf.sberbank-ast.ru/default.aspx'},
            {id: 7, name: 'Почта России', url: 'http://www.russianpost.ru/rp/company/ru/home/tenders/search'},
            {id: 8, name: 'ВТБ', url: 'http://www.vtb.ru/group/purchases/all/'},
            {id: 9, name: '«Лидер-инвест»', url: 'http://www.uk.sistema.ru'},
            {id: 10, name: 'OTS tender (Метро)', url: 'http://sso.otc-tender.ru/Login.aspx'},
            {id: 11, name: 'ГУП «Московский метрополитен»', url: 'http://www.torgi-mosmetro.ru/torgi/'},
            {id: 12, name: 'Промсвязьбанк', url: 'http://www.psbank.ru/Bank/About/Tenders/Current'},
            {id: 13, name: 'МГТС', url: 'http://www.mgts.ru/partner/purchase'},
            {id: 14, name: 'МТС', url: 'http://tenders.mts.ru'},
            {id: 15, name: 'Фабрикант', url: 'http://www.fabrikant.ru'},
            {id: 16, name: 'Гос Услуги', url: 'http://esia.gosuslugi.ru'},
            {id: 17, name: 'Спецстрой', url: 'http://www.sstorg.ru'},
            {id: 18, name: 'Торговая Система "Спецстройторг"', url: 'http://www.sstorg.ru/market/?action=list_public_pdo_multilot&type=5360&status_group=sg_active'},
            {id: 19, name: 'Medsi.ru', url: 'http://medsi.ru/about/purchases/'},
            {id: 20, name: 'РЖД (ТП)', url: 'http://etzp.rzd.ru/freeccee/main'},
            {id: 21, name: 'Заказ РФ', url: 'http://zakazrf.ru'},
            {id: 22, name: 'B2B-Center', url: 'http://www.b2b-center.ru/personal/'}   
        ]
    },

    initComponent: function() {
        
        var actions = !acl.isView('crm') ? [] : [{
            icon: '/images/icons/documents.png',
            tooltip: 'Документы',
            iconCls: 'x-btn',
            hidden: !acl.isView('crm'),
            handler: function(grid, rowIndex, colIndex) {
                this.fireEvent('docsClicked', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
        }];
        
        this.columns = [{
            dataIndex: 'name',
            flex: 1
        }, {
            xtype: 'templatecolumn',
            tpl: '<a href="{url}" target="_blank">Открыть в новом окне</a>',
            dataIndex: 'url',
            width: 50
        }, {
            xtype: 'actioncolumn',
            width: 25,
            items: actions
        }];
        
        this.callParent(arguments);
    }
});