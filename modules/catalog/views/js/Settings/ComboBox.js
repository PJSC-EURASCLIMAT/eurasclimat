
Ext.ns('Catalog.Marks');

Catalog.Marks.ComboBox = Ext.extend(xlib.form.GroupComboBox, {

    fieldLabel: 'Марка',

    typeAhead: true,
    
    editable: false,
    
    lazyRender: true,
    
    triggerAction: 'all',
    
    startCollapsed: false,
    
    lazyInit: true,
    
    mode: 'remote',
    
    valueField: 'id',
    
    displayField: 'name',
    
    allowBlankOption: true,
    
    updatePermissions: acl.isUpdate('catalog'),
    
    listURL: link('catalog', 'marks', 'get-list'),
    
    groupTextTpl: '<b>{group} ({[values.rs.length]})</b>',
    
    width: 'auto',
    
    initComponent: function() {
        
        this.store = new Ext.data.GroupingStore({
            url: this.listURL,
            autoDestroy: true,
            root: 'data',
            fields: ['id', 'name'],
            sortInfo: {
                field: 'name', 
                direction: 'ASC'
            },
            groupField: 'country',
            reader: new Ext.data.JsonReader({
                root: 'data'
            }, [
               {name: 'id'},
               {name: 'name'},
               {name: 'country'}
            ])
        });
        
        Catalog.Marks.ComboBox.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('Catalog.Marks.ComboBox', Catalog.Marks.ComboBox);