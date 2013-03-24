Ext.define('EC.Main.controller.News', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.News.News'],
    
    models: ['EC.Main.model.News.News'],
    
    views: [
        'EC.Main.view.News.List',
        'EC.Main.view.News.PortletList'
    ],
    
    run: function(container) {
        
        var viewName = ('portlet' == container.getXType()) 
            ? 'EC.Main.view.News.PortletList' : 'EC.Main.view.News.List',
            
            grid = container.add(this.getView(viewName).create({
                listeners: {
                    itemclick: this.openCard,
                    afterrender: function(g) {
                        // To enable filters let initialize grid to create filters
                        g.getView().getFeature('filter_feature').createFilters();
                    },
                    scope: this
                }
            }));
        
        grid.down('toolbar NewsCategoriesCombo').on('change', this.onFilter, grid);
        grid.down('toolbar NewsActualityCombo').on('change', this.onActualityFilter, grid);
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        
        var link = e.target.attributes,
            MC = this.getController('App.controller.Main'); 

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

        var filter = this.getView().getFeature('filter_feature').getFilter(combo.fieldName),
            value = combo.getFilter();
        
        if (value === '') {
            filter.setActive(false);
        } else {
            filter.setActive(true);
            filter.setValue(value);
        }
    },
    
    onActualityFilter: function(combo, newValue, oldValue, eOpts) {
        this.getStore().getProxy().extraParams = {actuality: combo.getValue()};
        this.getStore().guaranteeRange(0, 10);
    }
});