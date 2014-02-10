Ext.define('EC.Experts.view.Experts.Layout', {

    extend: 'Ext.container.Container',

    alias: 'widget.ExpertsLayout',

    layout: 'border',

    permissions: null,

    activeOnly: false,

    expertsStore: null,

    hideTree: false,

    isPortlet: false,

    requires: ['EC.Experts.view.Experts.FilterTree','EC.Experts.view.Experts.List'],

    initComponent: function() {

        this.items = [{
            xtype: 'ExpertsFilterTree',
            region: 'west',
            hidden: this.isPortlet,
            split: true,
            width: 300,
            itemId: 'tree'
        }, {
            xtype: 'ExpertsList',
            itemId: 'list',
            isPortlet: this.isPortlet,
            region: 'center',
            permissions: this.permissions,
            store: this.expertsStore
        }];

        this.callParent(arguments);
    }
});