Ext.define('EC.CRM.view.Projects.ObjectCombo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ProjectsObjectCombo'],
    
    valueField: 'name',
    
    displayField: 'name', 
    
    fieldLabel: 'Назначение объекта',
    
    name: 'object_type',
    
    hiddenName: 'object_type',
    
    editable: false,
    
    queryMode: 'local',
    
    value: '',
    
    store: { 
        
        storeId: 'ProjectsObjectComboStore',
    
        fields: ['name'], 
        
        data: [
            {name: 'Квартира'},
            {name: 'Коттедж'},
            {name: 'Складское помещение'},
            {name: 'Административное помещение'},
            {name: 'Промышленное помещение'},
            {name: 'Техническое помещение'},
            {name: 'Торговое помещение'},
            {name: 'Общественное питание'},
            {name: 'Медицинские учреждения'},
            {name: 'Помещение свободного назначения'},
            {name: 'Другое'}
        ] 
    }
});