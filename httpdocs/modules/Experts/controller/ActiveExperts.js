Ext.define('EC.Experts.controller.ActiveExperts', {

    extend: 'EC.Experts.controller.Experts',

    run: function(container) {
        this.callParent([container,true]);
    }
});