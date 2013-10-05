Ext.define('EC.Main.view.MiniBrowser', {

    extend: 'Ext.panel.Panel',

//    layout: 'fit',
    
    initComponent: function() {
        
        var iframe = Ext.create('Ext.Component', {
            autoEl: {
                tag: 'iframe',
                width: '100%',
                height: '100%',
                src: ''
            }
        });
        
        var navstring = Ext.create('Ext.form.field.Text', {
            width: '100%',
            height: 20,
            enableKeyEvents: true,
            listeners: {
                keydown: function(field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        var src = field.getValue();
                        if (src.substr(0,4) !== 'http') {
                            field.setValue('http://' + src);
                        }
                        iframe.getEl().dom.src = field.getValue();
                    }
                },
                scope: this
            }
        });
        
        
        this.items = [navstring, iframe];
        
        this.callParent(arguments);
    }
});