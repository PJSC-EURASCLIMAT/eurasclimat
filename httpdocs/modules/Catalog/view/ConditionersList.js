Ext.define('EC.Catalog.view.ConditionersList', {

    extend: 'Ext.grid.Panel',
    
    requires: ['xlib.RowExpander'],
   
    alias: ['widget.ConditionersList'],
    
    store: 'EC.Catalog.store.Conditioners',
    
    layout: 'fit',
    
    border: false,
    
    forceFit: true,
    
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<table><tr>',
            '<td>',
            '<p><b>Охлаждение:</b> {cooling}</p><br>',
            '<p><b>Обогрев:</b> {heating}</p><br><br>',
            '<p><b>Площадь м²:</b> {square}</p><br>',
            '</td><td>',
            '<p><b>Охлаждение:</b> {cooling1}</p><br>',
            '<p><b>Обогрев:</b> {heating1}</p><br><br>',
            '<p><b>Площадь м³:</b> {volume}</p><br>',
            '</td>',
            '</tr></table>'
        ]
    }],
    
    initComponent: function() {

        this.columns = [{
            header: 'Группа оборудования', 
            dataIndex: 'group'
        }, {
            header: 'Наименование',
            dataIndex: 'name'
        }, {
            header: 'Марка',
            dataIndex: 'mark'
        }, {
            header: 'Маркировка',
            dataIndex: 'marking'
        }, {
            header: 'Тип продукции',
            dataIndex: 'product_type'
        }, {
            header: 'Тип исполнения',
            dataIndex: 'implementation_type'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'cooling'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'heating'
        }, {
            header: 'Площадь м²',
            hidden: true,
            dataIndex: 'square'
        }, {
            header: 'Площадь м³',
            hidden: true,
            dataIndex: 'volume'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'cooling1'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'heating1'
        }, {
            header: 'Лет',
            hidden: true,
            dataIndex: 'years'
        }, {
            header: 'Склад',
            hidden: true,
            dataIndex: 'storage'
        }, {
            header: 'Резерв',
            hidden: true,
            dataIndex: 'reserve'
        }, {
            header: 'Заказ',
            hidden: true,
            dataIndex: 'order'
        }, {
            header: 'Ед. изм.',
            hidden: true,
            dataIndex: 'measure'
        }, {
            header: 'Цена',
            dataIndex: 'price'
        }];

        this.callParent(arguments);
    }
    
});