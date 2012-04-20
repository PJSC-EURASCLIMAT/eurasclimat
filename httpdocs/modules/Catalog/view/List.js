Ext.define('EC.Catalog.view.List', {

    extend: 'Ext.grid.Panel',
   
    alias: ['widget.CatalogList'],
    
    store: 'EC.Catalog.store.ListStore',
    
    layout: 'fit',
    
    border: false,
    
    forceFit: true,
    
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
            header: 'Тип исполнения',
            dataIndex: 'implementation_type'
        }];

        this.callParent(arguments);
    }
    
});