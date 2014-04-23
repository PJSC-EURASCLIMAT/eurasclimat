Ext.define('EC.Catalog.view.Conditioners.Show', {

    extend: 'EC.Catalog.view.ShowAbstract',
    
    alias: ['widget.ConditionersShow'],

    props: [
        'product_type_name',
        'implementation_type_name',

        'heatingcooling_id',
        'power_source_id',
        'country',
        'cooling_capacity',
        'heating_capacity',

        'air_consumption_min',
        'air_consumption_max',
        'noise_level_min',
        'noise_level_max',
        'dimensions',
        'warranty'
    ],

    initComponent: function() {



        this.callParent();

        this.tpl.getHeatingCooling = function( id ) {
            if ( Ext.isEmpty( id ) ) return;
            var map = {
                0: 'только охлаждение',
                1: 'охлаждение/нагрев'
            };
            return map[id];
        };

        // TODO может переименовать
        this.tpl.getCondPowerSource = function( id ) {
            debugger;
            if ( Ext.isEmpty( id ) ) return;
            var map = {
                0: 'Нет',
                1: 'Есть'
            };
            return map[id];
        };


    }

});