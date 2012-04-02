Ext.define('xlib.portal.PortalColumn', {
    extend: 'Ext.container.Container',
    alias: 'widget.portalcolumn',
    requires: [
        'Ext.layout.component.Body',
        'xlib.portal.Portlet'
    ],
    layout: {
        type: 'anchor'
    },
    defaultType: 'portlet',
    cls: 'x-portal-column',
    autoHeight: true
    
});
