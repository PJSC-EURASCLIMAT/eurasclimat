Ext.define('xlib.Reference.Combo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: 'widget.ReferenceCombo',
    
    valueField: 'id',
    
    displayField: 'name', 
    
    editable: false,
    
    queryMode: 'local',

    url: null,

    store: null,

    initComponent: function() {

        if ( this.store === null ) {
            this.store = {
                fields: ['id', 'name'],
                proxy: {
                    type: 'ajax',
                    api: {
                        read: this.url
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success'
                    }
                }
            };
        }

        this.callParent();
    }


});