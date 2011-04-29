Ext.ns('Catalog.Measures');

Catalog.Measures.ComboBox = Ext.extend(xlib.form.ComboBox, {

    fieldLabel: 'Eд. изм.',

    typeAhead: true,
    
    editable: false,
    
    lazyRender: true,
    
    lazyInit: false,
    
    mode: 'remote',
    
    valueField: 'id',
    
    displayField: 'name',
    
    selectFirst: true,
    
    overCls: '',
    
    allowBlankOption: true,
    
    resizable: false,
    
    updatePermissions: acl.isUpdate('catalog'),
    
    listURL: link('catalog', 'measures', 'get-list'),
    
    initComponent: function() {
        
        this.store = new Ext.data.JsonStore({
            url: this.listURL,
            autoDestroy: true,
            root: 'data',
            fields: ['id', 'name']
        });
        
        Catalog.Measures.ComboBox.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('Catalog.Measures.ComboBox', Catalog.Measures.ComboBox);