Ext.define('xlib.DocTypes.view.Combo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: 'widget.docTypesCombo',
    
    valueField: 'id',
    
    displayField: 'name', 
    
    editable: false,
    
    queryMode: 'local',
    
    store: 'xlib.DocTypes.store.DocTypes'
});