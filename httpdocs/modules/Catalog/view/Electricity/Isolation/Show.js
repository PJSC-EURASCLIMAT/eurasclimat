Ext.define('EC.Catalog.view.Electricity.Isolation.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.ElectricityIsolationShow'],

    productProps: {
        product_type_name: {            name: 'Тип продукции'}
    },
    
    initComponent: function() {

        this.callParent();

        this.tpl.getOption = function( id ) {
            if ( Ext.isEmpty( id ) ) return;
            var map = {
                0: 'значение 0',
                1: 'значение 1'
            };
            return map[id];
        };
    }
});