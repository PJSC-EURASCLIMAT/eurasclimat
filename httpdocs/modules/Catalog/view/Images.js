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
    
    catalog: '',
    
    loadURL: '/json/catalog/images/get-list/',
    
    initComponent: function() {

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
            store: new Ext.data.JsonStore({
                url: this.loadURL,
                root: 'data',
                fields: ['id', 'filename']
            }),
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
	                '<div class="thumb-wrap" id="{filename}">',
		                '<div class="thumb">',
		                	'<img src="/files/{filename}" class="thumb-img">',
		                '</div>',
		                '<span class="x-editable">',
		                	'{filename}',
	                	'</span>',
	            	'</div>',
            	'</tpl>',
            	'<div class="x-clear"></div>'
            ),
            listeners: {click: {fn: this.showFile, scope: this, buffer: 200}}
        });
        
        if (this.allowEdit) {
            
            this.tbar = new Ext.Toolbar({
                items: [{
                    text: 'Добавить',
                    iconCls: 'add',
                    action: 'add',
                    scope: this
                }]
            });
            
//            menu = new Ext.menu.Menu({
//                items: [{
//                    text: 'Удалить',
//                    iconCls: 'delete',
//                    handler: function() {
//                        var record = menu.view.store.getAt(menu.index);
//                        this.onDelete(record.get('id'));
//                    },
//                    scope: this
//                }]
//            });
//            
//            this.viewPanel.on('contextmenu', function(view, index, node, e) {
//                e.stopEvent();
//                Ext.apply(menu, {view: view, index:index, node: node, e: e});
//                menu.showAt(e.getXY());
//            });
            
        }
        
        this.items = [this.viewPanel];
        
        this.callParent(arguments);
    },
    
    showFile: function(view, index, node, e) {
    	
        var record = view.store.getAt(index);

        if (record.get('is_photo') == 0) {
        	return;
        }
        
        var img = new Ext.ComponentMgr.create({
            xtype: 'box',
            html: '<a href="/files/' + record.get('filename') + '" '
        		+ 'style="border: none;" target="_blank">'
            	+ '<img src="/files/' + record.get('filename') + '" '
            	+ 'style="max-height: 400px; max-width: 600px;" /></a>'
        });
        
        var wind = new Ext.Window({
            title: record.get('description'),
            modal: true,
            autoWidth: true,
            resizable: false,
            autoHeight: true,
            items:[img]
        });
        wind.show(record.get('filename'));
    },
        
    loadData: function(data) {
        this.viewPanel.store.loadData(data);
        this.catalogId = data['id'];
    },
    
    onDelete: function(id) {
        Ext.Msg.show({
            title: 'Подтверждение',
            msg: 'Вы уверены?',
            buttons: Ext.Msg.YESNO,
            fn: function(b) {
                if ('yes' == b) {
                    var loadingMask = new Ext.LoadMask(this.el, {msg: 'Загрузка...'});
                    loadingMask.show();
                    Ext.Ajax.request({
                        url: this.deleteURL,
                        params: {id: id},
                        callback: function() {
                            loadingMask.hide();
                            this.viewPanel.store.load({params: {catalogId: this.catalogId}});
                        },
                        scope: this
                    });
                }
            },
            icon: Ext.MessageBox.QUESTION,
            scope: this
        });
    }
});