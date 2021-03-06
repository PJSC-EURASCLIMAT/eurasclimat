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

    checkedIds: [],

    /**
     * TODO c beforedestroy разобраться
     * */

//    inputAttrTpl: [
//        "data-qtip=\"on\""
//    ],

    listeners: {
        beforedestroy: function() {
//            this.grid.destroy();
//            this.store.destroy();
//            this.win.destroy();

            this.grid = null;
            this.store = null;
            this.win = null;

        }
//        ,render: function(c){
//            Ext.QuickTips.register({
//                target: c.getEl(),
//                text: c.qtip
//            });
//        }
    },

    initComponent: function() {

        this.checkedIds = [];

        this.selCompleteFn = (this.multiSelect) ? this.multipleSelectionComplete : this.singleSelectionComplete;

        this.configureStore();
        this.configureGrid();
        this.configureValuesGrid();

        this.win = Ext.create('Ext.window.Window', {
            title: this.windowTitle,
            width: 600,
            height: 400,
            modal: true,
            closeAction: 'hide',
            layout: 'border',

            bbar: [{
                text: 'Выбрать',
                handler: this.selCompleteFn,
                scope: this
            }, '->', {
                text: 'Отмена',
                handler: this.selCancelFn,

                scope: this
            }],

            items: [{
                region:'west',
                border:false,
                width: '30%',
                split: true,
                layout: 'fit',
                items: [
                    this.valuesGrid
                ]
            },{
                region:'center',
                width: '70%',
                border:false,
                layout: 'fit',
                items: [
                    this.grid
                ]
            }]
        });

//        this.win.add(this.grid);

        if ( !this.multiSelect ) {
            this.win.on('show', this.selectGridRow, this);
        }

        this.callParent(arguments);

    },

    selCancelFn: function() {
        var id, rec, valRec, trigger = false,
            realArr = ( Ext.isArray( this.realValue ) ) ? this.realValue : Ext.Array.from(this.realValue);
        for (var i = 0; i < this.checkedIds.length; i++) {
            id = this.checkedIds[i];

            trigger = false;

            for (var j = 0; j < realArr.length; j++) {
                var realId = realArr[j];
                if ( realId === id ) {
                    trigger = true;
                    break;
                }
            }

            if ( !trigger ) {
                rec = this.store.getById(id);
                valRec = this.valueStore.getById(id);

                if ( !Ext.isEmpty( rec ) ) {
                    rec.set('checked', 0);
                }

                if ( !Ext.isEmpty( valRec ) ) {
                    this.valueStore.remove(valRec);
                }
            }


        }

        this.checkedIds = [];

        this.setValue(this.realValue);

        this.win.hide();
    },


    configureStore: function() {
//        var params = {
//            filterParam: undefined,
////            groupParam: undefined,
//            pageParam: undefined,
//            startParam: undefined,
////            sortParam: undefined,
//            limitParam: undefined
//        };

//        Ext.apply(this.storeConfig.proxy, params);

        var value = ( Ext.isArray( this.value ) ) ? this.value.join(',') : this.value;

        this.storeConfig.empty = true;
//        this.storeConfig.pageSize = 25;
        this.storeConfig.proxy.extraParams = {value: value};

        this.store = Ext.create('Ext.data.Store', this.storeConfig);
//        this.store.on('load', );
        this.store.load({
            callback: this.firstStoreLoad,
            scope: this
        });

        this.store.on('load', this.onStoreLoad, this);

        this.valueStore = Ext.create('Ext.data.Store', {
            fields: this.storeConfig.fields
        });
    },

    onStoreLoad: function( store, records, successful, eOpts ) {
//        var arr = ( Ext.isArray(this.realValue) ) ? this.realValue : Ext.Array.from(this.realValue);

        Ext.each(this.checkedIds, function(id, index){
            var rec = this.store.getById(id);
            if ( !Ext.isEmpty(rec) ) {
                rec.set('checked', 1);
            }

        }, this);
    },

    firstStoreLoad: function( records, operation, success) {
        if ( success ) {
            var r = Ext.JSON.decode(operation.response.responseText);
            this.store.empty = false;
            this.valueStore.loadData(r.valueData);
        }
    },

    configureValuesGrid: function() {

        var config = Ext.clone(this.gridConfig);
        config.store = this.valueStore;
        config.hideHeaders = true;
        config.border = false;

        config.uses = ['xlib.CheckColumn'];

//        if ( this.multiSelect ) {
//            config.columns.unshift({
//                xtype: 'checkcolumn',
//                width: 30,
//                dataIndex: 'checked',
//                listeners: {
//                    checkchange: this.onGridCheckChange,
//                    scope: this
//                }
//            });
//        }

        this.valuesGrid = Ext.create('Ext.grid.Panel', config);

    },

    configureGrid: function() {
        var config = Ext.clone(this.gridConfig);
        config.store = this.store;
        config.hideHeaders = true;
        config.border = false;
        config.uses = ['xlib.CheckColumn'];
        config.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            displayMsg: 'Записи {0} - {1} из {2}'
        });

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
//        debugger;
        this.grid.fireEvent('activechange', rowIndex, checked);
        var record = this.store.getAt(rowIndex);
        var id = record.get(this.valueField);

        if ( checked ) {
            this.checkedIds.push(id);
            this.valueStore.add(record);
        } else {
            Ext.Array.remove(this.checkedIds, id);
            this.valueStore.remove(record);
        }


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
                this.store.empty = false;
                this.setValue(value);
            }, this, {single: true});
            return null;
        }

//        debugger;

        output = ( this.multiSelect ) ? this.multiSelectSetValue(value) : this.multiSelectSetValue(value);

        Ext.form.field.Trigger.superclass.setValue.call(this, [output]);

    },

    getWord: function(count) {
        return 'Выбрано ' + count + ' ' + Ext.util.Format.wformat(count, this.word);
    },

    multiSelectSetValue: function(value) {
        var record, val, count = 0;

        this.checkedIds = [];

        value = Ext.Array.from(value);

        // TODO обработать ситуацию когда из 3х [1, 3, 4] сущ. только один -> отобразить его имя

        for (var i = 0; i < value.length; i++) {
            val = value[i];
            record = this.store.getById(val);

            if ( !Ext.isEmpty(record) ) {
                this.checkedIds.push(record.get(this.valueField));
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
            max     = this.checkedIds.length,
            output  = null;

        for (var i = 0; i < max; i++) {
            record = this.valueStore.getById(this.checkedIds[i]);
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
        this.updateQTip();

        Ext.form.field.Trigger.superclass.setValue.call(this, [output]);

        this.win.hide();
    },

    updateQTip: function() {
        if ( !this.multiSelect ) {
            this.getEl().set({'data-qtip': ''});
            return;
        }
        var string = '';
        for (var i = 0; i < this.checkedIds.length; i++) {
            var record = this.valueStore.getById(this.checkedIds[i]);
            string += record.get(this.displayField) + '<br/>';
        }

        this.getEl().set({'data-qtip': string});
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