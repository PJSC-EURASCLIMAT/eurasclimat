Ext.define('EC.Catalog.controller.Catalog', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.CatalogTree'
    ],
    
    models: [
        'EC.Catalog.model.CatalogTree'
    ],
    
    views: [
        'EC.Catalog.view.CatalogLayout',
        'EC.Catalog.view.CatalogTree'
    ],
    
    catalogID: null,
    
    run: function(container) {

        var content = container.add(Ext.create('EC.Catalog.view.CatalogLayout'));
        
        var treePanel = content.down('CatalogTree'),
            previewPanel = content.down('panel[type=preview]');
        
        treePanel.on('select', function(tree, record, index, eOpts) {
            this.showCatalog(record.get('id'), previewPanel);
        }, this);
    },
    
    showCatalog: function(id, container) {
        container.removeAll(true);
        var controller = 'EC.Catalog.controller.' + id;
        this.getController(controller).run(container);
    }
});