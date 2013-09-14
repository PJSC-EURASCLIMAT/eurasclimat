Ext.define('EC.Market.controller.SiteView', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Trade.SiteView',
        'EC.Market.view.Trade.List'
    ],

    refs: [
        {
            ref: 'list',
            selector: 'TradeViewList'
        },{
            ref: 'frame',
            selector: 'TradeView #tradeFrame'
        }
    ],


    run:function(container) {

        this.control({
            'TradeViewList': {
                rowClicked: this.openSite
            },
            'TradeView' : {
               afterlayout: this.viewAfterLayout
            }
        });

        container.add(this.getView(this.views[0]).create());

    }

    ,openSite: function(url){
        this.getFrame().el.down('iframe').set({src: "" + url + ""});
    }

    ,viewAfterLayout: function ( view, layout, eOpts ) {
        this.selectFirstRow();
    }

    ,selectFirstRow: function(){
        this.getList().getView().select(0);
        var url = this.getList().store.getAt(0).get('url');
        this.openSite(url);
    }

});