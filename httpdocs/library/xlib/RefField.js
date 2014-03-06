Ext.define('xlib.RefField', {
    
    extend: 'Ext.form.field.Trigger',

    requires: [
        'Ext.grid.Panel',
        'Ext.window.Window'
    ],
    
    alias: ['widget.RefField'],

    editable: false,

    windowConfig: {},

    gridConfig: {},

    storeConfig: {},

    valueField: 'id',

    displayField: 'name',

    multiSelect: false,

    word: ['', 'позиция', 'позиции', 'позиций'],

    windowTitle: 'Справочник',

    /**
     * Айдишники выбранных полей
     * */
    realValue: [],

    checkedRecords: [],



    /**
     * TODO обработать multiSelect:
     * true - грид c галочками + в комибик количество "5 позиций выбрано"
     * полный список в тултип
     * false - без галок, выбор на селект + displayField в комбик
     * TODO множественный setValue для [массив айдишников], чтобы в гриде выставлял
     * TODO c beforedestroy разобраться
     * */

    listeners: {
        beforedestroy: function() {
//            this.grid.destroy();
//            this.store.destroy();
//            this.win.destroy();

            this.grid = null;
            this.store = null;
            this.win = null;

        }
    },

    initComponent: function() {

        this.checkedRecords = [];

        this.selCompleteFn = (this.multiSelect) ? this.multipleSelectionComplete : this.singleSelectionComplete;

        this.configureStore();
        this.configureGrid();

        this.win = Ext.create('Ext.window.Window', {
            title: this.windowTitle,
            width: 600,
            height: 400,
            modal: true,
            closeAction: 'hide',
            layout: 'fit',
            bbar: [{
                text: 'Выбрать',
                handler: this.selCompleteFn,
                scope: this
            }, '->', {
                text: 'Отмена',
                handler: this.selCancelFn,

                scope: this
            }]
        });

        this.win.add(this.grid);

        if ( !this.multiSelect ) {
            this.win.on('show', this.selectGridRow, this);
        }

        this.callParent(arguments);

    },

    selCancelFn: function() {
        for (var i = 0; i < this.checkedRecords.length; i++) {
            var record = this.checkedRecords[i];
            record.set('checked', 0);
        }

        this.checkedRecords = [];

        this.setValue(this.realValue);

        this.win.hide();
    },


    configureStore: function() {
        var params = {
            filterParam: undefined,
//            groupParam: undefined,
            pageParam: undefined,
            startParam: undefined,
//            sortParam: undefined,
            limitParam: undefined
        };

        Ext.apply(this.storeConfig.proxy, params);

        this.storeConfig.empty = true;

        this.store = Ext.create('Ext.data.Store', this.storeConfig);
        this.store.on('load', this.firstStoreLoad, this, {single: true});
        this.store.load();
    },

    firstStoreLoad: function( records, operation, success ) {
        this.store.empty = false;
    },

    configureGrid: function() {

        var config = Ext.clone(this.gridConfig);
        config.store = this.store;
        config.hideHeaders = true;
        config.border = false;
        config.uses = ['xlib.CheckColumn'];

        if ( this.multiSelect ) {
            config.columns.unshift({
                xtype: 'checkcolumn',
                width: 30,
                dataIndex: 'checked',
                listeners: {
                    checkchange: this.onGridCheckChange,
                    scope: this
                }
            });
        }

        this.grid = Ext.create('Ext.grid.Panel', config);

    },

    onGridCheckChange: function( grid, rowIndex, checked, eOpts ) {
        debugger;
        this.grid.fireEvent('activechange', rowIndex, checked);
        var record = this.store.getAt(rowIndex);

        (checked) ? this.checkedRecords.push(record) : Ext.Array.remove(this.checkedRecords, record);

    },

    selectGridRow: function() {
        if( Ext.isEmpty( this.grid.rowToSelect ) ) return;
        this.grid.getSelectionModel().select(this.grid.rowToSelect);
    },

    getValue: function() {
        return this.realValue;
    },

    getSubmitValue: function() {
        return this.getValue();
    },

//    setRealValue: function(value) {
//
//        this.realValue = value;
//
//        if( Ext.isEmpty( dispValue ) ) {
//            Ext.form.field.Trigger.superclass.setValue.call(this, [value]);
//        }
//
//        Ext.form.field.Trigger.superclass.setValue.call(this, [dispValue]);
//    },

    /**
     * @function xlib.RefField.setValue
     * @override
     * @param {Array|Number} value - значение (айдишник или массив айдишников)
     * @return {String} output - Строка для отображения
     * */


    setValue: function(value) {
        var output = null;

        if(Ext.isEmpty(value)) return;

        this.realValue = value;

        if ( this.store.empty ) {
            this.store.on('load', function() {
               this.setValue(value);
            }, this, {single: true});
            return null;
        }

        debugger;

        output = ( this.multiSelect ) ? this.multiSelectSetValue(value) : this.multiSelectSetValue(value);

        Ext.form.field.Trigger.superclass.setValue.call(this, [output]);

    },

    getWord: function(count) {
        return 'Выбрано ' + count + ' ' + Ext.util.Format.wformat(count, this.word);
    },

    multiSelectSetValue: function(value) {
        var record, val, count = 0;

        this.checkedRecords = [];

        value = Ext.Array.from(value);

        // TODO обработать ситуацию когда из 3х [1, 3, 4] сущ. только один -> отобразить его имя

        for (var i = 0; i < value.length; i++) {
            val = value[i];
            record = this.store.getById(val);

            if ( !Ext.isEmpty(record) ) {
                this.checkedRecords.push(record);
                record.set('checked', 1);
                count++;
            }

        }

        if ( value.length === 1 ) {
            var rec = this.store.getById(value[0]);
            return rec.get(this.displayField);
        }

        return this.getWord(value.length);
    },

    singleSelectSetValue: function(value) {
        var record, val;

        record = this.store.getById(value);

        if ( Ext.isEmpty( record ) ) return null;

        this.grid.rowToSelect = record.index;

        return record.get(this.displayField);
    },

    onTriggerClick: function() {
        this.win.show();
    },

    multipleSelectionComplete: function() {
        var record,
            val,
            values  = [],
            max     = this.checkedRecords.length,
            output  = null;

        for (var i = 0; i < max; i++) {
            record = this.checkedRecords[i];
            val = record.get(this.valueField);
            values.push(val);
        }
        this.realValue = values;


        if( values.length === 0) {
            output  = null;
        }

        if( values.length === 1) {
            var rec = this.store.getById(values[0]);
            output  = rec.get(this.displayField);
        }

        if( values.length > 1) {
            output = this.getWord(max);
        }

        Ext.form.field.Trigger.superclass.setValue.call(this, [output]);

        this.win.hide();
    },

    singleSelectionComplete: function() {
        var record = this.grid.getSelectionModel().getSelection()[0];

        if ( Ext.isEmpty( record ) ) {
            this.win.hide();
            return false;
        }

        this.realValue = record.get(this.valueField);
        var dispValue = record.get(this.displayField);
        Ext.form.field.Trigger.superclass.setValue.call(this, [dispValue]);
        this.win.hide();
        return true;
    }



});