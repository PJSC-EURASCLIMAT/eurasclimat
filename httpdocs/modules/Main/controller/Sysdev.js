Ext.define('EC.Main.controller.Sysdev', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Main.store.Sysdev.ThemesTree'
    ],
    
    models: [
        'EC.Main.model.Sysdev.ThemesTree'
    ],

    views: [
        'EC.Main.view.Sysdev.Layout',
        'EC.Main.view.Sysdev.ThemesTree'
    ],
    
    theme: 0,
    
    init: function(container) {

        var content = container.add({
            xtype: 'SysdevLayout'
        });
        
        var treePanel = content.down('SysdevThemesTree'),
            previewPanel = content.down('panel[type=preview]');
        
        treePanel.on('select', function(tree, record, index, eOpts) {
            previewPanel.getLoader().load({
                params: {
                    theme_id: record.get('id') 
                }
            });
            this.theme = record;
        }, this);
        
        if (treePanel.getStore().isLoading()) {
            treePanel.getStore().on('load', function() {
                treePanel.getSelectionModel().select(this.theme);
            }, this);
        } else {
            treePanel.getSelectionModel().select(this.theme);
        }
        
        if (acl.isUpdate('sysdev')) {
            previewPanel.down('toolbar button[action=edit]').on('click', function() {
                var editor = Ext.widget('htmleditor');
                var win = Ext.create('Ext.window.Window', {
                    width: 800,
                    height: 500,
                    modal: true,
                    autoShow: true,
                    maximizable: true,
                    title: this.theme.get('name'),
                    layout: 'fit',
                    items: [editor],
                    buttons: [{
                        text: 'Сохранить',
                        handler: function() {
                            Ext.Ajax.request({
                                url: '/json/sysdev/description/update-description-content',
                                params: {
                                    theme_id: this.theme.get('id'),
                                    content: editor.getValue()
                                },
                                success: function() {
                                    previewPanel.update(editor.getValue());
                                    win.close();
                                }
                            });
                        },
                        scope: this
                    }]
                });
                editor.setValue(previewPanel.html);
            }, this);
        }
    }
});