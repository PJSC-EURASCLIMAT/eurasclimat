Ext.define('EC.CRM.view.Demoprojects.Groups.Combo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.demoprojectsGroupsCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    editable: false,
    
    queryMode: 'local',
    
    store: 'EC.CRM.store.Demoprojects.Groups'
});