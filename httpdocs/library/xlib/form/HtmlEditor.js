Ext.define('xlib.form.HtmlEditor', {
    
    extend: 'Ext.form.field.HtmlEditor',
    
    alias: 'widget.XHtmlEditor',

    defaultFont: 'Tahoma',
    
    enableFont: false,
    
    enableFontSize: false,
    
    bodyStyle: 'font-size:11px;',
    
    iframeAttrTpl: 'style="font-size:11px;"',
    
    getDocMarkup: function() {
        var me = this,
            h = me.iframeEl.getHeight() - me.iframePad * 2,
            oldIE = Ext.isIE8m;

        // - IE9+ require a strict doctype otherwise text outside visible area can't be selected.
        // - Opera inserts <P> tags on Return key, so P margins must be removed to avoid double line-height.
        // - On browsers other than IE, the font is not inherited by the IFRAME so it must be specified.
        return Ext.String.format(
            (oldIE ? '' : '<!DOCTYPE html>')                        
            + '<html><head><style type="text/css">' 
            + (Ext.isOpera ? 'p{margin:0}' : '')
            + 'body{border:0;margin:0;padding:{0}px;direction:' + (me.rtl ? 'rtl;' : 'ltr;')
            + (oldIE ? Ext.emptyString : 'min-')
            + 'height:{1}px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:text;background-color:white;font-size:11px;' 
            + (Ext.isIE ? '' : 'font-family:{2}')
            + '}</style></head><body style="font-size:11px;"></body></html>'
            , me.iframePad, h, me.defaultFont);
    },

    initComponent: function() {
        this.on('render', this.addStripTagsBtn, this);
        this.callParent(arguments);
    },
   
    addStripTagsBtn: function() {
        
        var tb = this.getToolbar();
        tb.add({
            itemId: 'striptags',
            cls: Ext.baseCSSPrefix + 'btn-icon',
            iconCls: 'option',
            enableToggle: false,
            scope: this,
            clickEvent: 'mousedown',
            tooltip: 'Очистить форматирование',
            tabIndex: -1,
            handler: this.stripTags
//            function() {
//                var confirmDialog = Ext.MessageBox.confirm('Подтверждение', 
//                'Очистить форматирование документа?', 
//                function(b) { if ('yes' === b) { this.stripTags(); } }, this);
//                confirmDialog.focus(false, false);
//                confirmDialog.toFront();
//            }
        });
    },
   
    stripTags: function() {
        
        var v = this.getValue(),
            v = Ext.util.Format.stripTags(v),
            v = Ext.util.Format.nl2br(v)
            ;
        this.setValue(v);
    } 
});