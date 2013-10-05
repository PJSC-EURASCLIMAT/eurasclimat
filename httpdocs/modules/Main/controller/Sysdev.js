Ext.define('EC.Main.controller.Sysdev', {
    
    extend: 'Ext.app.Controller',
    
//    requires: ['xlib.TinyMCE'],
    
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
    
    run: function(container) {

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
//            xlib.TinyMCE.initTinyMCE();
            previewPanel.down('toolbar button[action=edit]').on('click', function() {
//                var editor = Ext.widget('tinymce', {
//                    tinymceSettings: {
//                        theme: "advanced",
//                        plugins: "pagebreak,style,layer,table,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
//                        theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
//                        theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
//                        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|",
//                        theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
//                        theme_advanced_toolbar_location: "top",
//                        theme_advanced_toolbar_align: "left",
//                        theme_advanced_statusbar_location: "bottom",
//                        theme_advanced_resizing: false,
//                        extended_valid_elements: "a[name|href|target|title|onclick],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style]",
//                        template_external_list_url: "example_template_list.js"
//                    }
//                });
                
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