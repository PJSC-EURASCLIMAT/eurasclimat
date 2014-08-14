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
            {id: 4, name: 'Госзакупки', url: 'http://www.zakupki.gov.ru/epz/main/public/home.html'},
            {id: 5, name: 'Аэрофлот', url: 'https://trade.aeroflot.ru/login'},
            {id: 6, name: 'Закупки Сбербанк-АСТ', url: 'http://zakupki.sbrf.sberbank-ast.ru/default.aspx'},
            {id: 7, name: 'Почта России', url: 'http://www.russianpost.ru/rp/company/ru/home/tenders/search'},
            {id: 8, name: 'ВТБ24', url: 'http://www.vtb24.ru/about/etp/Pages/etp_default.aspx'},
            {id: 9, name: 'Лукойл', url: 'http://www.lukoil.ru/tenders/tender__list_6_.html'},
            {id: 10, name: 'Газпромбанк', url: 'http://www.gazprombank.ru/tenders/list/'},
            {id: 11, name: 'Газпром', url: 'http://www.gazprom.ru/tenders/'},
            {id: 12, name: 'МГУ', url: 'http://concom.msu.ru/'},
            {id: 13, name: 'МГТС', url: 'http://www.mgts.ru/partner/purchase'},
            {id: 14, name: 'МТС', url: 'http://tenders.mts.ru'},
            {id: 15, name: 'Билайн', url: 'http://partners.beeline.ru/request.wbp'},
            {id: 16, name: 'Мегафон', url: 'http://moscow.corp.megafon.ru/about/custom/'},
            {id: 17, name: 'УК ГК «Л’Этуаль» ООО «Алькор и Ко»', url: 'http://www.letoile.ru/company/history/'},
            {id: 17, name: 'ЗАО «Бизнес-Недвижимость»', url: 'http://www.uk.sistema.ru/purchases/index/'}
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
            text: 'Name',
            dataIndex: 'name',
            flex: 1
        }, {
            xtype: 'actioncolumn',
            width: 25,
            items: actions
        }];
        
        this.callParent(arguments);
    }
});