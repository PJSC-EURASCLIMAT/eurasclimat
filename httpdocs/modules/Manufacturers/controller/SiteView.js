Ext.define('EC.Manufacturers.controller.SiteView', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Manufacturers.view.Trade.SiteView',
        'EC.Manufacturers.view.Trade.List'
    ],

    refs: [
        {
            ref: 'list',
            selector: 'ManufacturersTradeViewList'
        },{
            ref: 'frame',
            selector: 'ManufacturersTradeView #tradeFrame'
        }
    ],


    run:function(container) {

        this.control({
            'ManufacturersTradeViewList': {
                rowClicked: this.openSite
            },
            'ManufacturersTradeView' : {
               afterlayout: this.viewAfterLayout
            }
        });

        container.add(this.getView(this.views[0]).create());

    }

    ,openSite: function(url){
        this.getFrame().el.down('iframe').set({src: "" + url + ""});
    }

    ,viewAfterLayout: function ( view, layout, eOpts ) {
        console.log("asdfasdfasdfasd");
//        this.selectFirstRow();
    }

    ,selectFirstRow: function(){
        this.getList().getView().select(0);
        var url = this.getList().store.getAt(0).get('url');
        this.openSite(url);
    }

});