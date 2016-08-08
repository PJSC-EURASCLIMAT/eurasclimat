Ext.define('xlib.TreeRefField', {
    
    extend: 'Ext.form.field.Trigger',

    requires: [
        'xlib.Tree',
        'Ext.window.Window'
    ],
    
    alias: ['widget.tree-reffield'],

    editable: false,

    valueField: 'id',

    displayField: 'text',

    windowTitle: 'Справочник',

    displayValue: null,

    realValue: null,

    multiSelect: false,

    //TODO надо разобраться с setValue()

    initComponent: function() {

        this.configureStore();

        this.win = Ext.create('Ext.window.Window',{
            title: this.windowTitle,
            width: 200,
            height: 400,
            modal: true,
            closeAction: 'hide',
            layout: 'fit',

            bbar: [{
                text: 'Выбрать',
                itemId: 'select-btn',
                handler: this.selCompleteFn,
                scope: this
            }, '->', {
                text: 'Отмена',
                itemId: 'cancel-btn',
                handler: this.selCancelFn,
                scope: this
            }],

            items: [{
                xtype: 'new-tree',
                addText: this.addText,
                addToolTip: this.addToolTip,
                store: this.store,
                permissions: false,
                controllerURL: this.controllerURL
            }]
        });

        if ( !this.multiSelect ) {
            this.win.on('show', this.selectGridRow, this);
        }

        this.callParent(arguments);

        this.tree = this.win.down('new-tree');
        this.selectBtn = this.win.down('#select-btn');
        this.cancelBtn = this.win.down('#cancel-btn');




    },

    configureStore: function() {
        this.store =  new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                api: {
                    read: this.controllerURL + 'read',
                    create: this.controllerURL + 'create',
                    update: this.controllerURL + 'update',
                    destroy: this.controllerURL + 'destroy'
                },

                reader: {
                    type: 'json',
                    root: 'data',
                    successProperty: 'success',
                    messageProperty: 'message'
                },

                writer: {
                    root: 'data',
                    encode: true
                }
            },

            autoLoad: false,

            sorters: [{
                property: 'text',
                direction: 'ASC'
            }]
        });

        this.store.empty = true;

        this.setProxyValue(this.value);

        this.valueStore = Ext.create('Ext.data.Store', {
            fields: ['id','text']
        });

        //TODO грузить на первый setValue

        this.store.load({
            callback: this.firstStoreLoad,
            scope: this
        });

    },

    firstStoreLoad: function( records, operation, success) {
        if ( success ) {
            var r = Ext.JSON.decode(operation.response.responseText);
            this.store.empty = false;

            if ( r.valueData.length > 0 ) {
                this.realValue = r.valueData[0][this.valueField];
                Ext.form.field.Trigger.superclass.setValue.call(this, [r.valueData[0][this.displayField]]);
            }

        }
    },


    setProxyValue: function(value) {
        if ( Ext.isEmpty( value ) ) {
            this.store.proxy.extraParams.value = null;
        }
        this.store.proxy.extraParams.value = value;
    },

    selCompleteFn: function() {
        var record = this.tree.getSelectionModel().getSelection()[0];

        if ( Ext.isEmpty( record ) ) {
            this.win.hide();
            return false;
        }

        this.realValue = record.get(this.valueField);
        var dispValue = record.get(this.displayField);
        Ext.form.field.Trigger.superclass.setValue.call(this, [dispValue]);
        this.win.hide();
        return true;
    },

    selCancelFn: function() {

        this.win.hide();
    },

    onTriggerClick: function() {
        this.win.show();
        if ( this.store.empty ) {
            this.store.load();
        }
    },

    getValue: function() {
        return this.realValue;
    },

    getSubmitValue: function() {
        return this.getValue();
    },

    setValue: function(value) {
        var output;

        if(Ext.isEmpty(value)) return;

        this.realValue = value;

        if ( this.store.empty ) {
            this.store.on('load', function() {
                this.store.empty = false;
                this.setValue(value);
            }, this, {single: true});
            return null;
        }

        output = this.singleSelectSetValue(value);

        Ext.form.field.Trigger.superclass.setValue.call(this, [output]);

    },

    singleSelectSetValue: function(value) {
        var record, val;

        record = this.store.getById(value);

        if ( Ext.isEmpty( record ) ) return null;

        this.tree.rowToSelect = record.index;

        return record.get(this.displayField);
    },

    selectGridRow: function() {
        if( Ext.isEmpty( this.tree.rowToSelect ) ) return;
        this.tree.getSelectionModel().select(this.tree.rowToSelect);
    },



});