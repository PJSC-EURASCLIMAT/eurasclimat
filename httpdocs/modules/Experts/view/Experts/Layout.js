Ext.define('EC.Experts.view.Experts.Layout', {

    extend: 'Ext.container.Container',

    alias: 'widget.ExpertsLayout',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    permissions: null,

    activeOnly: false,

    requires: ['EC.Experts.view.Experts.FilterTree','EC.Experts.view.Experts.List'],

    initComponent: function() {

        this.items = [
            {
                xtype: 'ExpertsFilterTree',
                width: 330,
                itemId: 'tree'
            },
            {
                xtype: 'ExpertsList',
                itemId: 'list',
                permissions: this.permissions,
                store: 'EC.Experts.store.Experts',
                flex: 1
            }
        ];

        this.callParent(arguments);
    }
});