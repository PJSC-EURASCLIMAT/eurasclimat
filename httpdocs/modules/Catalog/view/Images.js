Ext.define('EC.Catalog.view.Images', {
    
    extend: 'Ext.Panel',
    
    alias: 'widget.CatalogImages',

    title: 'Изображения',
	
    autoScroll: true,

    border: false,
    
    allowEdit: false,
    
    layout: 'fit',
    
    cls: 'images-view',
    
    monitorResize: true,
    
    catalogId: null,
    
    catalog: null,
    
    initComponent: function() {

        this.addEvents('deleteImage');
        
        if (Ext.isEmpty(this.catalog)) {
            throw 'catalog must not be empty!';
        }
        
        this.viewPanel = new Ext.DataView({
            cls: 'images-view',
            itemSelector: 'div.thumb-wrap',
            overClass: 'x-view-over',
            style: 'overflow: auto',
            layout: 'fit',
            multiSelect: false,
            store: new Ext.data.Store({
                proxy: {
                    type: 'ajax',
                    reader: {
                        type: 'json',
                        root: 'rows',
                        successProperty: 'success'
                    }
                },
                fields: ['id', 'name']
            }),
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
	                '<div class="thumb-wrap" id="{name}">',
		                '<div class="thumb">',
		                	'<img src="/images/catalog/{name}" title="{name}" class="thumb-img">',
		                '</div>',
		                '<span class="x-editable">',
		                	'<a href="#" title="Удалить">' +
                            '<img src="/images/icons/fam/delete.gif" ' +
                            'action="delete" ' +
                            'img_id="{id}"></a>',
	                	'</span>',
	            	'</div>',
            	'</tpl>',
            	'<div class="x-clear"></div>'
            ),
            listeners: {itemclick: {fn: this.onItemClick, scope: this, buffer: 200}}
        });
        
        this.tbar = new Ext.Toolbar({
            items: [{
                text: 'Добавить',
                iconCls: 'add',
                action: 'add',
                hidden: !this.allowEdit,
                scope: this
            }, '->', {
                xtype: 'button',
                tooltip: 'Обновить',
                iconCls: 'x-tbar-loading',
                action: 'refresh'
            }]
        });
        
        this.items = [this.viewPanel];
        
        this.callParent(arguments);
    },
    
    onItemClick: function(view, record, item, index, e, eOtps) {
        var tel = Ext.fly(e.getTarget());
        if (tel.getAttribute('action') == 'delete') {
            this.fireEvent('deleteImage', this, record);
        } else {
            this.showFile(record);
        }
    },
    
    showFile: function(record) {
    	
        var img = new Ext.ComponentMgr.create({
            xtype: 'box',
            html: '<a href="/images/catalog/' + record.get('name') + '" '
        		+ 'style="border: none;" target="_blank">'
            	+ '<img src="/images/catalog/' + record.get('name') + '" '
            	+ 'style="max-height: 400px; max-width: 600px;" /></a>'
        });
        
        var wind = new Ext.Window({
            title: record.get('name'),
            modal: true,
            minWidth: 300,
            minHeight: 300,
            autoWidth: true,
            resizable: false,
            autoHeight: true,
            items:[img]
        });
        wind.show();
    }
});