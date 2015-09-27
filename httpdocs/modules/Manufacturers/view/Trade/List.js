Ext.define('EC.Manufacturers.view.Trade.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ManufacturersTradeViewList',

    hideHeaders: true,

    listeners: {
        itemclick: function( grid, record, item, index, e, eOpts ){
            var url = record.get('url');
            this.fireEvent('rowClicked',url);
        }
    },

    store: {

        storeId: 'TradeViewListStore',

        autoLoad: false,

        fields: ['id', 'name', 'type', 'url'],

        data : [

            {id: 1, name: 'Mitsubishi Electric', type: 'Кондиционирование, отопление, вентиляция ', url: 'http://www.mitsubishi-aircon.ru'},
            {id: 2, name: 'Daikin', type: 'Кондиционирование, отопление, вентиляция', url: 'http://www.daikin.ru/'},
            {id: 3, name: 'Panasonic', type: 'Кондиционирование', url: 'http://www.panasonic.ru/'},
            {id: 4, name: 'General climate ', type: 'Кондиционирование, вентиляция, отопление', url: 'http://generalclimate.ru/'},
            {id: 5, name: 'Lessar', type: 'Кондиционирование, вентиляция', url: 'http://lessar.ru/'},
            {id: 6, name: 'Ballu', type: 'Кондиционирование, отопление', url: 'http://www.ballu.ru/'},
            {id: 7, name: 'Carrier', type: 'Кондиционирование, вентиляция', url: 'http://www.carrier-russia.ru/'},
            {id: 8, name: 'Danfoss', type: 'Отопление, автоматика', url: 'http://ic.danfoss.ru/'},
            {id: 9, name: 'GEA Klimatechnika', type: 'Кондиционирование, вентиляция, отопление', url: 'http://www.geagkm.ru'},
            {id: 10, name: 'Арктика', type: 'Вентиляция', url: 'http://arktika.ru/'},
            {id: 11, name: 'NED', type: 'Вентиляция, автоматизация', url: 'http://air-ned.com/ '},
            {id: 12, name: 'SistemAir', type: 'Вентиляция', url: 'http://www.systemair.com/ru/Russia/'},
            {id: 13, name: 'Ostberg', type: 'Вентиляция', url: 'http://osberg-russia.ru/'},
            {id: 14, name: 'Remak', type: 'Вентиляция', url: 'http://www.remak-moscow.ru/'},
            {id: 15, name: 'Meibes', type: 'Отопление, автоматика', url: 'http://meibes.ru/'},
            {id: 16, name: 'KOFULSO', type: 'Трубы', url: 'http://www.kofulso-olton.ru/techdocs/instruction/'},
            {id: 17, name: 'Imp Klima', type: 'Отопление', url: 'http://imp-klima.ru/'},
            {id: 18, name: 'REHAU', type: 'Водоснабжение, отопление, окна', url: 'http://www.rehau.com/RU_ru/'},
            {id: 19, name: 'TECE', type: 'Водоснабжение, канализация', url: 'http://www.tece.ru/ru'},
            {id: 20, name: 'KAN-therm', type: 'Водоснабжение', url: 'http://ru.kan-therm.com/'},
            {id: 21, name: 'Cupori Oy', type: 'Водоснабжение, отопление', url: 'http://www.cupori.com/ru'},
            {id: 22, name: 'KME', type: 'Трубы', url: 'http://kme.ru/ru/'},
            {id: 23, name: 'WIELAND SANCO', type: 'Трубы', url: 'http://www.wieland.ru'},
            {id: 24, name: 'Alurad', type: 'Отопление, водоснабжение', url: 'http://www.alurad.ru/'},
            {id: 25, name: 'Global radiatori', type: 'Отопление', url: 'http://globalradiator.ru/'},
            {id: 26, name: 'Sira', type: 'Отопление', url: 'http://www.siragroup.it/ru'},
            {id: 27, name: 'JAGA', type: 'Отопление', url: 'http://www.jaga-design.ru/'},
            {id: 28, name: 'VARMANN', type: 'Отопление', url: 'http://he.varmann.ru/'},
            {id: 29, name: 'MINIB', type: 'Отопление', url: 'http://minib.msk.ru'},
            {id: 30, name: 'Mohlenhoff', type: 'Отопление, охлаждение', url: 'http://www.mohlenhoff.ru/'},
            {id: 31, name: 'Zehnder', type: 'Отопление', url: 'http://zehnder.su/contacts/'},
            {id: 32, name: 'Korado', type: 'Отопление', url: 'http://www.korado.ru/'},
            {id: 33, name: 'Конрад', type: 'Отопление', url: 'http://www.konrad-group.ru/'},
            {id: 34, name: 'Arbonia', type: 'Отопление, водоснабжение', url: 'http://www.arbonia.su/'},
            {id: 35, name: 'Dia Norm', type: 'Отопление', url: 'http://www.dia-norm.ru/about/'},
            {id: 36, name: 'Demir Dokum', type: 'Строительство дачных домов и коттеджей', url: 'http://www.demirdokum.ru/'},
            {id: 37, name: 'Chappee', type: 'Отопление', url: 'http://www.chappee.ru/'},
            {id: 38, name: 'ABB', type: 'Электрика', url: 'http://www.abb.ru/'},
            {id: 39, name: 'Schneider Electric', type: 'Электрика', url: 'http://www.schneider-electric.ru'},
            {id: 40, name: 'GIERSCH', type: 'Отопление', url: 'http://www.giersch.ru/'},
            {id: 41, name: 'Kermi', type: 'Отопление, водоснабжение', url: 'http://www.kermi.ru/'},
            {id: 42, name: 'KAMPMANN', type: 'Отопление, охлаждение, вентиляция', url: 'http://www.kampmann.ru/'},
            {id: 43, name: 'Viega', type: 'Водоснабжение, канализация', url: 'http://www.viega.ru/'},
            {id: 44, name: 'REFLEX', type: 'Отопление, охлаждение', url: 'http://www.reflex-rus.ru/'},
            {id: 45, name: 'ВЕЗА', type: 'Кондиционирование, вентиляция', url: 'http://www.veza.ru/'},
            {id: 46, name: 'Маммут Климат', type: 'Кондиционирование, вентиляция, отопление', url: 'http://www.mammoth-russia.ru/'},
            {id: 47, name: 'Varmann', type: 'Отопление', url: 'http://varmann.ru/'},
            {id: 48, name: 'KTK KLIMATECHNIK', type: 'Кондиционирование', url: 'http://www.ktk.it/'}
        ]
    },

    columns: [
        {
            text: 'Название',
            xtype: 'templatecolumn',
            tpl: '{name}<br/><small>({type})</small>',
            width: '100%'
        }
    ]
});