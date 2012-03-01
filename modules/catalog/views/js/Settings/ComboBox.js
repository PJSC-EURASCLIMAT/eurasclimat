Ext.ns('Catalog.Settings');

Catalog.Settings.ComboBox = Ext.extend(Ext.form.ComboBox, {

    fieldLabel: 'Марка',

    entity: null,
    
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
    
    listURL: link('catalog', 'settings', 'get-list'),
    
    width: 'auto',
    
    initComponent: function() {
        
        if (Ext.isEmpty(this.entity)) {
            throw 'Entity is not defined';
        }
        
        this.store = new Ext.data.Store({
            url: this.listURL,
            baseParams: {
                entity: this.entity
            },
            autoDestroy: true,
            root: 'data',
            fields: ['id', 'name'],
            reader: new Ext.data.JsonReader({
                root: 'data'
            }, [
               {name: 'id'},
               {name: 'name'}
            ])
        });
        
        Catalog.Settings.ComboBox.superclass.initComponent.apply(this, arguments);
    }
});