Ext.define('xlib.EmptyCombo', {

    extend: 'Ext.form.ComboBox',

    alias: ['widget.EmptyCombo'],

    initComponent: function() {

        this.callParent(arguments);

        var emptyRec = this.store.getById('');

        if (!Ext.isEmpty(emptyRec)) {
           return;
        }

        this.valueField = (!Ext.isEmpty(this.valueField)) ? this.valueField : 'id';
        this.displayField = (!Ext.isEmpty(this.displayField)) ? this.displayField : 'name';

        var data = {};
        data[this.valueField] = '';
        data[this.displayField] = (!Ext.isEmpty(this.emptyFieldText)) ? this.emptyFieldText : '- Все -';

        this.getStore().on('load', function(store, records, success, eOpts) {
            store.insert(0, data);
            if (Ext.isEmpty(this.getValue())) {
                this.suspendEvents();
                this.setValue('');
                this.resumeEvents();
            }
        }, this);
    },

    getFilter: function() {
        return this.getValue() == '' ? '' : {eq: parseInt(this.getValue())};
    }
});