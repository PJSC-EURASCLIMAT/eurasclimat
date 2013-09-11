Ext.define('EC.Main.controller.Order', {
    
    extend: 'Ext.app.Controller',

    views: [
//        'EC.Main.view.AboutCompany',
        'EC.Main.view.OrderPortlet'
    ],

    permissions: acl.isUpdate('crm', 'orders'),

    URL: '/json/CRM/Orders/add-order',

    run: function(container) {
        
        this.Container = container;

        var panel = container.add(this.getView('EC.Main.view.OrderPortlet').create());
        panel.down('#sendBtn').on({
            click: this.sendOrder,
            scope: this
        });
        this.orderForm = panel.down('form');

//        if ('portlet' == container.getXType()) {
//        } else {
//            panel = container.add(this.getView('EC.Main.view.AboutCompany').create());
//        }
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        var MC = this.getController('App.controller.Main');
        MC.openModuleTab(this.Container);
    },

    sendOrder: function() {
        this.orderForm.submit({
            url: this.URL,
            success: function(form, action) {
                console.log("ORDER SEND SUCCESS");
                console.log(action);
            },
            failure: function(form, action) {
               console.log("ORDER SEND FAILURE");
               console.log(action);
            },
            scope: this
        });
    }


});