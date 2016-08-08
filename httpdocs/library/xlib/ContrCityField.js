Ext.define('xlib.ContrCityField', {
    
    extend: 'Ext.form.FieldContainer',

    alias: ['widget.ContrCityField'],

    country_id: null,

    city_id: null,

    layout: 'anchor',

    margin: '0 0 0 0',

    initComponent: function() {

        this.items = [
            {
                xtype: 'combo',
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Страна',
                editable: false,
                queryMode: 'local',
                anchor: '100%',
//                labelWidth: 60,
                allowBlank: false,
                defaultValue: this.country_id, //Россия
                name: 'country_id',
//                hiddenName: 'country_id',
                value: this.country_id,
                listeners: {
                    change: this.countryChanged,
                    scope: this
                },
                store: {
                    storeId: 'CountriesStore',
                    autoLoad: true,
                    fields: ['id', 'name'],
                    proxy: {
                        type: 'ajax',
                        url: '/json/default/locations/get-countries',
                        reader: {
                            type: 'json',
                            root: 'data',
                            successfield: 'success'
                        }
                    }
                }

            },
            {
                xtype: 'combo',
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Город',
                defaultValue: this.city_id,
                editable: false,
                allowBlank: false,
                queryMode: 'local',
                anchor: '100%',
//                labelWidth: 60,
                name: 'city_id',
                value: this.city_id,
//                hiddenName: 'city_id',
//                value: '',
                store: {
                    storeId: 'CitiesStore',
//                    autoLoad: true,
                    fields: ['id', 'name'],
                    proxy: {
                        type: 'ajax',
                        url: '/json/default/locations/get-cities-by-country-code',
                        reader: {
                            type: 'json',
                            root: 'data',
                            successfield: 'success'
                        }
                    }
                }

            }

        ];
        
        this.callParent(arguments);

        this.cityCombo = this.down('[name=city_id]');
        this.countryCombo = this.down('[name=country_id]');

//        this.cityCombo.setValue(this.city_id);
//        this.countryCombo.setValue(this.country_id);

        this.countryCombo.getStore().on('load', function(store, records, success, eOpts) {
            store.insert(0, {id: '', name: '- Весь мир -'});
            if (Ext.isEmpty(this.countryCombo.getValue())) {
                this.countryCombo.suspendEvents();
                this.countryCombo.setValue('');
                this.countryCombo.resumeEvents();
            }
        }, this);
        this.cityCombo.getStore().load({id: this.countryCombo.getValue()});
    },

    countryChanged: function() {
        var city_id = this.cityCombo.getValue();
        this.cityCombo.setValue(null);
        this.cityCombo.getStore().load({
            id: this.countryCombo.getValue(),
            callback: function(records, operation, success) {
                if (this.cityCombo.getStore().getById(city_id) !== null) {
                    this.cityCombo.setValue(city_id);
                }
            },
            scope:this
        });


    },
    
    getFilter: function() {
        return this.getValue() == '' ? '' : {eq: parseInt(this.getValue())};
    }
});