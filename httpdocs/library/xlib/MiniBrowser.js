Ext.define('xlib.MiniBrowser', {

    extend: 'Ext.app.Controller',

    run: function(container) {
        
        this.iframe = Ext.create('Ext.Component', {
            itemId: 'minibrowseriframe',
            colspan: 2,
            autoEl: {
                tag: 'iframe',
                width: '100%',
                height: '100%',
                src: ''
            }
        });
        
        this.navstring = Ext.create('Ext.form.field.Text', {
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                keydown: function(field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        this.go();
                    }
                },
                scope: this
            }
        });
        
        this.goButton = Ext.create('Ext.button.Button', {
            width: 50,
            pressed: true,
            text: 'Найти',
            handler: this.go,
            scope: this
        });
        
        container.add(Ext.create('Ext.panel.Panel', {
            layout: 'fit',
            tbar: [
                this.navstring, 
                this.goButton
            ],
            items: [this.iframe],
            scope: this
        }));
    },
    
    onLoadIframe: function() {
//        console.log('arguments: ', arguments);
    },
    
    go: function() {
//        this.iframe.getEl('iframe').on('load', this.onLoadIframe, this, {single: true}); 
        var src = this.navstring.getValue();
        if (src.substr(0,4) !== 'http') {
            this.navstring.setValue('http://' + src);
        }
        this.iframe.getEl().dom.src = this.navstring.getValue();
    }
});