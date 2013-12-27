Ext.define('EC.Experts.controller.ActiveExperts', {

    extend: 'EC.Experts.controller.Experts',

    run: function(container) {

        var activeOnly = true;

        this.Container = container;

        var grid = container.add(Ext.create('EC.Experts.view.Experts.List', {
            permissions: this.permissions,
            store: 'EC.Experts.store.ActiveExperts',
            activeOnly: activeOnly
        }));

        grid.down('button[action=refresh]').on({
            click: function() {
                grid.getStore().load();
            },
            scope: this
        });

        grid.down('toolbar [name=equip_id]').on('change', this.onEquipFilter, grid);
        grid.down('toolbar [name=status_id]').on('change', this.onStatusFilter, grid);
    }

});