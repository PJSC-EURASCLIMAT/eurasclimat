Ext.define('xlib.Ref.Combo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: 'widget.RefCombo',
    
    valueField: 'id',
    
    displayField: 'name', 
    
    editable: false,
    
    queryMode: 'local',
    
    store: 'xlib.Ref.store.Ref'
});