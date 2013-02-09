/**
 * @class xlib.portal.Portlet
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class that is managed by {@link xlib.portal.PortalPanel}.
 */
Ext.define('xlib.portal.Portlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.portlet',
    layout: 'fit',
    anchor: '100%',
    height: 300,
    frame: true,
    draggable: {
        moveOnDrag: false    
    },
    cls: 'x-portlet',

    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
    doClose: function() {
        this.el.animate({
            opacity: 0,
            callback: function(){
                this.fireEvent('close', this);
                this[this.closeAction]();
            },
            scope: this
        });
    },
    
    tools: [{
        type: 'help',
        handler: function(event, toolEl, parent, tool) {
            Ext.create('Ext.Window', {
                title: 'Справка',
                layout: 'fit',
                height: 400,
                width: 400,
                modal: true,
                autoScroll: true,
                items: [{
                    layout: 'fit',
                    border: false,
                    bodyPadding: 5,
                    html: '<p>Справка по данному елементу недоступна...</p>'
                }]
            }).show();
        },
        tooltip: 'Справка'
    }, {
        type: 'plus',
        disabled: true
    }, {
        type: 'restore',
        tooltip: 'Развернуть',
        handler: function(event, toolEl, parent, tool) {
            var portlet = parent.findParentByType('portlet');
            portlet.fireEvent('restore', portlet);
        }
    }, {
        type: 'maximize',
        tooltip: 'Развернуть на весь экран',
        handler: function(event, toolEl, parent, tool) {
            var portlet = parent.findParentByType('portlet');
            portlet.fireEvent('maximize', portlet);
        }
    }, {
        type: 'close',
        tooltip: 'Закрыть',
        handler: function(event, toolEl, parent, tool) {
            var portlet = parent.findParentByType('portlet');
            portlet.close();
        }
    }]
});