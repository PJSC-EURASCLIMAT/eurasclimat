Ext.ns('Catalog.Types');

Catalog.Types.ComboBox = Ext.extend(Ext.ux.TreeComboBox, {

    fieldLabel: 'Тип',

    lazyRender: true,
    
    lazyInit: true,
    
    url: link('catalog', 'types', 'get'),
    
    rootVisible: false
    
});

Ext.reg('Catalog.Types.ComboBox', Catalog.Types.ComboBox);