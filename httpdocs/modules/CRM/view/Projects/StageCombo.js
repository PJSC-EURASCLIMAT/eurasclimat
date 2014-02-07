Ext.define('EC.CRM.view.Projects.StageCombo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ProjectsStageCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Этап проекта',
    
    name: 'stage',
    
    hiddenName: 'stage',
    
    editable: false,
    
    queryMode: 'local',
    
    value: '',
    
    store: { 
        
        storeId: 'ProjectsStageComboStore',
    
        fields: ['id', 'name'], 
        
        data: [
            {id: 'preparation', name: 'Подготовка'},
            {id: 'coordination', name: 'Согласование'},
            {id: 'execution', name: 'Выполнение'},
            {id: 'implementation', name: 'Внедрение'}
        ] 
    },
    
    getFilter: function() {
        return this.getValue(); 
    },
    
    statics: {
        getDisplayValue: function(v) {
            var store = Ext.getStore('ProjectsStageComboStore') 
                || Ext.create('widget.ProjectsStageCombo').getStore(),
                record = store ? store.getById(v) : null;
            return record ? record.get('name') : v;
        }
    }
});