Ext.ns('Catalog');

Catalog.Layout = Ext.extend(Ext.Panel, {
	
	title: 'Каталог',
	
    border: false,
    
    layout: 'border',
    
	initComponent: function() {
        
        this.itemsList = new Catalog.Items.List({
            region: 'center',
            border: false,
            readOnly: this.readOnly,
            cls: 'x-border-left'
        });
        
	    this.items = [this.itemsList];

		Catalog.Layout.superclass.initComponent.apply(this, arguments);
	}
    
});

Ext.reg('Catalog.Layout', Catalog.Layout);