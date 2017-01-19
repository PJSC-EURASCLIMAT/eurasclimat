Ext.define('EC.Market.view.Trade.List', {

    extend: 'Ext.tree.Panel',

    xtype: 'tree-grid',
    
    alias: 'widget.TradeViewList',

    hideHeaders: true,
    
    rootVisible: false,
    
    lines: false,

    listeners: {
        itemclick: function(grid, record, item, index, e, eOpts) {
            var url = record.get('url');
            this.fireEvent('rowClicked', url);
        }
    },

    store: {

        xtype: 'treestore',
        
        storeId: 'TradeViewListStore',

        autoLoad: false,

        fields: ['id', 'name', 'url'],

        root: null
    },

    initComponent: function() {
        
        var actions = !acl.isView('crm') ? [] : [{
            icon: '/images/icons/documents.png',
            tooltip: 'Документы',
            iconCls: 'x-btn',
            isDisabled: function(grid, rowIndex, colIndex, item, record) {
                return !(record.get('id') > 0);
            }, 
            handler: function(grid, rowIndex, colIndex) {
                this.fireEvent('docsClicked', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
        }];
        
        this.columns = [{
            xtype: 'treecolumn',
            dataIndex: 'name',
            flex: 1
        }, {
            xtype: 'templatecolumn',
            tpl: '<tpl if="url"><a href="{url}" target="_blank">Открыть в новом окне</a></tpl>',
            dataIndex: 'url',
            width: 50
        }, {
            xtype: 'actioncolumn',
            width: 25,
            items: actions
        }];
        
        this.callParent(arguments);
        
        this.getStore().setRootNode({
            expanded: true,
            children: [{
                name: 'Банки',
                expanded: false,
                children: [
                    {id: 2,  iconCls: 'noicon', leaf: true, name: 'Сбербанк-АСТ', url: 'http://utp.sberbank-ast.ru'},
                    {id: 6,  iconCls: 'noicon', leaf: true, name: 'Закупки Сбербанк-АСТ', url: 'http://zakupki.sbrf.sberbank-ast.ru/default.aspx'},
                    {id: 8,  iconCls: 'noicon', leaf: true, name: 'ВТБ', url: 'http://www.vtb.ru/group/purchases/all/'},
                    {id: 12, iconCls: 'noicon', leaf: true, name: 'Промсвязьбанк', url: 'http://www.psbank.ru/Bank/About/Tenders/Current'},
                    {id: 28, iconCls: 'noicon', leaf: true, name: 'Альфа-Банк', url: 'https://alfabank.ru/tenders/current/'}
                ]
            }, {
                name: 'Государственные системы',
                expanded: false,
                children: [
                    {id: 1,  iconCls: 'noicon', leaf: true, name: 'ЭТП ММББ', url: 'http://etp-micex.ru'},
                    {id: 4,  iconCls: 'noicon', leaf: true, name: 'ЗакупкиРУ', url: 'http://www.zakupki.gov.ru/epz/'},
                    {id: 29,  iconCls: 'noicon', leaf: true, name: 'Торговая Система "ОБОРОНТОРГ"', url: 'https://www.oborontorg.ru/'}
                ]
            }, {
                name: 'Энергетические компании',
                expanded: false,
                children: [
                    {id: 23, iconCls: 'noicon', leaf: true, name: 'РОСАТОМ', url: 'http://zakupki.rosatom.ru/'},
                    {id: 27, iconCls: 'noicon', leaf: true, name: 'Славнефть - закупки', url: 'http://www.slavneft.ru/supplier/procurement/'},
                    {id: 32, iconCls: 'noicon', leaf: true, name: 'НК Роснефть - закупки', url: 'http://zakupki.rosneft.ru/'}
                ]
            }, {
                name: 'Комерческие торговые системы',
                expanded: false,
                children: [
                    {id: 3,  iconCls: 'noicon', leaf: true, name: 'ЕЭТП (Росэлторг)', url: 'http://etp.roseltorg.ru'},
                    {id: 9,  iconCls: 'noicon', leaf: true, name: 'Бизнес недвижимость', url: 'http://www.uk.sistema.ru'},
                    {id: 15, iconCls: 'noicon', leaf: true, name: 'Фабрикант', url: 'http://www.fabrikant.ru'},
                    {id: 16, iconCls: 'noicon', leaf: true, name: 'B2B-Center', url: 'http://www.b2b-center.ru/personal/'},   
                    {id: 17, iconCls: 'noicon', leaf: true, name: 'Торговая Система "Спецстройторг"', url: 'http://www.sstorg.ru/market/?action=list_public_pdo_multilot&type=5360&status_group=sg_active'},
                    {id: 20, iconCls: 'noicon', leaf: true, name: 'Заказ РФ', url: 'http://zakazrf.ru'},
                    {id: 24, iconCls: 'noicon', leaf: true, name: 'ЭТП Газпромбанка', url: 'https://etpgaz.gazprombank.ru'},
                    {id: 26, iconCls: 'noicon', leaf: true, name: 'BiCo тендер', url: 'http://www.bicotender.ru'},
                    {id: 30, iconCls: 'noicon', leaf: true, name: 'АО ВО «Электроаппарат»', url: 'http://www.ea.spb.ru/zakupki/'},
                    {id: 31, iconCls: 'noicon', leaf: true, name: 'Supl.biz', url: 'https://supl.biz/'}
                ]
            }, {
                name: 'Медецинские учреждения',
                expanded: false,
                children: [
                    {id: 18, iconCls: 'noicon', leaf: true, name: 'Medsi.ru', url: 'http://medsi.ru/about/purchases/'}
                ]
            }, {
                name: 'Оброзовательные учреждения',
                expanded: false,
                children: [
                ]
            }, {
                name: 'Операторы сотовой связи',
                expanded: false,
                children: [
                    {id: 13, iconCls: 'noicon', leaf: true, name: 'МГТС', url: 'http://www.mgts.ru/partner/purchase'},
                    {id: 14, iconCls: 'noicon', leaf: true, name: 'МТС', url: 'http://tenders.mts.ru'}
                ]
            }, {
            	name: 'Строительные компании',
            	expanded: false,
            	children: [
    	           {id: 25, iconCls: 'noicon', leaf: true, name: 'ГВСУ «Центр»', url: 'http://tenders.gvsu.ru/'},
    	           {id: 30, iconCls: 'noicon', leaf: true, name: 'МОРТОН - закупки', url: 'https://zakupki.morton.ru/user/login/'}
	           ]
            }, {
                name: 'Транспортные компании',
                expanded: false,
                children: [
                    {id: 5,  iconCls: 'noicon', leaf: true, name: 'Аэрофлот', url: 'https://trade.aeroflot.ru'},
                    {id: 7,  iconCls: 'noicon', leaf: true, name: 'Почта России', url: 'http://www.russianpost.ru/rp/company/ru/home/tenders/search'},
                    {id: 10, iconCls: 'noicon', leaf: true, name: 'OTS tender (Метро)', url: 'http://sso.otc-tender.ru/Login.aspx'},
                    {id: 11, iconCls: 'noicon', leaf: true, name: 'ГУП «Московский метрополитен»', url: 'http://www.torgi-mosmetro.ru/torgi/'},
                    {id: 19, iconCls: 'noicon', leaf: true, name: 'РЖД (ТП)', url: 'http://etzp.rzd.ru/freeccee/main'},
                    {id: 21, iconCls: 'noicon', leaf: true, name: 'Московский аэропорт Домодедово', url: 'http://www.domodedovo.ru/ru/main/news/competition/'},
                    {id: 22, iconCls: 'noicon', leaf: true, name: 'Международный аэропорт Шереметьево', url: 'http://svo.aero/tenders/'}
                ]
            }, {
                name: 'Учреждения общепита',
                expanded: false,
                children: [
                ]
            }]
        });
    }
});