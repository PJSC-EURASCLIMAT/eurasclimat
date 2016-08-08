Ext.define('EC.Market.controller.SiteView', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Trade.SiteView',
        'EC.Market.view.Trade.List',
        'EC.Market.view.Docs.Win'
    ],
    
    uses: [
        'EC.Market.controller.Docs'
    ],

    refs: [{
        ref: 'list',
        selector: 'TradeViewList'
    }, {
        ref: 'frame',
        selector: 'TradeView #tradeFrame'
    }],

    run: function(container) {

        this.control({
            'TradeViewList': {
                rowClicked: this.openSite,
                docsClicked: this.openDocs
            },
            'TradeView' : {
               afterlayout: this.viewAfterLayout
            },
            scope: this
        });

        container.add(this.getView(this.views[0]).create());
    },

    openSite: function(url) {
        this.getFrame().el.down('iframe').set({src: "" + url + ""});
    },

    viewAfterLayout: function ( view, layout, eOpts ) {
        document.getElementById('eventsIFrame').contentWindow.document.getElementsByTagName('body')[0].innerHTML = "Выберите сайт из списка слева";
    },

    openDocs: function(grid, record) {
        var docsController = this.getController('EC.Market.controller.Docs');
        docsController.cur_item_id = record.get('id');
        var win = Ext.create('EC.Market.view.Docs.Win');
        docsController.run(win);
    }
});