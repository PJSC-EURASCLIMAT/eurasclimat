Ext.define('EC.Main.controller.News', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.News.News'],
    
    models: ['EC.Main.model.News.News'],
    
    views: [
        'EC.Main.view.News.List',
        'EC.Main.view.News.PortletList'
    ],
    
    init: function(container) {
        
        var grid;
        
        if ('portlet' == container.getXType()) {
            grid = container.add(this.getView('EC.Main.view.News.PortletList').create());
        } else {
            grid = container.add(this.getView('EC.Main.view.News.List').create());
        }
        
        
        grid.on('itemclick', this.openCard, this);
        
        grid.down('toolbar NewsCategoriesCombo').on('change', this.onFilter, grid);
        grid.down('toolbar NewsActualityCombo').on('change', this.onActualityFilter, grid);
        
        // To enable filters let initialize grid to create filters
        grid.filters.createFilters();
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        
        var link = e.target.attributes,
            MC = this.getController('EC.Main.controller.Main'); 

        if (!link.action) {
            return;
        }
        
        if (link.action.value == 'readmore') {
            MC.openModuleTab({
                title: record.get('title'),
                allowMultiple: true,
                icon: '/images/icons/news_current.png',
                launchModule: 'EC.Main.controller.NewsCard'
            });
            
            MC.getStore('EC.Main.store.News.Card').load({params: {id: link.newsid.value}});
        }
        
        if (link.action.value == 'showperson') {
            MC.openModuleTab({
                title: 'Персональная информация',
                allowMultiple: true,
                icon: '/images/icons/worker.png',
                launchModule: 'EC.Main.controller.PersonCard'
            });
            
            MC.getStore('EC.Main.store.PersonCard').load({params: {id: link.personid.value}});
        }
    },
    
    onFilter: function(combo, newValue, oldValue, eOpts) {

        var filter = this.filters.getFilter(combo.fieldName),
            value = combo.getFilter();
        
        if (value === '') {
            filter.setActive(false);
        } else {
            filter.setValue(value);
            filter.setActive(true);
        }
    },
    
    onActualityFilter: function(combo, newValue, oldValue, eOpts) {
        this.getStore().getProxy().extraParams = {actuality: combo.getValue()};
        this.getStore().guaranteeRange(0, 10);
    }
});