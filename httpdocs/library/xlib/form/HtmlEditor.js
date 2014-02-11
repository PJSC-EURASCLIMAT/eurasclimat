Ext.define('xlib.form.HtmlEditor', {
    
    extend: 'Ext.form.field.HtmlEditor',
    
    alias: 'widget.XHtmlEditor',

    defaultFont: 'Tahoma',
    
    enableFont: false,
    
    enableFontSize: false,
    
    bodyStyle: 'font-size:11px;',
    
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
    }

});