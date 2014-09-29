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
            previewPanel.removeAll(true);
            var controller = this.getController('EC.Catalog.controller.' + record.get('id'));
            controller.catalogName = record.get('name');
            controller.run(previewPanel);
            this.getName(record);
        }, this);
    },
    
    getName: function(record) {
    	console.log(record.parent, record.parent.parent, record.parent.parent.parent, record.parent.parent.parent.parent);
    }
});