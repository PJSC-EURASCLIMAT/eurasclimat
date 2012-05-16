Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Conditioners'
    ],
    
    models: [
        'EC.Catalog.model.Conditioners'
    ],

    views: [
        'EC.Catalog.view.Layout',
        'EC.Catalog.view.Conditioners.Layout',
        'EC.Catalog.view.Conditioners.FiltersPanel',
        'EC.Catalog.view.Conditioners.List',
        'EC.Catalog.view.Conditioners.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Conditioners.Filter.Availability',
        'EC.Catalog.view.Conditioners.Filter.Condition',
        'EC.Catalog.view.Conditioners.Filter.InputCooling',
        'EC.Catalog.view.Conditioners.Filter.InputHeating',
        'EC.Catalog.view.Conditioners.Filter.OutputCooling',
        'EC.Catalog.view.Conditioners.Filter.OutputHeating',
        'EC.Catalog.view.Conditioners.Filter.Purpose',
        'EC.Catalog.view.Conditioners.Filter.Square',
        'EC.Catalog.view.Conditioners.Filter.Volume',
        'EC.Catalog.view.Conditioners.Filter.Warranty',
        'EC.Catalog.view.Conditioners.Filter.Country',
        'EC.Catalog.view.Conditioners.Filter.Group',
        'EC.Catalog.view.Conditioners.Filter.Name',
        'EC.Catalog.view.Conditioners.Filter.Mark',
        'EC.Catalog.view.Conditioners.Filter.ProductType',
        'EC.Catalog.view.Conditioners.Filter.ImplementationType'
    ],
    
    init: function(container) {
        
        if ('portlet' == container.getXType()) {
            
        } else {
            
            container.setLoading('Загрузка...', true);
            var catalog = container.add({
                xtype: 'CatalogLayout',
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
            
            catalog.down('ConditionersFiltersPanel tool[action=resetfilters]').on({
                click: this.resetFilters
            });
            catalog.down('ConditionersFiltersPanel button[action=resetfilters]').on({
                click: this.resetFilters
            });
            
            catalog.down('ConditionersFiltersPanel tool[action=settings]').on({
                click: this.editSettings,
                scope: this
            });
            catalog.down('ConditionersFiltersPanel button[action=settings]').on({
                click: this.editSettings,
                scope: this
            });
            
            catalog.down('ConditionersFiltersPanel tool[action=additem]').on({
                click: this.addItem
            });
            catalog.down('ConditionersFiltersPanel button[action=additem]').on({
                click: this.addItem
            });
            
            catalog.down('ConditionersList').on({
                edititem: this.editItem,
                deleteitem: this.deleteItem
            });
            catalog.down('ConditionersList tool[action=additem]').on({
                click: this.addItem
            });
            catalog.down('ConditionersList tool[action=refresh]').on({
                click: function(button) {
                    button.up('ConditionersList').getStore().load();
                }
            });
        }
    },
    
    resetFilters: function(button) {
        button.up('ConditionersFiltersPanel').cascade(function(cmp) {
            if (cmp.isFormField) {
                cmp.reset();
            }
        });
    },
    
    editSettings: function() {
        var controller = 'EC.Catalog.controller.Settings',
            view = 'EC.Catalog.view.Conditioners.SettingsLayout';
        this.getController(controller).init(view);
    }, 
    
    addItem: function() {
        var view = Ext.widget('ConditionersEdit');
    },
    
    editItem: function(grid, record) {
        var view = Ext.widget('ConditionersEdit', {
            title: 'Редактирование позиции №' + record.get('id')
        });
        view.down('form').loadRecord(record);
    },
    
    deleteItem: function(grid, record) {
        alert("Удаление позиции №" + record.get('id'));
    }
});