Ext.define('EC.CRM.view.Projects.Groups.Combo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.projectsGroupsCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    editable: false,
    
    queryMode: 'local',
    
    store: 'EC.CRM.store.Projects.Groups'
});