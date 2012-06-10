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
    closable: true,
    collapsible: true,
    animCollapse: true,
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
        type: 'restore',
        handler: function(event, toolEl, parent, tool) {
            var portlet = parent.findParentByType('portlet');
            portlet.fireEvent('restore', portlet);
        }
    }, {
        type: 'maximize',
        handler: function(event, toolEl, parent, tool) {
            var portlet = parent.findParentByType('portlet');
            portlet.fireEvent('maximize', portlet);
        }
    }]
});